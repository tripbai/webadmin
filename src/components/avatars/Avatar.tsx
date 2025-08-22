"use client";

import { JSX } from "react";

type Props = {
  src: string | null;
  alt: string;
  fallback: JSX.Element;
};

export default function Avatar({ src, alt, fallback }: Props) {
  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      ) : (
        fallback
      )}
    </div>
  );
}
