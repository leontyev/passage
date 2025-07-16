// src/components/MultiLineChart.tsx

import { useMemo, useRef, useState, useLayoutEffect } from 'react';

// --- HELPER FUNCTION TO GENERATE THE SMOOTH PATH  ---
const createSvgPath = (points: [number, number][], tension = 1.5) => {
  if (points.length < 2) return '';

  // Start the path data string
  let pathData = `M ${points[0][0]},${points[0][1]}`;

  // This loop iterates through the segments of the line
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    // This is the standard Catmull-Rom to Cubic Bezier conversion
    // It calculates the two control points needed for a smooth curve
    const cp1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension;
    const cp1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension;
    const cp2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension;
    const cp2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension;

    // Add the cubic Bezier curve segment to the path
    pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }

  return pathData;
};

// --- COMPONENT DEFINITION ---
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
    <svg
      ref={svgRef}
      className="w-full h-full"
      preserveAspectRatio="none"
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
    >
      {datasets.map((dataset) => {
        const points: [number, number][] = dataset.data.map((value, index) => {
          const x = (index / (dataset.data.length - 1)) * viewBox.width;
          const yPadding = viewBox.height * 0.05;
          const y =
            viewBox.height -
            yPadding -
            ((value - min) / (range || 1)) * (viewBox.height - yPadding * 2);
          return [x, y];
        });

        const pathData = createSvgPath(points);

        return (
          <path
            key={dataset.label}
            d={pathData}
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
