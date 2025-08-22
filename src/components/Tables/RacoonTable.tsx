import { JSX } from "react/jsx-dev-runtime";
import NavigationArrows from "../Utilities/NavigationArrows";
import { useRef } from "react";

type Props = {
  headings: Array<JSX.Element>;
  isLoading: boolean;
  loadingSkeleton: {
    rows: number;
    columns: number;
  };
  hasNextPage: boolean;
  onNextPageClick: () => void;
  onPreviousPageClick: () => void;
  hasPreviousPage: boolean;
  searchSubmit: (searchTerm: string) => void;
  searchClose: () => void;
  searchPlaceholder: string;
  emptyMessage: string;
  rows: Array<{
    cells: Array<JSX.Element | string>;
    buttons?: Array<{
      className: string;
      label: string;
      icon: JSX.Element;
      onClick: (row: { [key: string]: any }) => void;
    }>;
  }>;
};

export default function RacoonTable({
  headings,
  rows,
  isLoading,
  loadingSkeleton,
  emptyMessage,
  searchSubmit,
  searchClose,
  searchPlaceholder,
  hasNextPage,
  hasPreviousPage,
  onNextPageClick,
  onPreviousPageClick,
}: Props) {
  const hasButtons = rows.some((row) => row.buttons && row.buttons.length > 0);
  const isSearchActive = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = inputRef.current?.value || "";
    isSearchActive.current = true;
    searchSubmit(searchTerm);
  };
  const onSearchClose = () => {
    isSearchActive.current = false;
    if (inputRef.current) inputRef.current.value = "";
    searchClose();
  };
  const renderRows = () => {
    if (isLoading) {
      return Array.from({ length: loadingSkeleton.rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="">
          {Array.from({ length: loadingSkeleton.columns }).map(
            (_, cellIndex) => (
              <td key={cellIndex} className="px-6 py-3">
                <div className="animate-pulse w-19 h-2 bg-gray-200 dark:bg-gray-800"></div>
              </td>
            )
          )}
          {hasButtons && <td className="px-6 py-3"></td>}
        </tr>
      ));
    }
    if (rows.length === 0) {
      return (
        <tr>
          <td
            colSpan={headings.length + (hasButtons ? 1 : 0)}
            className="text-center py-3"
          >
            {emptyMessage}
          </td>
        </tr>
      );
    }
    return rows.map((row, index) => (
      <tr key={index} className="">
        {row.cells.map((cell, cellIndex) => (
          <td
            key={cellIndex}
            className="px-6 py-3 whitespace-nowrap dark:text-gray-200"
          >
            {cell}
          </td>
        ))}
        {hasButtons && row.buttons && (
          <td className="px-6 py-3 whitespace-nowrap dark:text-gray-200">
            {row.buttons.map((button, buttonIndex) => (
              <button
                key={buttonIndex}
                className={button.className}
                onClick={() => button.onClick(row)}
              >
                {button.icon}
                {button.label}
              </button>
            ))}
          </td>
        )}
      </tr>
    ));
  };
  return (
    <div className="mt-6 shadow-sm border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <section className="w-full flex">
        <div className="py-3 px-4 w-1/2">
          <form
            onSubmit={(e) => onSearchSubmit(e)}
            className="flex-1 items-center justify-start lg:flex lg:pb-0 w-full"
          >
            <div className="flex items-center gap-1 px-2 rounded-lg w-full">
              {!isSearchActive.current && (
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
              {isSearchActive.current && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-400 cursor-pointer hover:fill-indigo-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                  onClick={onSearchClose}
                >
                  <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                </svg>
              )}
              <input
                type="text"
                ref={inputRef}
                placeholder={searchPlaceholder}
                className="w-full px-2 text-gray-500 bg-transparent text-sm rounded-md outline-none"
              />
            </div>
          </form>
        </div>
        <div className="py-3 px-4 w-1/2 flex flex-row-reverse">
          <div>
            <NavigationArrows
              leftArrow={{
                isActive: hasPreviousPage && !isLoading,
                onClick: onPreviousPageClick,
              }}
              rightArrow={{
                isActive: hasNextPage && !isLoading,
                onClick: onNextPageClick,
              }}
            />
          </div>
        </div>
      </section>
      <section className="w-[1000px] overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="w-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 font-medium border-b dark:border-gray-700">
            <tr>
              {headings.map((heading, index) => (
                <th key={index} className="py-1 px-6">
                  {heading}
                </th>
              ))}
              {hasButtons && <th className="py-1 px-6">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y divide-gray-300">
            {renderRows()}
          </tbody>
        </table>
      </section>
    </div>
  );
}
