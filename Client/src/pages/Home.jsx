import {  X } from "lucide-react";
import Login from "./Auth Pages/Login";
import { useContext, useEffect, useState } from "react";
import {
  BooleanContext,
  UserContext,
} from "@/State Management/Contexts/NewContexts";
import axios from "axios";
import { Link } from "react-router";
import ErrorCard from "./ErrorCard";
import Register from "./Auth Pages/Register";

// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: "$35",
//     color: "Aspen White",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
//     imageAlt: "Front of men's Basic Tee in dark gray.",
//     price: "$35",
//     color: "Charcoal",
//   },
//   {
//     id: 4,
//     name: "Artwork Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
//     imageAlt:
//       "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
//     price: "$35",
//     color: "Iso Dots",
//   },
// ];

export default function Home({ theme }) {
  const [products, setProducts] = useState(null);
  const { boolVal, setBoolVal } = useContext(BooleanContext);
  const { authUser } = useContext(UserContext);
  useEffect(() => {
    const fetchProducts = async () => {
      // const response = await axios.get("https://fakestoreapi.com/products");
      const response = await axios.get(
        "https://dummyjson.com/c/2a32-77c6-46e5-a930",
      );
      setProducts(response.data.products);
    };
    fetchProducts();
  }, [products]);

  const checkUser = () => {
    if (authUser) return;
    if (!authUser) alert("kindly authenticate yourself");
    setBoolVal((prev) => ({ ...prev, authCard: true }));
  };

  return (
    <div className={`relative ${!theme ? "bg-white" : "bg-black"}`}>
      <div
        className={`absolute z-50 backdrop-blur-[5px] w-full h-[80vh] flex justify-center items-center transition-all ease-in-out duration-700 ${boolVal.authCard ? `visible translate-y-0` : ` hidden -translate-y-200`}}`}
      >
        <Login theme={theme}/>
        <Register theme={theme}/>
        {/* <Button className="bg-red-800 h-full w-[10%]"> */}
        <X
          className={`absolute cursor-pointer w-[7%] h-[7%] top-10 right-40 hover:-rotate-180 duration-600 ${theme ? "text-white": "text-black"} `}
          onClick={() => setBoolVal((prev) => ({ ...prev, authCard: false }))}
        />
        {/* </Button> */}
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2
          className={`text-2xl font-bold tracking-tight ${!theme ? "text-gray-900" : "text-white"} `}
        >
          Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products ? (
            products?.map((product) => (
              <Link
                to={authUser ? `/product/${product.id}` : ""}
                key={product.id}
                onClick={checkUser}
                className="group relative"
              >
                <img
                  alt={`${product.title} image`}
                  src={product.images[0]}
                  onClick={() => checkUser}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div
                  className={`mt-4 flex justify-between ${!theme ? "text-gray-700" : "text-white"}`}
                >
                  <div>
                    <h3 className="text-sm mr-2 text-start">
                      {/* <a href={product.href}> */}
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                      {/* </a> */}
                    </h3>
                    {/* <p className="mt-1 text-sm">{product.rating.rate}</p> */}
                  </div>
                  <p
                    className={`text-sm font-medium ${!theme ? "text-gray-900" : "text-white"}`}
                  >
                    {product.price}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <ErrorCard />
          )}
        </div>
      </div>
    </div>
  );
}
