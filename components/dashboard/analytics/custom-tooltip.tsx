/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomTooltip = ({active, payload}: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-lg text-sm text-zinc-100 space-y-1">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex justify-between">
          <span>{entry.name}</span>
          <span className="font-semibold text-lime-400">{entry.value} ms</span>
        </div>
      ))}
    </div>
  );
};
