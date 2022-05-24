import React from "react";
export default function NavgationBar() {
  const minimizeButton = () => {
    console.log("clicked");
  };
  return (
    <button onClick={minimizeButton} className="nav-btn">
      <MinimizeRoundedIcon />
    </button>
  );
}
