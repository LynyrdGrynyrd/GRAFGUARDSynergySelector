"use client";

import React, { useState, useMemo } from 'react';
import { synergyData } from '@/lib/data';
import { GrafguardGrade } from '@/types';
import { Header } from '@/components/synergy/Header';
import { EducationalSection } from '@/components/synergy/EducationalSection';
import { Guidelines } from '@/components/synergy/Guidelines';
import { Resources } from '@/components/synergy/Resources';
import { Footer } from '@/components/synergy/Footer';
import { ResultsDisplay } from '@/components/synergy/ResultsDisplay';
import { GradeDetailModal } from './synergy/GradeDetailModal';
import { ControlPanel } from './synergy/ControlPanel';

type SortKey = keyof Omit<GrafguardGrade, 'description' | 'expansion400C' | 'expansion800C'>;

export function SynergySelector() {
  const [polymerId, setPolymerId] = useState<string>('');
  const [synergistId, setSynergistId] = useState<string>('');
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>({ key: 'name', direction: 'ascending' });
  const [selectedGrade, setSelectedGrade] = useState<GrafguardGrade | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    polymerId ? synergyData.polymers.find(p => p.id === polymerId) : null,
    [polymerId]
  );

  const selectedSynergist = useMemo(() =>
    synergistId ? synergyData.synergists[synergistId] : null,
    [synergistId]
  );

  const recommendedGrades = useMemo(() => {
    let available: GrafguardGrade[];

    if (!selectedPolymer) {
      available = [...synergyData.grafguardGrades];
    } else {
      available = synergyData.grafguardGrades.filter(grade => grade.onsetTempC >= selectedPolymer.processingTempMaxC);
      
      if (selectedSynergist && synergistId && synergistId !== 'none') {
        available = available.filter(grade => 
          grade.onsetTempC >= selectedSynergist.decompMinC && grade.onsetTempC <= selectedSynergist.decompMaxC
        );
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
    
    return available;
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

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Header />
      <EducationalSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <aside className="lg:col-span-1 space-y-8">
          <ControlPanel
            polymerId={polymerId}
            synergistId={synergistId}
            unit={unit}
            sortedPolymers={sortedPolymers}
            sortedSynergists={sortedSynergists}
            handlePolymerChange={handlePolymerChange}
            handleSynergistChange={handleSynergistChange}
            onUnitChange={handleUnitChange}
            resetTool={resetTool}
          />
          <Guidelines />
          <Resources />
        </aside>

        <main className="lg:col-span-2">
          <ResultsDisplay
            polymer={selectedPolymer}
            synergist={selectedSynergist}
            recommendedGrades={recommendedGrades}
            hoveredGrade={hoveredGrade}
            setHoveredGrade={setHoveredGrade}
            unit={unit}
            sortConfig={sortConfig}
            requestSort={requestSort}
            onGradeClick={handleGradeClick}
          />
        </main>
      </div>

      <Footer />
      <GradeDetailModal
        grade={selectedGrade}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}