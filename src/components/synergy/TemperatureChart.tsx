import { Polymer, Synergist, GrafguardGrade } from '@/types';
import { cn } from '@/lib/utils';

interface TemperatureChartProps {
  polymer: Polymer;
  synergist: Synergist;
  recommendedGrades: GrafguardGrade[];
  hoveredGrade: string | null;
  setHoveredGrade: (grade: string | null) => void;
}

export function TemperatureChart({ polymer, synergist, recommendedGrades, hoveredGrade, setHoveredGrade }: TemperatureChartProps) {
  const chartMinTemp = 100;
  const chartMaxTemp = 400;
  const tempRange = chartMaxTemp - chartMinTemp;
  const getPosition = (temp: number) => Math.max(0, Math.min(100, ((temp - chartMinTemp) / tempRange) * 100));

  const polymerStart = getPosition(polymer.processingTempMinC);
  const polymerWidth = getPosition(polymer.processingTempMaxC) - polymerStart;

  const synergistStart = getPosition(synergist.decompMinC);
  const synergistWidth = getPosition(synergist.decompMaxC) - synergistStart;

  const sortedRecommended = [...recommendedGrades].sort((a, b) => a.onsetTempC - b.onsetTempC);

  return (
    <div className="bg-gray-50 p-4 rounded-lg relative overflow-x-auto">
      <div className="flex justify-between text-xs text-gray-500 mb-2 px-2">
        <span>100°C</span><span>150°C</span><span>200°C</span><span>250°C</span><span>300°C</span><span>350°C</span><span>400°C</span>
      </div>
      <div className="relative h-48 bg-gradient-to-r from-blue-100 via-yellow-50 to-red-100 rounded-md">
        {/* Grid Lines */}
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '16.66%' }}></div>
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '33.33%' }}></div>
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '50%' }}></div>
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '66.66%' }}></div>
        <div className="absolute top-0 h-full w-px bg-gray-300" style={{ left: '83.33%' }}></div>

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
              title={`${grade.name} (Onset: ${grade.onsetTempC}°C)`}
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