import { ThemeContext } from "@/State Management/Contexts/NewContexts";
import { MoonStar, SunIcon } from "lucide-react";
import { useContext, useState } from "react";
// import { FiSun, FiMoon } from "react-icons/fi";

const ToggleUI = () => {
  const [dark, setDark] = useState(false);
  const { setTheme } = useContext(ThemeContext);
  return (
    <div className="flex items-center m-3">
      <div
        onClick={() => { setDark(!dark); setTheme(!dark); }}
        className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition
        ${dark ? "bg-gray-800" : "bg-yellow-400"}`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition flex items-center justify-center
          ${dark ? "translate-x-8" : "translate-x-0"}`}
        >
          {/* {dark ? <FiMoon size={14} /> : <FiSun size={14} />} */}
          {dark ? (
            <MoonStar className="text-yellow-400" size={14} />
          ) : (
            <SunIcon className="text-yellow-400" size={14} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToggleUI;
