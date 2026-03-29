import { ThemeContext } from "@/State Management/Contexts/NewContexts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const fakeReviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    comment: "Amazing quality! Totally worth the price.",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 4,
    comment: "Good product but delivery was a bit slow.",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Amit Verma",
    rating: 5,
    comment: "Loved it! Will buy again.",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
];

export default function ProductOverview({ theme }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`,
      );
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div
      className={`w-full mx-auto p-6 space-y-10 ${!theme ? "bg-white text-gray-900" : "bg-black text-white"}`}
    >
      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-100 object-contain"
          />
        </div>

        {/* INFO */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p
            className={`${!theme ? "text-gray-500" : "text-white/90"} text-sm`}
          >
            {product.category}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              ₹{product.price}
            </span>

            <span className="text-yellow-500">
              ⭐ {product.rating.rate} ({product.rating.count})
            </span>
          </div>

          <p className={`${!theme ? "text-gray-700" : "text-white/90"}`}>
            {product.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              className={`cursor-pointer px-6 py-2 rounded-xl ${!theme ? "text-white bg-black hover:animate-bounce" : "text-black bg-white hover:animate-bounce"}`}
            >
              Add to Cart
            </button>

            <Link to={`/checkout/${product.id}`}
              className={`cursor-pointer px-6 py-2 rounded-xl ${!theme ? "text-white bg-black hover:animate-bounce" : "text-black bg-white hover:animate-bounce"}`}
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* REVIEW SECTION */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

        {/* Rating Summary */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl font-bold text-yellow-500">
            {product.rating.rate}
          </span>
          <span className="text-gray-600">
            Based on {product.rating.count} reviews
          </span>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {fakeReviews.map((review) => (
            <div
              key={review.id}
              className="flex gap-4 border-b pb-4 last:border-none"
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full"
              />

              <div>
                <h4 className="font-semibold">{review.name}</h4>

                <p className="text-yellow-500 text-sm">
                  {"⭐".repeat(review.rating)}
                </p>

                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
