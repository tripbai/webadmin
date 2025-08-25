import { useRef } from "react";

type Props = {
  placeholder: string;
  onSubmit: (searchTerm: string) => void;
  onClose: () => void;
};

export default function RacoonSearch({
  placeholder,
  onSubmit,
  onClose,
}: Props) {
  /** Activates when the user submits the form */
  const isActive = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = inputRef.current?.value || "";
    isActive.current = true;
    onSubmit(searchTerm);
  };
  const handleClose = () => {
    isActive.current = false;
    inputRef.current!.value = "";
    onClose();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 items-center justify-start lg:flex lg:pb-0 w-full"
    >
      <div className="flex items-center gap-1 px-2 rounded-lg w-full">
        {!isActive.current && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
        {isActive.current && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400 cursor-pointer hover:fill-indigo-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
            onClick={handleClose}
          >
            <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
          </svg>
        )}
        <input
          type="text"
          ref={inputRef}
          placeholder={placeholder}
          className="w-full outline-none pl-2"
        />
      </div>
    </form>
  );
}
