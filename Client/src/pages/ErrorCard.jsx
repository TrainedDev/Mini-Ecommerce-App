import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";


export default function ErrorCard({ msg = "Something went wrong" }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
            <AlertTriangle className="text-red-500 w-8 h-8" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Oops! An Error Occurred
          </h2>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {msg}
          </p>

          {/* Button */}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium shadow-md transition"
          >
            Retry
          </button>
        </div>
      </motion.div>
    </div>
  );
}
