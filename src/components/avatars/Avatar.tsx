"use client";

import { JSX } from "react";

type Props = {
  src: string | null;
  alt: string;
  fallback: JSX.Element;
  size?: "small" | "large";
};

export default function Avatar({ src, alt, fallback, size = "small" }: Props) {
  const getWidthAndHeightBasedOnSize = () => {
    if (size === "small") {
      return "w-10 h-10";
    }
    return "w-40 h-40";
  };
  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${getWidthAndHeightBasedOnSize()} rounded-full border border-gray-300`}
        />
      ) : (
        fallback
      )}
    </div>
  );
}
