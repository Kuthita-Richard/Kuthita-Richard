type CircuitTraceProps = { className?: string; labels?: string[] };

export default function CircuitTrace({ className, labels = [] }: CircuitTraceProps) {
  const spacing = 200;
  const nodeY   = 70;
  const width   = spacing * Math.max(labels.length - 1, 1) + 80;

  return (
    <svg viewBox={`0 0 ${width} 130`} className={className} role="img" aria-label="Skill-domain circuit trace">
      <line x1={40} y1={nodeY} x2={width - 40} y2={nodeY} stroke="currentColor" strokeWidth={1} opacity={0.2} />
      {labels.map((label, i) => {
        const x = 40 + i * spacing;
        return (
          <g key={label}>
            <line x1={x} y1={nodeY} x2={x} y2={nodeY - 24} stroke="#C9A24B" strokeWidth={1.5} />
            <rect x={x - 5} y={nodeY - 5} width={10} height={10} fill="transparent" stroke="#C9A24B" strokeWidth={1.5} />
            <text x={x} y={nodeY - 34} textAnchor="middle" fontFamily='"JetBrains Mono", monospace' fill="currentColor" fontSize="10" opacity={0.7}>
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
