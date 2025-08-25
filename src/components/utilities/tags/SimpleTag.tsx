export type Props = {
  label: string;
  background: string;
};

/**
 * Simple tag, no icons, not clickable, nada.
 * @param param0
 * @returns
 */
export default function SimpleTag({ label, background }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium text-white ${background}`}
    >
      {label}
    </span>
  );
}
