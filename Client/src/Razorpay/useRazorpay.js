import { UserContext } from "@/State Management/Contexts/NewContexts";
import axios from "axios";
import { useContext } from "react";

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
const api = import.meta.env.VITE_SERVER_URL;
const razorpay_key = import.meta.env.VITE_RAZORPAY_TEST_KEY

const loadScript = () =>
  new Promise((resolve) => {
    if (document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`)) {
      return resolve(!!window.Razorpay);
    }
    const script = document.createElement("script");  // ✅ Bug 1 fixed
    script.src = RAZORPAY_SCRIPT;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);                 // ✅ actually adds it
  });

export function useRazorpay() {
  const { user } = useContext(UserContext);

  const pay = async ({
    razorpay_order_id,
    username,
    email,
    phone,
    userAddress,
    totalPrice,
    setToast,
    setErrors,
  }) => {
    const loaded = await loadScript();
    if (!loaded)
      return setErrors("Could not load Razorpay SDK. Check your internet connection.");

    const options = {
      key: razorpay_key,  // ✅ Bug 2 fixed
      amount: totalPrice,                           // in paise — make sure backend sends paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: razorpay_order_id,                 // ✅ Bug 2 fixed
      modal: {
        backdropclose: false,
        escape: false,
        ondismiss: () => {
          setErrors("You closed the payment window.");
        },
      },
      handler: async (response) => {
        const data = {
          razorpay_order_id:  response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature:  response.razorpay_signature,
        };
        try {
          const verifyRes = await axios.post(`${api}/payment/verify`, data, {  // ✅ Bug 3 fixed
            headers: { Authorization: `Bearer ${user.data}` },
          });
          if (verifyRes.data.success) {
            const { msg } = verifyRes.data;
            const workerRes = await axios.get(`${api}/check`);                 // ✅ Bug 3 fixed
            console.log("bullmq worker:", workerRes.data.data);
            setToast(msg);
          } else {
            setErrors(verifyRes.data.message || "Verification failed");
          }
        } catch (error) {
          setErrors("Network error during verification");
          console.error(error?.response?.data?.error);
        }
      },
      prefill: {
        name:    username,
        email:   email,
        contact: phone,
      },
      notes: {
        address: userAddress,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      console.error(response.error);
      setErrors(response.error.description);
    });
    rzp.open();
  };

  return { pay };
}