export interface Polymer {
  id: string;
  name: string;
  abbr: string;
  processingTempMinC: number;
  processingTempMaxC: number;
}

export interface Synergist {
  name: string;
  abbr: string;
  decompMinC: number;
  decompMaxC: number;
}

export interface GrafguardGrade {
  name: string;
  onsetTempC: number;
  particleSize: string;
  mesh: string;
  chemistry: string;
  expansion: number;
}

export interface SynergyData {
  polymers: Polymer[];
  synergists: Record<string, Synergist>;
  grafguardGrades: GrafguardGrade[];
}