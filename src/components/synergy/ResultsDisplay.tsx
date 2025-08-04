import { Polymer, Synergist, GrafguardGrade } from '@/types';
import { TemperatureChart } from './TemperatureChart';
import { RecommendationsTable } from './RecommendationsTable';

type SortKey = keyof GrafguardGrade;

interface ResultsDisplayProps {
  polymer: Polymer;
  synergist: Synergist;
  recommendedGrades: GrafguardGrade[];
  hoveredGrade: string | null;
  setHoveredGrade: (grade: string | null) => void;
  unit: 'C' | 'F';
  sortConfig: { key: SortKey; direction: 'ascending' | 'descending' } | null;
  requestSort: (key: SortKey) => void;
}

export function ResultsDisplay({ polymer, synergist, recommendedGrades, hoveredGrade, setHoveredGrade, unit, sortConfig, requestSort }: ResultsDisplayProps) {
  const title = synergist.abbr === 'None' ? "Available GRAFGUARD® Grades" : "Optimal GRAFGUARD® Grades";

  return (
    <div>
      <h2 className="text-2xl font-semibold text-neograf-dark-gray mb-6 border-b pb-3">Synergy Analysis & Recommendations</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Temperature Alignment Chart</h3>
        <TemperatureChart
          polymer={polymer}
          synergist={synergist}
          recommendedGrades={recommendedGrades}
          hoveredGrade={hoveredGrade}
          setHoveredGrade={setHoveredGrade}
          unit={unit}
        />
      </div>

      <div className="mb-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold mb-3 text-neograf-blue">{title}</h3>
          <div className="text-neograf-dark-gray overflow-x-auto">
            <RecommendationsTable
              recommendedGrades={recommendedGrades}
              hoveredGrade={hoveredGrade}
              setHoveredGrade={setHoveredGrade}
              unit={unit}
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
          </div>
        </div>
      </div>
    </div>
  );
}