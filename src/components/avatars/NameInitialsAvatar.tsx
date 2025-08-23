"use client";

type Props = {
  firstName: string;
  size?: "small" | "large";
};

export default function NameInitialsAvatar({
  firstName,
  size = "small",
}: Props) {
  const getInitial = (name: string) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };
  const getWidthAndHeightBasedOnSize = () => {
    if (size === "small") {
      return "w-10 h-10";
    }
    return "w-40 h-40";
  };
  const getTextSizeBasedOnSize = () => {
    if (size === "small") {
      return "text-md";
    }
    return "text-2xl";
  };
  const initial = getInitial(firstName);
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  const colorIndex = initial.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  return (
    <div
      className={`${getWidthAndHeightBasedOnSize()} rounded-full flex items-center justify-center ${bgColor}`}
    >
      <span className={`text-white font-bold ${getTextSizeBasedOnSize()}`}>
        {initial}
      </span>
    </div>
  );
}
