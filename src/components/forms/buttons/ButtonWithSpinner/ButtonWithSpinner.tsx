import { Dispatch, SetStateAction, useState } from "react";
import styles from "./ButtonWithSpinner.module.css";

type Props = {
  onClick: () => Promise<void>;
  onComplete: () => void;
  text: string;
  type: "primary" | "secondary" | "info" | "danger";
};

export default function ButtonWithSpinner({
  onClick,
  text,
  type,
  onComplete,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const clickButton = async () => {
    try {
      setIsLoading(true);
      await onClick();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    onComplete();
  };
  const getButtonClasses = () => {
    if (isLoading) return "bg-gray-400 " + styles.spinning_button;
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
    <button
      onClick={clickButton}
      className={`is-button ${getButtonClasses()}`}
      disabled={isLoading}
    >
      <span>{text}</span>
    </button>
  );
}
