import { JSX } from "react";

type Props = {
  title: string;
  subtitle: string;
  buttons: Array<{
    className: string;
    label: string;
    icon: JSX.Element;
    onClick: () => void;
  }>;
};

export default function PageHeading({ title, subtitle, buttons }: Props) {
  return (
    <div className="justify-between md:flex">
      <div className="max-w-lg">
        <h3 className="text-gray-900 dark:text-gray-200 text-xl font-bold">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
      </div>
      <div className="mt-3 md:mt-0">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={button.className}
            onClick={button.onClick}
          >
            {button.icon}
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
