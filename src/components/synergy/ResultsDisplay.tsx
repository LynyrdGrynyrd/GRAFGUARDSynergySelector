import { Polymer, Synergist, GrafguardGrade } from '@/types';
import { TemperatureChart } from './TemperatureChart';
import { RecommendationsTable } from './RecommendationsTable';

type SortKey = keyof Omit<GrafguardGrade, 'description' | 'expansion400C' | 'expansion800C'>;

interface ResultsDisplayProps {
  polymer: Polymer | null;
  synergist: Synergist | null;
  recommendedGrades: GrafguardGrade[];
  bestMatchGradeName: string | null;
  hoveredGrade: string | null;
  setHoveredGrade: (grade: string | null) => void;
  unit: 'C' | 'F';
  sortConfig: { key: SortKey; direction: 'ascending' | 'descending' } | null;
  requestSort: (key: SortKey) => void;
  onGradeClick: (grade: GrafguardGrade) => void;
}

export function ResultsDisplay({ polymer, synergist, recommendedGrades, bestMatchGradeName, hoveredGrade, setHoveredGrade, unit, sortConfig, requestSort, onGradeClick }: ResultsDisplayProps) {
  
  const getTitle = () => {
    if (polymer && synergist && synergist.abbr !== 'None') {
      return "Optimal GRAFGUARD® Grades";
    }
    if (polymer) {
      return `Suitable Grades for ${polymer.abbr}`;
    }
    return "All GRAFGUARD® Grades";
  };

  const getDescription = () => {
    if (polymer && synergist) {
      return "Click on a grade row for more detailed information.";
    }
    if (polymer) {
      return "Select a synergist to narrow down the optimal grades.";
    }
    return "Select a polymer system to see tailored recommendations and the temperature alignment chart.";
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-neograf-dark-gray mb-6 border-b pb-3">Synergy Analysis & Recommendations</h2>
      
      {polymer && synergist && (
        <div className="mb-8 fade-in">
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
      )}

      <div className="mb-8">
        <div className="bg-blue-50 p-4 sm:p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold mb-3 text-neograf-blue">{getTitle()}</h3>
          <p className="text-sm text-gray-600 mb-4">{getDescription()}</p>
          <div className="text-neograf-dark-gray overflow-x-auto">
            <RecommendationsTable
              recommendedGrades={recommendedGrades}
              bestMatchGradeName={bestMatchGradeName}
              hoveredGrade={hoveredGrade}
              setHoveredGrade={setHoveredGrade}
              unit={unit}
              sortConfig={sortConfig}
              requestSort={requestSort}
              onGradeClick={onGradeClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}