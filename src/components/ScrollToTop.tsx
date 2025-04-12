import { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-12 border border-border-line right-8 w-12 z-20 h-12 bg-banner text-primary rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        <FiChevronUp size={24} />
      </button>
    )
  );
};
