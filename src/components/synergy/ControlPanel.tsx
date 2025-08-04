"use client";

import { Polymer, Synergist } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ControlPanelProps {
  polymerId: string;
  synergistId: string;
  unit: 'C' | 'F';
  sortedPolymers: Polymer[];
  sortedSynergists: [string, Synergist][];
  handlePolymerChange: (value: string) => void;
  handleSynergistChange: (value: string) => void;
  onUnitChange: (checked: boolean) => void;
  resetTool: () => void;
}

export function ControlPanel({
  polymerId,
  synergistId,
  unit,
  sortedPolymers,
  sortedSynergists,
  handlePolymerChange,
  handleSynergistChange,
  onUnitChange,
  resetTool
}: ControlPanelProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="space-y-6">
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
      <div className="flex justify-between items-center mt-6 pt-6 border-t">
        <div className="flex items-center space-x-2">
          <Label htmlFor="temp-unit" className={cn("text-gray-600", { 'font-bold text-neograf-dark-gray': unit === 'C' })}>°C</Label>
          <Switch id="temp-unit" checked={unit === 'F'} onCheckedChange={onUnitChange} />
          <Label htmlFor="temp-unit" className={cn("text-gray-600", { 'font-bold text-neograf-dark-gray': unit === 'F' })}>°F</Label>
        </div>
        <Button onClick={resetTool} className="px-4 py-2 bg-neograf-dark-gray text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition shadow">
          Reset Selections
        </Button>
      </div>
    </div>
  );
}