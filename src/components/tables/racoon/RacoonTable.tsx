import { JSX } from "react/jsx-dev-runtime";
import NavigationArrows from "@/components/utilities/NavigationArrows";
import RacoonSearch from "./RacoonSearch";

type Props = {
  isLoading: boolean;
  loaders: Array<{
    cells: Array<JSX.Element | string>;
  }>;

  rows: Array<{
    cells: Array<JSX.Element | string>;
  }>;
  headers: Array<JSX.Element | string>;

  emptyState: JSX.Element;

  onSearchSubmit: (searchTerm: string) => void;
  onSearchClose: () => void;
  searchPlaceholder: string;

  onNextPageClick: () => void;
  onPreviousPageClick: () => void;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export default function RacoonTable({
  isLoading,
  loaders,
  rows,
  headers,
  emptyState,
  onSearchSubmit,
  onSearchClose,
  searchPlaceholder,
  hasNextPage,
  onNextPageClick,
  onPreviousPageClick,
  hasPreviousPage,
}: Props) {
  return (
    <div className="mt-6 shadow-sm border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <section className="w-full flex border-b border-gray-300 dark:border-gray-700">
        <div className="py-3 px-4 w-1/2">
          <RacoonSearch
            placeholder={searchPlaceholder}
            onSubmit={onSearchSubmit}
            onClose={onSearchClose}
          />
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
      <table className="w-full table-auto">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        {isLoading && (
          <tbody>
            {loaders.map((loader, rowIndex) => (
              <tr key={rowIndex}>
                {loader.cells.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
        {!isLoading && (
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={headers.length}>{emptyState}</td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        )}
      </table>
    </div>
  );
}
