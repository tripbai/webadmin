import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  onClick: () => void;
  text: string;
  type: "primary" | "secondary" | "info" | "danger";
};

export default function SimpleButton({ onClick, text, type }: Props) {
  const getButtonColor = () => {
    switch (type) {
      case "primary":
        return "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700";
      case "secondary":
        return "bg-gray-600 hover:bg-gray-500 active:bg-gray-700";
      case "info":
        return "bg-blue-600 hover:bg-blue-500 active:bg-blue-700";
      case "danger":
        return "bg-red-600 hover:bg-red-500 active:bg-red-700";
      default:
        return "";
    }
  };
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer inline-block px-4 py-2 text-white duration-150 font-medium rounded-lg md:text-sm ${getButtonColor()}`}
    >
      <span>{text}</span>
    </button>
  );
}
