import { GrafguardGrade } from '@/types';
import { cn, cToF } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Inbox, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type SortKey = keyof Omit<GrafguardGrade, 'description' | 'expansion400C' | 'expansion800C'>;

interface RecommendationsTableProps {
  recommendedGrades: GrafguardGrade[];
  bestMatchGradeName: string | null;
  hoveredGrade: string | null;
  setHoveredGrade: (grade: string | null) => void;
  unit: 'C' | 'F';
  sortConfig: { key: SortKey; direction: 'ascending' | 'descending' } | null;
  requestSort: (key: SortKey) => void;
  onGradeClick: (grade: GrafguardGrade) => void;
}

export function RecommendationsTable({ recommendedGrades, bestMatchGradeName, hoveredGrade, setHoveredGrade, unit, sortConfig, requestSort, onGradeClick }: RecommendationsTableProps) {
  if (recommendedGrades.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-gray-50 rounded-lg">
        <Inbox className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No Matching Grades Found</h3>
        <p className="mt-1 text-sm text-gray-500">
          No GRAFGUARD® grades align with the selected criteria. Try adjusting the polymer or synergist.
        </p>
      </div>
    );
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
            {recommendedGrades.map((grade, index) => {
              const isBestMatch = grade.name === bestMatchGradeName;
              return (
                <tr
                  key={grade.name}
                  className={cn(
                    'border-b transition-colors duration-150 ease-in-out cursor-pointer',
                    'hover:bg-neograf-blue/10',
                    { 'bg-gray-50': index % 2 !== 0 && hoveredGrade !== grade.name && !isBestMatch },
                    { 'bg-neograf-blue/20 ring-1 ring-neograf-blue/50': hoveredGrade === grade.name },
                    { 'bg-green-100/50 border-l-4 border-l-neograf-green': isBestMatch }
                  )}
                  onMouseEnter={() => setHoveredGrade(grade.name)}
                  onMouseLeave={() => setHoveredGrade(null)}
                  onClick={() => onGradeClick(grade)}
                >
                  <td className="p-2 font-medium text-neograf-blue">
                    <div className="flex items-center gap-2">
                      <span>{grade.name}</span>
                      {isBestMatch && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="secondary" className="bg-neograf-green text-white hover:bg-neograf-green/90">
                              <Star className="h-3 w-3 mr-1" />
                              Best Match
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Optimal balance of onset temperature for the selected synergist.</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                  <td className="p-2">{grade.particleSize} ({grade.mesh} Mesh)</td>
                  <td className="p-2">{unit === 'C' ? grade.onsetTempC : cToF(grade.onsetTempC)}°{unit}</td>
                  <td className="p-2">{grade.chemistry}</td>
                  <td className="p-2">{grade.expansion}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-1">*Typical expansion values at 600°C. See TDS for full details.</p>
    </TooltipProvider>
  );
}