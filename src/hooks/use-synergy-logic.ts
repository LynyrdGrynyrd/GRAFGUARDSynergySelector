import { useState, useMemo, useRef, useEffect } from 'react';
import { synergyData } from '@/lib/data';
import { GrafguardGrade } from '@/types';

type SortKey = keyof Omit<GrafguardGrade, 'description' | 'expansion400C' | 'expansion800C'>;

export function useSynergyLogic() {
  const [polymerId, setPolymerId] = useState<string>('');
  const [synergistId, setSynergistId] = useState<string>('');
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>({ key: 'name', direction: 'ascending' });
  const [selectedGrade, setSelectedGrade] = useState<GrafguardGrade | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const sortedPolymers = useMemo(() => 
    [...synergyData.polymers].sort((a, b) => a.name.localeCompare(b.name)), 
    []
  );

  const sortedSynergists = useMemo(() => 
    Object.entries(synergyData.synergists)
      .sort(([, a], [, b]) => a.decompMinC - b.decompMinC),
    []
  );

  const selectedPolymer = useMemo(() => 
    synergyData.polymers.find(p => p.id === polymerId) ?? null,
    [polymerId]
  );

  const selectedSynergist = useMemo(() =>
    synergyData.synergists[synergistId] ?? null,
    [synergistId]
  );

  const { recommendedGrades, bestMatchGradeName } = useMemo(() => {
    let available: GrafguardGrade[];
    let bestMatch: string | null = null;

    if (!selectedPolymer) {
      available = [...synergyData.grafguardGrades];
    } else {
      available = synergyData.grafguardGrades.filter(grade => grade.onsetTempC >= selectedPolymer.processingTempMaxC);
      
      if (selectedSynergist && synergistId && synergistId !== 'none') {
        const synergisticGrades = available.filter(grade => 
          grade.onsetTempC >= selectedSynergist.decompMinC && grade.onsetTempC <= selectedSynergist.decompMaxC
        );
        
        if (synergisticGrades.length > 0) {
          // Find the best match: lowest onset temp within the synergistic range
          bestMatch = synergisticGrades.reduce((best, current) => {
            return current.onsetTempC < best.onsetTempC ? current : best;
          }).name;
        }
        available = synergisticGrades;
      }
    }

    if (sortConfig) {
      available.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return { recommendedGrades: available, bestMatchGradeName: bestMatch };
  }, [selectedPolymer, selectedSynergist, synergistId, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handlePolymerChange = (value: string) => {
    setPolymerId(value);
    setSynergistId('');
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSynergistChange = (value: string) => {
    setSynergistId(value);
  };

  const handleUnitChange = (checked: boolean) => {
    setUnit(checked ? 'F' : 'C');
  };

  const resetTool = () => {
    setPolymerId('');
    setSynergistId('');
  };

  const handleGradeClick = (grade: GrafguardGrade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedGrade(null), 300);
  };

  return {
    // State
    polymerId,
    synergistId,
    hoveredGrade,
    unit,
    sortConfig,
    selectedGrade,
    isModalOpen,
    resultsRef,
    
    // Derived State
    sortedPolymers,
    sortedSynergists,
    selectedPolymer,
    selectedSynergist,
    recommendedGrades,
    bestMatchGradeName,

    // State Setters & Handlers
    setHoveredGrade,
    requestSort,
    handlePolymerChange,
    handleSynergistChange,
    handleUnitChange,
    resetTool,
    handleGradeClick,
    closeModal,
  };
}