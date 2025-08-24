type Props = {
  items: Array<{ id: string; label: string }>;
  className?: string;
};

export default function AnchorMenu({ items, className }: Props) {
  return (
    <nav className={`flex flex-col space-y-2 ${className ?? ""}`}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-gray-500 hover:text-gray-900 text-sm"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
