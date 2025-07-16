// src/components/MultiLineChart.tsx

import { useState, useRef, useLayoutEffect, useMemo } from 'react';

export interface DataSet {
  data: number[];
  color: string;
  label: string;
}

type MultiLineChartProps = {
  datasets: DataSet[];
};

export function MultiLineChart({ datasets }: MultiLineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (svgRef.current) {
      const { width, height } =
        svgRef.current.parentElement!.getBoundingClientRect();
      setViewBox({ width, height });
    }
  }, []);

  const { min, max } = useMemo(() => {
    const allValues = datasets.flatMap((d) => d.data);
    return { min: Math.min(...allValues), max: Math.max(...allValues) };
  }, [datasets]);

  const range = max - min;

  return (
    <svg ref={svgRef} className="w-full h-full" preserveAspectRatio="none">
      {datasets.map((dataset) => {
        const points = dataset.data
          .map((value, index) => {
            const x = (index / (dataset.data.length - 1)) * viewBox.width;
            const y =
              viewBox.height - ((value - min) / (range || 1)) * viewBox.height;
            return `${x.toFixed(2)},${y.toFixed(2)}`;
          })
          .join(' ');

        return (
          <polyline
            key={dataset.label}
            points={points}
            fill="none"
            stroke={dataset.color}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
