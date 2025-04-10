import { useEffect, useState } from "react";

export function isScreenMeduim() {
  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMedium(window.innerWidth >= 768); // Tailwind md breakpoint = 768px

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isMedium;
}
