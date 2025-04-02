import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = [
    "AI precision",
    "Faster reports",
    "Smart alerts",
    "Doctor empowerment",
  ];
  

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]); // No need for `titles` in the dependency array

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative bg-background">
      <div className="absolute inset-0 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-[1200px]  flex items-center justify-center">
        <div className="flex gap-8 py-12 lg:py-10 items-center justify-center flex-col text-center">
          <div className="md:mt-6">
            {/* <Button variant="secondary" size="sm" className="gap-2">
              Find hospitals near you <Search className="w-4 h-4" />
            </Button> */}
          </div>
          <div className="flex gap-6 flex-col items-center">
            <h1 className="text-5xl mt-[-100px]  md:text-7xl max-w-3xl tracking-tighter text-center font-regular">
              <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                Your diagnosis journey begins with
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 lg:pb-20">
                 
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="text-sm  md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mx-auto dark:text-gray-500">
              <span className="font-bold text-black italic dark:text-black">
                MediSure
              </span>{" "}
              enhances healthcare with AI-powered scan analysis, real-time
              alerts, and seamless doctor integration—helping you detect
              diseases faster and more accurately.
            </p>
            
            <button onClick={() => navigate("/login")} className="relative cursor-pointer overflow-hidden text-white font-medium bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 px-6 py-2.5 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group">
              <span className="relative z-10">Get Started</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}