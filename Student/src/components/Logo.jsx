import React from "react";

const KWGradientOutline = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black relative">
      <svg
        width="500"
        height="500"
        viewBox="0 0 300 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff0000">
              <animate
                attributeName="stop-color"
                values="#ff0000;#00ff00;#0000ff;#ff0000"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#0000ff">
              <animate
                attributeName="stop-color"
                values="#0000ff;#ff0000;#00ff00;#0000ff"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

      

        {/* KW Gradient Outline */}
        {/* Glowing KW Layer */}
<text
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="middle"
  fontSize="60"
  fontFamily="'Poppins', sans-serif"
  fill="none"
  stroke="url(#gradient)"
  strokeWidth="6"
  opacity="0.3"
  filter="blur(4px)"
>
  <tspan x="40%" y="40%">K</tspan>
  <tspan x="54%" y="69%">W</tspan>
</text>

{/* Main Sharp KW Layer */}
<text
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="middle"
  fontSize="60"
  fontFamily="'Poppins', sans-serif"
  fill="none"
  stroke="url(#gradient)"
  strokeWidth="2"
>
  <tspan x="40%" y="40%">K</tspan>
  <tspan x="54%" y="69%">W</tspan>
</text>


       
      </svg>
    </div>
  );
};

export default KWGradientOutline;
