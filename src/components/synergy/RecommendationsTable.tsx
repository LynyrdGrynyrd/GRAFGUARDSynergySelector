import { GrafguardGrade } from '@/types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RecommendationsTableProps {
  recommendedGrades: GrafguardGrade[];
  hoveredGrade: string | null;
  setHoveredGrade: (grade: string | null) => void;
}

export function RecommendationsTable({ recommendedGrades, hoveredGrade, setHoveredGrade }: RecommendationsTableProps) {
  if (recommendedGrades.length === 0) {
    return <p className="text-neograf-blue">No optimal GRAFGUARD® grades align with this synergist's temperature range. Consider an alternative synergist.</p>;
  }

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="p-2 font-semibold">Grade Name</th>
              <th className="p-2 font-semibold">Particle Size</th>
              <th className="p-2 font-semibold">
                <Tooltip>
                  <TooltipTrigger className="cursor-help">Onset Temp. <span className="text-gray-400">(?)</span></TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[220px]">Temperature at which the material begins to expand.</p>
                  </TooltipContent>
                </Tooltip>
              </th>
              <th className="p-2 font-semibold">Chemistry</th>
              <th className="p-2 font-semibold">
                <Tooltip>
                  <TooltipTrigger className="cursor-help">Typical Expansion* (cc/g) <span className="text-gray-400">(?)</span></TooltipTrigger>
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
                  'border-t',
                  { 'bg-gray-50': index % 2 !== 0 },
                  { 'highlight-row': hoveredGrade === grade.name }
                )}
                onMouseEnter={() => setHoveredGrade(grade.name)}
                onMouseLeave={() => setHoveredGrade(null)}
              >
                <td className="p-2 font-medium">{grade.name}</td>
                <td className="p-2">{grade.particleSize} ({grade.mesh} Mesh)</td>
                <td className="p-2">{grade.onsetTempC}°C</td>
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