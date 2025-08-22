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
        return "is-background-primary";
      case "secondary":
        return "is-background-secondary";
      case "info":
        return "is-background-info";
      case "danger":
        return "is-background-danger";
      default:
        return "";
    }
  };
  return (
    <button onClick={onClick} className={`is-button ${getButtonColor()}`}>
      <span>{text}</span>
    </button>
  );
}
