import React from "react";

const Lines = () => {
  return (
    <div className="fixed top-0 left-0 z-[-20] flex h-full w-full items-center justify-around">
      <style>
        {`
          @keyframes line {
            0%, 100% {
              height: 0;
            }
            50% {
              height: 100%;
            }
          }
          
          .animate-line1 {
            animation: line 3s linear infinite;
          }
          
          .animate-line2 {
            animation: line 6s linear infinite;
          }
          
          .animate-side-line {
            animation: line 9s linear infinite; /* Adjust the animation time as needed */
          }
        
          
          .bg-red {
            background-color: #7CA7DB
          }
          
          .bg-blue {
            background-color: #92AABD;
          }
          vertical-line {
            width: 2px;
            height: 100px; /* Adjust the height as needed */
            background-color: black; /* Adjust the color as needed */
          }
          
        `}
      </style>
      <span className="w-[1px] h-full bg-red animate-line1"></span>
      <span className="w-[1px] h-full bg-blue animate-line2"></span>
    </div>
  );
};

export default Lines;
