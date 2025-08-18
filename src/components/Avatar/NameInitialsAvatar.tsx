"use client";

type Props = {
  firstName: string;
};

export default function NameInitialsAvatar({ firstName }: Props) {
  const getInitial = (name: string) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
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
      className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColor}`}
    >
      <span className="text-white font-bold">{initial}</span>
    </div>
  );
}
