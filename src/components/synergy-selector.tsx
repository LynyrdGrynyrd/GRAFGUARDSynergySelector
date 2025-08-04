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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GradeDetailModal } from './synergy/GradeDetailModal';
import { cn } from '@/lib/utils';

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
    if (!selectedPolymer) return [];

    let available = synergyData.grafguardGrades.filter(grade => grade.onsetTempC >= selectedPolymer.processingTempMaxC);
    
    if (selectedSynergist && synergistId !== 'none') {
      available = available.filter(grade => 
        grade.onsetTempC >= selectedSynergist.decompMinC && grade.onsetTempC <= selectedSynergist.decompMaxC
      );
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
    // Delay clearing grade to allow for exit animation
    setTimeout(() => setSelectedGrade(null), 300);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Header />
      <EducationalSection />

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 items-end">
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
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Label htmlFor="temp-unit" className={cn("text-gray-600", { 'font-bold text-neograf-dark-gray': unit === 'C' })}>°C</Label>
            <Switch id="temp-unit" checked={unit === 'F'} onCheckedChange={(checked) => setUnit(checked ? 'F' : 'C')} />
            <Label htmlFor="temp-unit" className={cn("text-gray-600", { 'font-bold text-neograf-dark-gray': unit === 'F' })}>°F</Label>
          </div>
          <Button onClick={resetTool} className="px-4 py-2 bg-neograf-dark-gray text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition shadow">
            Reset Selections
          </Button>
        </div>

        {polymerId && synergistId ? (
          <div className="fade-in">
            <ResultsDisplay
              polymer={selectedPolymer!}
              synergist={selectedSynergist!}
              recommendedGrades={recommendedGrades}
              hoveredGrade={hoveredGrade}
              setHoveredGrade={setHoveredGrade}
              unit={unit}
              sortConfig={sortConfig}
              requestSort={requestSort}
              onGradeClick={handleGradeClick}
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
      <GradeDetailModal
        grade={selectedGrade}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}