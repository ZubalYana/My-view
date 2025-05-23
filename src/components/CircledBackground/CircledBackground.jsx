import React, { useEffect, useState } from "react";
import bgCircle from "/bgCircle.svg";

export default function CircledBackground() {
  const animations = ["moveChaotic1", "moveChaotic2", "moveChaotic3"];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const circles = isMobile
    ? [
        { size: 350, left: "-26%", top: "-20%" },
        { size: 215, left: "17%", top: "11%" },
        // { size: 150, left: "-17%", top: "25%" },
        { size: 265, left: "30%", top: "6%" },
        { size: 200, left: "51%", top: "-12%" },
        { size: 260, left: "60%", top: "34%" },
        { size: 180, left: "-10%", top: "45%" },
        { size: 398, left: "31%", top: "66%" },
        { size: 295, left: "-35%", top: "63%" },
        // { size: 230, left: "70%", top: "7%" },
      ]
    : [
        { size: 459, left: "-6%", top: "-14%" },
        { size: 312, left: "17%", top: "-11%" },
        { size: 285, left: "31%", top: "-22%" },
        { size: 265, left: "30%", top: "6%" },
        { size: 384, left: "41%", top: "-12%" },
        { size: 260, left: "60%", top: "-12%" },
        { size: 372, left: "14%", top: "18%" },
        { size: 398, left: "31%", top: "26%" },
        { size: 295, left: "-5%", top: "36%" },
        { size: 178, left: "8.5%", top: "37.5%" },
        { size: 428, left: "3%", top: "50%" },
        { size: 530, left: "-22%", top: "57%" },
        { size: 245, left: "24%", top: "55%" },
        { size: 300, left: "22%", top: "80%" },
        { size: 210, left: "50%", top: "30%" },
        { size: 300, left: "57%", top: "12%" },
        { size: 390, left: "70%", top: "-35%" },
      ];

  return (
    <div className="w-full h-screen absolute z-0 overflow-hidden">
      {circles.map((circle, i) => (
        <img
          key={i}
          className="bgCircle absolute"
          style={{
            width: `${circle.size}px`,
            left: circle.left,
            top: circle.top,
            animation: `${animations[i % animations.length]} ${
              3 + Math.random() * 2
            }s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 2}s`,
          }}
          src={bgCircle}
          alt="bgCircle"
        />
      ))}
    </div>
  );
}
