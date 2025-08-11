"use client";
import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ checked, onToggle, id }) => {
  return (
    <label className=" inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onToggle}
        id={id}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative transition-all duration-300">
        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-300 ${checked ? 'translate-x-5' : ''}`}></div>
      </div>
      {/* <span className="slider round"></span> */}
    </label>
  );
};

export default ToggleSwitch;
