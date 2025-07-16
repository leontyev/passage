// src/components/ComparisonBar.tsx

interface ComparisonBarProps {
  value: number;
  maxValue: number;
  barColor?: string;
}

export function ComparisonBar({
  value,
  maxValue,
  barColor = '#6b7280' /* gray-500 */,
}: ComparisonBarProps) {
  const widthPercentage = (value / maxValue) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="h-4"
        style={{
          width: `${widthPercentage}%`,
          backgroundColor: barColor,
        }}
      />
    </div>
  );
}
