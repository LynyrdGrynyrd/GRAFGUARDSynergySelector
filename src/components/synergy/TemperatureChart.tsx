import { Polymer, Synergist, GrafguardGrade } from '@/types';
import { cn, cToF } from '@/lib/utils';

interface TemperatureChartProps {
  polymer: Polymer;
  synergist: Synergist;
  recommendedGrades: GrafguardGrade[];
  hoveredGrade: string | null;
  setHoveredGrade: (grade: string | null) => void;
  unit: 'C' | 'F';
}

export function TemperatureChart({ polymer, synergist, recommendedGrades, hoveredGrade, setHoveredGrade, unit }: TemperatureChartProps) {
  const isFahrenheit = unit === 'F';
  const chartMinTempC = 100;
  const chartMaxTempC = 400;

  const chartMinTemp = isFahrenheit ? cToF(chartMinTempC) : chartMinTempC;
  const chartMaxTemp = isFahrenheit ? cToF(chartMaxTempC) : chartMaxTempC;
  const tempRange = chartMaxTemp - chartMinTemp;

  const getPosition = (tempC: number) => {
    const temp = isFahrenheit ? cToF(tempC) : tempC;
    return Math.max(0, Math.min(100, ((temp - chartMinTemp) / tempRange) * 100));
  };

  const polymerStart = getPosition(polymer.processingTempMinC);
  const polymerWidth = getPosition(polymer.processingTempMaxC) - polymerStart;

  const synergistStart = getPosition(synergist.decompMinC);
  const synergistWidth = getPosition(synergist.decompMaxC) - synergistStart;

  const sortedRecommended = [...recommendedGrades].sort((a, b) => a.onsetTempC - b.onsetTempC);

  const tempLabels = isFahrenheit
    ? [100, 150, 200, 250, 300, 350, 400].map(c => cToF(c))
    : [100, 150, 200, 250, 300, 350, 400];

  // Optimal zone is the synergist's decomposition range
  const optimalZoneStart = synergist.abbr !== 'None' ? synergistStart : -1;
  const optimalZoneWidth = synergist.abbr !== 'None' ? synergistWidth : -1;

  return (
    <div className="bg-gray-50 p-4 rounded-lg relative overflow-x-auto">
      <div className="flex justify-between text-xs text-gray-500 mb-2 px-2">
        {tempLabels.map(t => <span key={t}>{t}°{unit}</span>)}
      </div>
      <div className="relative h-48 bg-gradient-to-r from-blue-100 via-yellow-50 to-red-100 rounded-md">
        {/* Grid Lines */}
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '16.66%' }}></div>
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '33.33%' }}></div>
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '50%' }}></div>
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '66.66%' }}></div>
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '83.33%' }}></div>

        {/* Optimal Activation Zone */}
        {optimalZoneStart > -1 && (
          <div 
            className="absolute top-0 h-full bg-green-500/10 border-x border-dashed border-neograf-green/50"
            style={{ left: `${optimalZoneStart}%`, width: `${optimalZoneWidth}%` }}
          >
            <div className="absolute -bottom-5 text-xs text-neograf-green font-semibold transform -translate-x-1/2 whitespace-nowrap" style={{ left: '50%' }}>
              Optimal Activation Zone
            </div>
          </div>
        )}

        {/* Chart Bars Container */}
        <div className="absolute w-full h-full top-0 left-0">
          {/* Polymer Bar */}
          <div style={{ left: `${polymerStart}%`, width: `${polymerWidth}%` }} className="chart-bar absolute h-6 top-4 rounded bg-purple-400 bg-opacity-60 border border-purple-500"></div>
          <div style={{ left: `${polymerStart + polymerWidth / 2}%` }} className="absolute -top-1 text-xs text-purple-700 font-semibold transform -translate-x-1/2 whitespace-nowrap">{polymer.abbr} Processing</div>

          {/* Synergist Bar */}
          {synergist.abbr !== 'None' && (
            <>
              <div style={{ left: `${synergistStart}%`, width: `${synergistWidth}%` }} className="chart-bar absolute h-6 top-4 rounded bg-neograf-blue bg-opacity-60 border border-neograf-blue"></div>
              <div style={{ left: `${synergistStart + synergistWidth / 2}%` }} className="absolute top-11 text-xs text-neograf-blue font-semibold transform -translate-x-1/2 whitespace-nowrap">{synergist.abbr} Decomp.</div>
            </>
          )}
        </div>

        {/* Chart Grades Container */}
        <div className="absolute w-full h-full top-0 left-0">
          {sortedRecommended.map(grade => (
            <div
              key={grade.name}
              style={{ left: `${getPosition(grade.onsetTempC)}%` }}
              className={cn(
                'grade-marker absolute top-16 w-1 h-24 rounded-full transform -translate-x-1/2 bg-neograf-green recommended-marker',
                { 'highlight-marker': hoveredGrade === grade.name }
              )}
              title={`${grade.name} (Onset: ${isFahrenheit ? cToF(grade.onsetTempC) : grade.onsetTempC}°${unit})`}
              onMouseEnter={() => setHoveredGrade(grade.name)}
              onMouseLeave={() => setHoveredGrade(null)}
            >
              <span className="absolute text-xs text-neograf-green font-bold rotated-label">
                {grade.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}