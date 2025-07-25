export const Tabs = ({
  items,
  active,
  setActive,
}: {
  items: {label: string}[];
  active: string;
  setActive: (label: string) => void;
}) => (
  <div className="flex space-x-1 bg-neutral-50/50 dark:bg-neutral-950/50 border border-neutral-300 dark:border-neutral-800 p-1 rounded-lg">
    {items.map((item) => (
      <button
        key={item.label}
        onClick={() => setActive(item.label)}
        className={`px-4 py-1.5 text-sm cursor-pointer font-medium rounded-md transition-colors duration-200 ${
          active === item.label
            ? "bg-lime-600 text-white dark:text-zinc-200"
            : "text-muted-foreground hover:bg-zinc-500/20"
        }`}
      >
        {item.label}
      </button>
    ))}
  </div>
);
