import { useRazorpay } from "@/Razorpay/useRazorpay";
import { UserContext } from "@/State Management/Contexts/NewContexts";
import axios from "axios";
import { useState, useCallback, useEffect, useContext } from "react";
import { useParams } from "react-router";

const INITIAL_ITEMS = [
  // {
  //   id: "p1",
  //   name: "Wireless Earbuds Pro",
  //   variant: "Midnight Black",
  //   price: 1299,
  //   qty: 1,
  //   emoji: "🎧",
  // },
  // {
  //   id: "p2",
  //   name: "Laptop Stand",
  //   variant: "Aluminium · Silver",
  //   price: 799,
  //   qty: 2,
  //   emoji: "💻",
  // },
  // {
  //   id: "p3",
  //   name: "USB-C Hub 7-in-1",
  //   variant: "Space Grey",
  //   price: 499,
  //   qty: 1,
  //   emoji: "🔌",
  // },
];

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

const COUPONS = {
  SAVE10: { type: "percent", val: 10 },
  FLAT50: { type: "flat", val: 50 },
};

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1208;
    --ink-2: #5a4f3f;
    --ink-3: #9a8f7f;
    --ink-4: #c4bbad;
    --cream: #faf7f2;
    --cream-2: #f2ede4;
    --cream-3: #e8e0d3;
    --accent: #c4622d;
    --accent-2: #e8845a;
    --accent-bg: #fdf0e8;
    --success: #2d7a4f;
    --success-bg: #e8f5ee;
    --danger: #a83232;
    --danger-bg: #fdf0f0;
    --radius: 12px;
    --radius-sm: 8px;
    --radius-xs: 6px;
    --shadow: 0 1px 3px rgba(26,18,8,0.06), 0 4px 16px rgba(26,18,8,0.04);
  }

  .co-page {
    min-height: 100vh;
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    padding: 0 0 80px;
  }

  /* ── Header ── */
  .co-header {
    background: var(--ink);
    padding: 18px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .co-brand {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: var(--cream);
    letter-spacing: -0.3px;
  }
  .co-brand em { color: var(--accent-2); font-style: italic; }
  .co-steps {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .co-step {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--ink-3);
    letter-spacing: 0.02em;
  }
  .co-step.active { color: var(--cream); }
  .co-step.done { color: var(--accent-2); }
  .co-step-num {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1.5px solid currentColor;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 500;
  }
  .co-step.active .co-step-num { background: var(--accent); border-color: var(--accent); color: #fff; }
  .co-step.done .co-step-num { background: var(--accent-2); border-color: var(--accent-2); color: #fff; font-size: 10px; }
  .co-step-sep { width: 28px; height: 1px; background: #3a3020; margin: 0 8px; }

  /* ── Main grid ── */
  .co-container { max-width: 980px; margin: 0 auto; padding: 32px 24px 0; }
  .co-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 20px;
    align-items: start;
  }
  @media (max-width: 720px) {
    .co-grid { grid-template-columns: 1fr; }
    .co-header { padding: 14px 16px; }
    .co-container { padding: 20px 16px 0; }
    .co-steps { display: none; }
  }

  /* ── Section title ── */
  .co-section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 18px;
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
  }
  .co-section-title::after {
    content: ''; flex: 1; height: 1px; background: var(--cream-3);
  }

  /* ── Card ── */
  .co-card {
    background: #fff;
    border: 1px solid var(--cream-3);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow);
    margin-bottom: 20px;
  }

  /* ── Form fields ── */
  .co-field { margin-bottom: 14px; }
  .co-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 5px;
  }
  .co-input, .co-select {
    width: 100%;
    padding: 10px 13px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: var(--cream);
    border: 1.5px solid var(--cream-3);
    border-radius: var(--radius-sm);
    outline: none;
    transition: border-color 0.15s, background 0.15s;
    appearance: none;
    -webkit-appearance: none;
  }
  .co-input:focus, .co-select:focus {
    border-color: var(--accent);
    background: #fff;
  }
  .co-input.err { border-color: var(--danger); background: var(--danger-bg); }
  .co-err { font-size: 11px; color: var(--danger); margin-top: 3px; }
  .co-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .co-row-3 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 12px; }

  /* ── Delivery options ── */
  .co-delivery-opt {
    display: flex; align-items: center; gap: 13px;
    padding: 13px 15px;
    border: 1.5px solid var(--cream-3);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.15s;
    margin-bottom: 9px;
    background: var(--cream);
  }
  .co-delivery-opt:last-child { margin-bottom: 0; }
  .co-delivery-opt.selected {
    border-color: var(--accent);
    background: var(--accent-bg);
  }
  .co-radio {
    width: 16px; height: 16px; border-radius: 50%;
    border: 1.5px solid var(--cream-3);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: border-color 0.15s;
  }
  .co-delivery-opt.selected .co-radio { border-color: var(--accent); }
  .co-radio-inner {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    transform: scale(0);
    transition: transform 0.15s;
  }
  .co-delivery-opt.selected .co-radio-inner { transform: scale(1); }
  .co-delivery-info { flex: 1; }
  .co-delivery-name { font-size: 13px; font-weight: 500; color: var(--ink); }
  .co-delivery-sub { font-size: 12px; color: var(--ink-3); margin-top: 1px; }
  .co-pill {
    font-size: 10px; font-weight: 500; letter-spacing: 0.04em;
    padding: 3px 9px; border-radius: 20px;
  }
  .co-pill-free { background: var(--success-bg); color: var(--success); }
  .co-pill-paid { background: var(--accent-bg); color: var(--accent); }

  /* ── Product items ── */
  .co-item {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 0;
    border-bottom: 1px solid var(--cream-2);
  }
  .co-item:last-child { border-bottom: none; }
  .co-item-thumb {
    width: 48px; height: 48px;
    background: var(--cream-2);
    border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0;
    border: 1px solid var(--cream-3);
  }
  .co-item-info { flex: 1; min-width: 0; }
  .co-item-name {
    font-size: 13px; font-weight: 500; color: var(--ink);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .co-item-variant { font-size: 11px; color: var(--ink-3); margin-top: 2px; }
  .co-qty {
    display: flex; align-items: center; gap: 7px;
  }
  .co-qty-btn {
    width: 24px; height: 24px;
    border-radius: 6px; border: 1px solid var(--cream-3);
    background: var(--cream); cursor: pointer;
    font-size: 15px; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    color: var(--ink-2); transition: all 0.12s; flex-shrink: 0;
  }
  .co-qty-btn:hover { background: var(--cream-2); border-color: var(--ink-4); }
  .co-qty-val { font-size: 13px; font-weight: 500; min-width: 18px; text-align: center; }
  .co-item-price {
    font-size: 13px; font-weight: 500; color: var(--ink); flex-shrink: 0;
  }
  .co-remove {
    width: 22px; height: 22px; border: none; background: none;
    cursor: pointer; border-radius: 4px; display: flex;
    align-items: center; justify-content: center;
    color: var(--ink-4); flex-shrink: 0; transition: all 0.12s;
    font-size: 16px;
  }
  .co-remove:hover { color: var(--danger); background: var(--danger-bg); }

  /* ── Coupon ── */
  .co-coupon-row { display: flex; gap: 8px; }
  .co-coupon-row .co-input { flex: 1; font-size: 12px; }
  .co-apply-btn {
    padding: 0 16px; font-size: 12px; font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    background: var(--cream-2); color: var(--ink-2);
    border: 1.5px solid var(--cream-3); border-radius: var(--radius-sm);
    cursor: pointer; white-space: nowrap; transition: all 0.12s;
    letter-spacing: 0.02em;
  }
  .co-apply-btn:hover { background: var(--cream-3); }

  /* ── Summary ── */
  .co-divider { height: 1px; background: var(--cream-2); margin: 14px 0; }
  .co-sum-row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 13px; margin-bottom: 8px;
  }
  .co-sum-label { color: var(--ink-3); }
  .co-sum-val { color: var(--ink-2); font-weight: 500; }
  .co-sum-val.discount { color: var(--success); }
  .co-total-row {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-top: 14px; padding-top: 14px; border-top: 1.5px solid var(--cream-3);
  }
  .co-total-label {
    font-family: 'DM Serif Display', serif;
    font-size: 17px; color: var(--ink);
  }
  .co-total-val {
    font-family: 'DM Serif Display', serif;
    font-size: 24px; color: var(--accent);
  }

  /* ── Pay button ── */
  .co-pay-btn {
    width: 100%; margin-top: 16px;
    padding: 15px;
    background: var(--accent);
    color: #fff;
    border: none; border-radius: var(--radius-sm);
    font-size: 14px; font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.03em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    transition: background 0.15s, transform 0.1s;
  }
  .co-pay-btn:hover { background: #b05525; }
  .co-pay-btn:active { transform: scale(0.98); }
  .co-pay-btn:disabled { background: var(--cream-3); color: var(--ink-4); cursor: not-allowed; transform: none; }
  .co-pay-icon { font-size: 16px; }
  .co-secure {
    display: flex; align-items: center; justify-content: center;
    gap: 5px; margin-top: 10px;
    font-size: 11px; color: var(--ink-4); letter-spacing: 0.02em;
  }

  /* ── Toast ── */
  .co-toast {
    display: flex; align-items: flex-start; gap: 10px;
    background: var(--success-bg);
    border: 1px solid #b8dfc8;
    border-radius: var(--radius-sm);
    padding: 12px 14px;
    margin-top: 12px;
    font-size: 12px;
    color: var(--success);
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.25s;
  }
  .co-toast.show { opacity: 1; transform: translateY(0); }

  /* ── State debug ── */
  .co-state-toggle {
    font-size: 11px; color: var(--accent); cursor: pointer;
    text-decoration: underline; text-underline-offset: 2px;
    margin-top: 10px; display: inline-block; letter-spacing: 0.02em;
    background: none; border: none; font-family: 'DM Sans', sans-serif;
  }
  .co-state-box {
    background: var(--ink);
    color: #c8e6a0;
    font-family: monospace;
    font-size: 11px;
    padding: 14px;
    border-radius: var(--radius-sm);
    margin-top: 8px;
    white-space: pre;
    overflow-x: auto;
    line-height: 1.8;
    max-height: 300px;
    overflow-y: auto;
  }

  /* ── Empty state ── */
  .co-empty {
    text-align: center; padding: 30px 0;
    font-size: 13px; color: var(--ink-3);
  }

  /* ── Spinner ── */
  @keyframes spin { to { transform: rotate(360deg); } }
  .co-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
`;

function CheckoutPage() {
  const api = import.meta.env.VITE_SERVER_URL;
  const { id: productId } = useParams();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [defaultUserData, setDefaultUserData] = useState({
    firstName: "",
    email: "",
  });
  const [form, setForm] = useState({
    lastName: "",
    phone: "1234567890",
    address: "dasdasdsad",
    city: "Surat",
    state: "Gujarat",
    pin: "213123",
  });
  // const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});
  const [delivery, setDelivery] = useState("standard");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState({
    amt: 0,
    code: null,
    msg: "",
    ok: false,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [showState, setShowState] = useState(false);
  // setToast("failed")
  const { user } = useContext(UserContext);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = delivery === "express" ? 99 : 0;
  const gst = Math.round((subtotal - discount.amt) * 0.18);
  const total = subtotal + deliveryFee - discount.amt + gst;

  const changeQty = (id, delta) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const setField = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = useCallback(() => {
    const e = {};
    // if (!form.firstName.trim()) e.firstName = "Required";
    // if (!form.email.trim()) e.email = "Required";
    // else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    // if (!form.phone.trim()) e.phone = "Required";
    // else if (!/^\d{10}$/.test(form.phone)) e.phone = "Must be 10 digits";
    if (!form.address.trim()) e.address = "Required";
    if (!form.pin.trim()) e.pin = "Required";
    else if (!/^\d{6}$/.test(form.pin)) e.pin = "6-digit PIN";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const applyCoupon = () => {
    if (discount.code) return;
    const c = COUPONS[coupon.toUpperCase().trim()];
    if (!c) {
      setDiscount({
        amt: 0,
        code: null,
        msg: "Invalid. Try SAVE10 or FLAT50",
        ok: false,
      });
      return;
    }
    const amt =
      c.type === "percent" ? Math.round((subtotal * c.val) / 100) : c.val;
    setDiscount({
      amt,
      code: coupon.toUpperCase().trim(),
      msg: `Saved ${fmt(amt)}!`,
      ok: true,
    });
  };

  const buildState = () => ({
    customer: {
      name: `${defaultUserData?.firstName ?? ""} ${form?.lastName ?? ""}`.trim(),
      email: defaultUserData?.email,
      phone: form.phone,
    },
    shippingAddress: {
      line1: form.address,
      city: form.city,
      state: form.state,
      pin: form.pin,
      country: "IN",
    },
    items: items.map(({ id, name, qty, price }) => ({
      productId: id,
      name,
      qty,
      unitPrice: price,
    })),
    delivery: { type: delivery, fee: deliveryFee },
    pricing: {
      subtotal,
      discount: discount.amt,
      gst,
      deliveryFee,
      totalAmount: total,
      currency: "INR",
    },
    coupon: discount.code,
  });

  // ✅ Use setItems to actually update React state
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`,
        );
        const { id, title: name, image: emoji, price } = response.data;
        setItems((prev) => {
          if (prev.find((ele) => ele.id === id)) return prev;
          return [
            ...prev,
            { id, name, emoji, price, qty: 1, variant: "Midnight Black" },
          ];
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const response = await axios.get(`${api}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${user.data}`,
          },
        });
        const { username: firstName, email } = response.data.data;
        setDefaultUserData({
          firstName,
          email,
        });
      } catch (error) {
        setErrors(error?.response?.data.error);
        console.log(error?.response?.data.error);
      }
    };
    fetchUserData();
  }, [form, api, user]);

  const { pay } = useRazorpay();

  const handlePay = async () => {
    if (!validate()) return; // Bug 2 fixed — actually stops here
    if (items.length === 0) return;
    setLoading(true);

    try {
      const { address } = form;
      const { firstName: username, email } = defaultUserData;

      const orderDetails = {
        totalPrice: items.reduce((acc, curr) => acc + curr.price * curr.qty, 0),
        address,
        payment_status: "pending",
        items: items.map((ele) => ({
          productId: ele.id,
          name: ele.name,
          price: ele.price,
          quantity: ele.qty,
        })),
      };

      // Bug 1 fixed — send orderDetails directly, not the stale `data` state
      const response = await axios.post(`${api}/orders/create`, orderDetails, {
        headers: { Authorization: `Bearer ${user.data}` },
      });
console.log(response.data.data);

      const {
        id,
        totalPrice,
        razorpay_order_id,
        address: userAddress,
      } = response.data.data;

      await pay({
        id,
        username,
        email,
        phone: form.phone, // use form.phone not hardcoded number
        userAddress,
        totalPrice,
        razorpay_order_id,
        setToast: (msg) => setToast({ show: true, msg }),
        setErrors: (msg) => setErrors((e) => ({ ...e, pay: msg })),
      });
    } catch (error) {
      console.error(error?.response?.data);
      setErrors((e) => ({
        ...e,
        pay: error?.response?.data?.msg ?? "Something went wrong",
      }));
    } finally {
      setLoading(false); // always runs — even if pay() throws
    }
  };
  const stateJson = JSON.stringify(buildState(), null, 2);

  return (
    <>
      <style>{STYLES}</style>
      <div className="co-page">
        {/* ── Header ── */}
        <header className="co-header">
          <div className="co-brand">
            Shop<em>Easy</em>
          </div>
          <div className="co-steps">
            <div className="co-step done">
              <div className="co-step-num">✓</div>
              <span>Cart</span>
            </div>
            <div className="co-step-sep" />
            <div className="co-step active">
              <div className="co-step-num">2</div>
              <span>Checkout</span>
            </div>
            <div className="co-step-sep" />
            <div className="co-step">
              <div className="co-step-num">3</div>
              <span>Confirm</span>
            </div>
          </div>
        </header>

        <div className="co-container">
          <div className="co-grid">
            {/* ── LEFT COLUMN ── */}
            <div>
              {/* Delivery details */}
              <div className="co-card">
                <div className="co-section-title">Delivery details</div>

                <div className="co-row-2">
                  <div className="co-field">
                    <label className="co-label">First name</label>
                    <input
                      className={`co-input`}
                      value={defaultUserData?.firstName}
                      placeholder="Arjun"
                      readOnly
                    />
                  </div>
                  <div className="co-field">
                    <label className="co-label">Last name</label>
                    <input
                      className="co-input"
                      value={form?.lastName}
                      placeholder="Sharma"
                      onChange={(e) => setField("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="co-field">
                  <label className="co-label">Email address</label>
                  <input
                    className={`co-input`}
                    type="email"
                    value={defaultUserData?.email}
                    placeholder="arjun@example.com"
                    readOnly
                  />
                </div>

                {/* <div className="co-field">
                  <label className="co-label">Phone number</label>
                  <input
                    className={`co-input${errors.phone ? " err" : ""}`}
                    type="tel"
                    value={form?.phone}
                    placeholder="9876543210"
                    maxLength={10}
                    onChange={(e) => setField("phone", e.target.value)}
                  />
                  {errors.phone && <div className="co-err">{errors.phone}</div>}
                </div> */}

                {/* <div className="co-field">
                  <label className="co-label">Street address</label>
                  <input
                    className={`co-input${errors.address ? " err" : ""}`}
                    value={form?.address}
                    placeholder="12, MG Road, Near City Mall"
                    onChange={(e) => setField("address", e.target.value)}
                  />
                  {errors.address && (
                    <div className="co-err">{errors.address}</div>
                  )}
                </div> */}

                <div className="co-row-3">
                  {/* <div className="co-field">
                    <label className="co-label">City</label>
                    <input
                      className="co-input"
                      value={form?.city}
                      placeholder="Surat"
                      onChange={(e) => setField("city", e.target.value)}
                    />
                  </div>
                  <div className="co-field">
                    <label className="co-label">State</label>
                    <select
                      className="co-select"
                      value={form?.state}
                      onChange={(e) => setField("state", e.target.value)}
                    >
                      {STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div> */}
                  {/* <div className="co-field">
                    <label className="co-label">PIN code</label>
                    <input
                      className={`co-input${errors.pin ? " err" : ""}`}
                      value={form?.pin}
                      placeholder="395001"
                      maxLength={6}
                      onChange={(e) => setField("pin", e.target.value)}
                    />
                    {errors.pin && <div className="co-err">{errors.pin}</div>}
                  </div> */}
                </div>
              </div>

              {/* Delivery option */}
              <div className="co-card">
                <div className="co-section-title">Delivery option</div>

                <div
                  className={`co-delivery-opt${delivery === "standard" ? " selected" : ""}`}
                  onClick={() => setDelivery("standard")}
                >
                  <div className="co-radio">
                    <div className="co-radio-inner" />
                  </div>
                  <div className="co-delivery-info">
                    <div className="co-delivery-name">Standard delivery</div>
                    <div className="co-delivery-sub">5–7 business days</div>
                  </div>
                  <span className="co-pill co-pill-free">Free</span>
                </div>

                <div
                  className={`co-delivery-opt${delivery === "express" ? " selected" : ""}`}
                  onClick={() => setDelivery("express")}
                >
                  <div className="co-radio">
                    <div className="co-radio-inner" />
                  </div>
                  <div className="co-delivery-info">
                    <div className="co-delivery-name">Express delivery</div>
                    <div className="co-delivery-sub">1–2 business days</div>
                  </div>
                  <span className="co-pill co-pill-paid">+₹99</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN — Order summary ── */}
            <div>
              <div className="co-card">
                <div className="co-section-title">Your order</div>

                {items.length === 0 ? (
                  <div className="co-empty">Your cart is empty.</div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="co-item">
                      <img src={item.emoji} className="co-item-thumb" />
                      <div className="co-item-info">
                        <div className="co-item-name">{item.name}</div>
                        <div className="co-item-variant">{item.variant}</div>
                      </div>
                      <div className="co-qty">
                        <button
                          className="co-qty-btn"
                          onClick={() => changeQty(item.id, -1)}
                        >
                          −
                        </button>
                        <span className="co-qty-val">{item.qty}</span>
                        <button
                          className="co-qty-btn"
                          onClick={() => changeQty(item.id, +1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="co-item-price">
                        {fmt(item.price * item.qty)}
                      </span>
                      <button
                        className="co-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}

                <div className="co-divider" />

                {/* Coupon */}
                <div style={{ marginBottom: 14 }}>
                  <label className="co-label" style={{ marginBottom: 6 }}>
                    Coupon code
                  </label>
                  <div className="co-coupon-row">
                    <input
                      className="co-input"
                      value={coupon}
                      placeholder="SAVE10"
                      disabled={!!discount.code}
                      onChange={(e) => setCoupon(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    />
                    <button
                      className="co-apply-btn"
                      disabled={!!discount.code}
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                  {discount.msg && (
                    <div
                      style={{
                        fontSize: 11,
                        marginTop: 4,
                        color: discount.ok ? "var(--success)" : "var(--danger)",
                      }}
                    >
                      {discount.msg}
                    </div>
                  )}
                </div>

                <div className="co-divider" />

                {/* Totals */}
                <div className="co-sum-row">
                  <span className="co-sum-label">Subtotal</span>
                  <span className="co-sum-val">{fmt(subtotal)}</span>
                </div>
                <div className="co-sum-row">
                  <span className="co-sum-label">Delivery</span>
                  <span className="co-sum-val">
                    {deliveryFee ? fmt(deliveryFee) : "Free"}
                  </span>
                </div>
                {discount.amt > 0 && (
                  <div className="co-sum-row">
                    <span
                      className="co-sum-label"
                      style={{ color: "var(--success)" }}
                    >
                      Discount
                    </span>
                    <span className="co-sum-val discount">
                      −{fmt(discount.amt)}
                    </span>
                  </div>
                )}
                <div className="co-sum-row">
                  <span className="co-sum-label">GST (18%)</span>
                  <span className="co-sum-val">{fmt(gst)}</span>
                </div>

                <div className="co-total-row">
                  <span className="co-total-label">Total</span>
                  <span className="co-total-val">{fmt(total)}</span>
                </div>

                <button
                  className="co-pay-btn"
                  disabled={loading || items.length === 0}
                  onClick={handlePay}
                >
                  {loading ? (
                    <>
                      <div className="co-spinner" /> Processing…
                    </>
                  ) : (
                    <>
                      <span className="co-pay-icon">🔒</span> Pay {fmt(total)}
                    </>
                  )}
                </button>

                <div className="co-secure">
                  🔐 Secured by Razorpay · 256-bit SSL
                </div>

                <div className={`co-toast${toast.show ? " show" : ""}`}>
                  ✅ &nbsp;<span>{toast.msg}</span>
                </div>

                <button
                  className="co-state-toggle"
                  onClick={() => setShowState((v) => !v)}
                >
                  {showState ? "Hide" : "View"} checkout state →
                </button>
                {showState && <div className="co-state-box">{stateJson}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
