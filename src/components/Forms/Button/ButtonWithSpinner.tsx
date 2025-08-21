import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  onClick: () => Promise<void>;
  text: string;
  type: "primary" | "secondary" | "info" | "danger";
};

export default function ButtonWithSpinner({ onClick, text, type }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const clickButton = async () => {
    try {
      setIsLoading(true);
      await onClick();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={clickButton}
      className={`cursor-pointer inline-block px-4 py-2 text-white duration-150 font-medium rounded-lg md:text-sm ${
        isLoading
          ? "bg-gray-400 --spinning-btn"
          : type === "primary"
          ? "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
          : "bg-red-600 hover:bg-red-500 active:bg-red-700"
      }`}
      disabled={isLoading}
    >
      <span>{text}</span>
    </button>
  );
}
