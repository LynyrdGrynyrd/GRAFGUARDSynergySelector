"use client";

import React, { useState, useMemo } from 'react';
import { synergyData } from '@/lib/data';
import { Header } from '@/components/synergy/Header';
import { EducationalSection } from '@/components/synergy/EducationalSection';
import { Guidelines } from '@/components/synergy/Guidelines';
import { Resources } from '@/components/synergy/Resources';
import { Footer } from '@/components/synergy/Footer';
import { ResultsDisplay } from '@/components/synergy/ResultsDisplay';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function SynergySelector() {
  const [polymerId, setPolymerId] = useState<string>('');
  const [synergistId, setSynergistId] = useState<string>('');
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null);

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

  const { recommendedGrades } = useMemo(() => {
    if (!selectedPolymer) return { recommendedGrades: [] };

    const available = synergyData.grafguardGrades.filter(grade => grade.onsetTempC >= selectedPolymer.processingTempMaxC);
    
    if (!selectedSynergist || synergistId === 'none') {
      return { recommendedGrades: available };
    }

    const recommended = available.filter(grade => 
      grade.onsetTempC >= selectedSynergist.decompMinC && grade.onsetTempC <= selectedSynergist.decompMaxC
    );
    
    return { recommendedGrades: recommended };
  }, [selectedPolymer, selectedSynergist, synergistId]);

  const handlePolymerChange = (value: string) => {
    setPolymerId(value);
    setSynergistId(''); // Reset synergist when polymer changes
  };

  const handleSynergistChange = (value: string) => {
    setSynergistId(value);
  };

  const resetTool = () => {
    setPolymerId('');
    setSynergistId('');
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Header />
      <EducationalSection />

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        {/* Step 1 & 2: User Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-end">
          <div>
            <label htmlFor="polymer-select" className="block text-sm font-medium mb-1">Step 1: Select Your Polymer System</label>
            <Select onValueChange={handlePolymerChange} value={polymerId}>
              <SelectTrigger id="polymer-select" className="w-full p-3 h-auto bg-gray-100 border-gray-300 focus:ring-2 ring-neograf-blue focus:border-neograf-blue transition">
                <SelectValue placeholder="-- Please select --" />
              </SelectTrigger>
              <SelectContent>
                {sortedPolymers.map(polymer => (
                  <SelectItem key={polymer.id} value={polymer.id}>{polymer.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="synergist-select" className="block text-sm font-medium mb-1">Step 2: Select Your Primary Synergist</label>
            <Select onValueChange={handleSynergistChange} value={synergistId} disabled={!polymerId}>
              <SelectTrigger id="synergist-select" className="w-full p-3 h-auto bg-gray-100 border-gray-300 focus:ring-2 ring-neograf-blue focus:border-neograf-blue transition">
                <SelectValue placeholder="-- Please select --" />
              </SelectTrigger>
              <SelectContent>
                {sortedSynergists.map(([key, synergist]) => (
                  <SelectItem key={key} value={key}>{synergist.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="text-center mb-8">
          <Button onClick={resetTool} className="px-4 py-2 bg-neograf-dark-gray text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition shadow">
            Reset Selections
          </Button>
        </div>

        {/* Step 3: Results Display */}
        {polymerId && synergistId ? (
          <div className="fade-in">
            <ResultsDisplay
              polymer={selectedPolymer!}
              synergist={selectedSynergist!}
              recommendedGrades={recommendedGrades}
              hoveredGrade={hoveredGrade}
              setHoveredGrade={setHoveredGrade}
            />
            <Guidelines />
            <Resources />
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>{!polymerId ? 'Please make your selections above to see recommendations.' : 'Please select a synergist to continue.'}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}