import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { GrafguardGrade } from "@/types";
import { ExpansionChart } from "./ExpansionChart";
import { Badge } from "@/components/ui/badge";

interface GradeDetailModalProps {
  grade: GrafguardGrade | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GradeDetailModal({ grade, isOpen, onClose }: GradeDetailModalProps) {
  if (!grade) return null;

  const expansionData = [
    { temp: "400°C", expansion: grade.expansion400C },
    { temp: "600°C", expansion: grade.expansion },
    { temp: "800°C", expansion: grade.expansion800C },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-neograf-dark-gray">{grade.name}</DialogTitle>
          <DialogDescription>{grade.description}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="font-semibold text-lg mb-3 border-b pb-2">Key Properties</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Onset Temperature:</span>
                <span className="font-semibold text-neograf-dark-gray">{grade.onsetTempC}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Particle Size:</span>
                <span className="font-semibold text-neograf-dark-gray">{grade.particleSize} ({grade.mesh} Mesh)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Chemistry:</span>
                <Badge variant="secondary">{grade.chemistry}</Badge>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3 border-b pb-2">Expansion Performance</h4>
            <ExpansionChart data={expansionData} />
          </div>
        </div>
        <div className="mt-6 pt-4 border-t">
            <h4 className="font-semibold text-md mb-3">Next Steps & Resources</h4>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href="https://www.neograf.com/wp-content/uploads/2023/04/grafguard-sell-sheet.pdf" target="_blank" rel="noopener noreferrer" className="text-neograf-blue hover:underline transition">View Technical Data Sheet</a>
                <a href="https://neograf.com/contact-us/" target="_blank" rel="noopener noreferrer" className="text-neograf-blue hover:underline transition">Contact an Expert</a>
                <a href="https://neograf.live.itonicsit.de/insights" target="_blank" rel="noopener noreferrer" className="font-semibold text-neograf-blue hover:underline transition">Submit Innovation Idea</a>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}