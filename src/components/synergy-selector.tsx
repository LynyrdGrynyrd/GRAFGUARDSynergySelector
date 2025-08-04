"use client";

import { Header } from '@/components/synergy/Header';
import { EducationalSection } from '@/components/synergy/EducationalSection';
import { Guidelines } from '@/components/synergy/Guidelines';
import { CallToAction } from '@/components/synergy/CallToAction';
import { Footer } from '@/components/synergy/Footer';
import { ResultsDisplay } from '@/components/synergy/ResultsDisplay';
import { GradeDetailModal } from './synergy/GradeDetailModal';
import { ControlPanel } from './synergy/ControlPanel';
import { useSynergyLogic } from '@/hooks/use-synergy-logic';

export function SynergySelector() {
  const {
    polymerId,
    synergistId,
    hoveredGrade,
    unit,
    sortConfig,
    selectedGrade,
    isModalOpen,
    sortedPolymers,
    sortedSynergists,
    selectedPolymer,
    selectedSynergist,
    recommendedGrades,
    bestMatchGradeName,
    setHoveredGrade,
    requestSort,
    handlePolymerChange,
    handleSynergistChange,
    handleUnitChange,
    resetTool,
    handleGradeClick,
    closeModal,
  } = useSynergyLogic();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Header />
      
      <div className="mt-8 space-y-8">
        <EducationalSection />
        
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
        
        <div>
          <ResultsDisplay
            polymer={selectedPolymer}
            synergist={selectedSynergist}
            recommendedGrades={recommendedGrades}
            bestMatchGradeName={bestMatchGradeName}
            hoveredGrade={hoveredGrade}
            setHoveredGrade={setHoveredGrade}
            unit={unit}
            sortConfig={sortConfig}
            requestSort={requestSort}
            onGradeClick={handleGradeClick}
          />
        </div>
        
        <Guidelines />
        <CallToAction />
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