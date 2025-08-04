import { GrafguardGrade } from '@/types';
import { cn, cToF } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

type SortKey = keyof Omit<GrafguardGrade, 'description' | 'expansion400C' | 'expansion800C'>;

interface RecommendationsTableProps {
  recommendedGrades: GrafguardGrade[];
  hoveredGrade: string | null;
  setHoveredGrade: (grade: string | null) => void;
  unit: 'C' | 'F';
  sortConfig: { key: SortKey; direction: 'ascending' | 'descending' } | null;
  requestSort: (key: SortKey) => void;
  onGradeClick: (grade: GrafguardGrade) => void;
}

export function RecommendationsTable({ recommendedGrades, hoveredGrade, setHoveredGrade, unit, sortConfig, requestSort, onGradeClick }: RecommendationsTableProps) {
  if (recommendedGrades.length === 0) {
    return <p className="text-neograf-blue">No optimal GRAFGUARD® grades align with this synergist's temperature range. Consider an alternative synergist.</p>;
  }

  const getSortIcon = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="p-0">
                <Button variant="ghost" onClick={() => requestSort('name')} className="w-full justify-start p-2 font-semibold">
                  Grade Name {getSortIcon('name')}
                </Button>
              </th>
              <th className="p-0">
                 <Button variant="ghost" onClick={() => requestSort('particleSize')} className="w-full justify-start p-2 font-semibold">
                  Particle Size {getSortIcon('particleSize')}
                </Button>
              </th>
              <th className="p-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" onClick={() => requestSort('onsetTempC')} className="w-full justify-start p-2 font-semibold cursor-help">
                      Onset Temp. <span className="text-gray-400 ml-1">(?)</span> {getSortIcon('onsetTempC')}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[220px]">Temperature at which the material begins to expand.</p>
                  </TooltipContent>
                </Tooltip>
              </th>
              <th className="p-0">
                <Button variant="ghost" onClick={() => requestSort('chemistry')} className="w-full justify-start p-2 font-semibold">
                  Chemistry {getSortIcon('chemistry')}
                </Button>
              </th>
              <th className="p-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" onClick={() => requestSort('expansion')} className="w-full justify-start p-2 font-semibold cursor-help">
                      Typical Expansion* (cc/g) <span className="text-gray-400 ml-1">(?)</span> {getSortIcon('expansion')}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[220px]">Volume expansion measured at 600°C. Higher values form a thicker char layer.</p>
                  </TooltipContent>
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {recommendedGrades.map((grade, index) => (
              <tr
                key={grade.name}
                className={cn(
                  'border-t cursor-pointer hover:bg-blue-50 transition-colors',
                  { 'bg-gray-50': index % 2 !== 0 },
                  { 'highlight-row': hoveredGrade === grade.name }
                )}
                onMouseEnter={() => setHoveredGrade(grade.name)}
                onMouseLeave={() => setHoveredGrade(null)}
                onClick={() => onGradeClick(grade)}
              >
                <td className="p-2 font-medium text-neograf-blue">{grade.name}</td>
                <td className="p-2">{grade.particleSize} ({grade.mesh} Mesh)</td>
                <td className="p-2">{unit === 'C' ? grade.onsetTempC : cToF(grade.onsetTempC)}°{unit}</td>
                <td className="p-2">{grade.chemistry}</td>
                <td className="p-2">{grade.expansion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-1">*Typical expansion values at 600°C. See TDS for full details.</p>
    </TooltipProvider>
  );
}