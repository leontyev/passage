// src/components/Sparkline.tsx

import { useState, useRef, useLayoutEffect } from 'react';

type SparklineProps = {
  data: number[];
  strokeColor?: string;
  strokeWidth?: number;
  globalMin?: number;
  globalMax?: number;
};

export function Sparkline({
  data,
  strokeColor = 'currentColor',
  strokeWidth = 2,
  globalMin,
  globalMax,
}: SparklineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (svgRef.current) {
      const { width, height } =
        svgRef.current.parentElement!.getBoundingClientRect();
      setViewBox({ width, height });
    }
  }, []);

  if (!data || data.length < 2) return null;

  const min = globalMin ?? Math.min(...data);
  const max = globalMax ?? Math.max(...data);
  const range = max - min;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * viewBox.width;
      const y =
        viewBox.height - ((value - min) / (range || 1)) * viewBox.height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  return (
    <svg ref={svgRef} className="w-full h-full" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
