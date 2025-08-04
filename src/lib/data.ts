import { SynergyData } from '@/types';

export const synergyData: SynergyData = {
    polymers: [
        { id: "abs", name: "ABS", abbr: "ABS", processingTempMinC: 200, processingTempMaxC: 250 },
        { id: "epoxy", name: "Epoxy Coating", abbr: "Epoxy", processingTempMinC: 120, processingTempMaxC: 150 },
        { id: "hdpe", name: "High-Density Polyethylene (HDPE)", abbr: "HDPE", processingTempMinC: 180, processingTempMaxC: 220 },
        { id: "latex", name: "Latex Foam", abbr: "Latex", processingTempMinC: 100, processingTempMaxC: 120 },
        { id: "ldpe", name: "Low-Density Polyethylene (LDPE)", abbr: "LDPE", processingTempMinC: 150, processingTempMaxC: 200 },
        { id: "pa6", name: "Polyamide (PA6)", abbr: "PA6", processingTempMinC: 240, processingTempMaxC: 280 },
        { id: "pa66", name: "Polyamide (PA66)", abbr: "PA66", processingTempMinC: 260, processingTempMaxC: 290 },
        { id: "pbt", name: "Polybutylene Terephthalate (PBT)", abbr: "PBT", processingTempMinC: 240, processingTempMaxC: 270 },
        { id: "pc", name: "Polycarbonate (PC)", abbr: "PC", processingTempMinC: 280, processingTempMaxC: 320 },
        { id: "pet", name: "Polyethylene Terephthalate (PET)", abbr: "PET", processingTempMinC: 270, processingTempMaxC: 290 },
        { id: "pom", name: "Polyoxymethylene (POM/Acetal)", abbr: "POM", processingTempMinC: 190, processingTempMaxC: 230 },
        { id: "pp", name: "Polypropylene (PP)", abbr: "PP", processingTempMinC: 200, processingTempMaxC: 240 },
        { id: "ps", name: "Polystyrene (PS)", abbr: "PS", processingTempMinC: 180, processingTempMaxC: 220 },
        { id: "pu_foam", name: "Polyurethane Foam", abbr: "PU Foam", processingTempMinC: 100, processingTempMaxC: 120 },
        { id: "pvc", name: "PVC", abbr: "PVC", processingTempMinC: 160, processingTempMaxC: 200 },
    ],
    synergists: {
        none: { name: "(None - Show all suitable grades)", abbr: "None", decompMinC: 0, decompMaxC: 1000 },
        ath: { name: "Aluminum Hydroxide (ATH)", abbr: "ATH", decompMinC: 180, decompMaxC: 200 },
        dper: { name: "Dipentaerythritol (DPER)", abbr: "DPER", decompMinC: 240, decompMaxC: 270 },
        app: { name: "Ammonium Polyphosphate (APP)", abbr: "APP", decompMinC: 240, decompMaxC: 300 },
        pepa: { name: "Pentaerythritol (PEPA)", abbr: "PEPA", decompMinC: 250, decompMaxC: 280 },
        zb: { name: "Zinc Borate", abbr: "ZB", decompMinC: 290, decompMaxC: 450 },
        mh: { name: "Magnesium Hydroxide (MDH)", abbr: "MDH", decompMinC: 300, decompMaxC: 320 },
        mc: { name: "Melamine Cyanurate (MC)", abbr: "MC", decompMinC: 350, decompMaxC: 350 },
        mpp: { name: "Melamine Polyphosphate (MPP)", abbr: "MPP", decompMinC: 350, decompMaxC: 400 },
    },
    grafguardGrades: [
        { name: "GG 160-50N", onsetTempC: 160, particleSize: "Large", mesh: "50", chemistry: "Neutral (N)", expansion: 290, description: "Low-temperature grade with high expansion, ideal for latex foams and epoxy coatings where processing temperatures are minimal.", expansion400C: 150, expansion800C: 350 },
        { name: "GG 160-80N", onsetTempC: 160, particleSize: "Medium", mesh: "80", chemistry: "Neutral (N)", expansion: 200, description: "A versatile low-temperature grade with moderate expansion, suitable for a wide range of low-temp polymers and coatings.", expansion400C: 110, expansion800C: 250 },
        { name: "GG 180-60N", onsetTempC: 180, particleSize: "Large", mesh: "50", chemistry: "Neutral (N)", expansion: 240, description: "Excellent for polyolefins like HDPE and LDPE, offering high expansion just above common processing temperatures.", expansion400C: 130, expansion800C: 300 },
        { name: "GG 200-100N", onsetTempC: 200, particleSize: "Medium", mesh: "100", chemistry: "Neutral (N)", expansion: 160, description: "A balanced grade for polymers like ABS and PP, providing good expansion with a finer particle size for better dispersion.", expansion400C: 90, expansion800C: 200 },
        { name: "GG 210-200N", onsetTempC: 210, particleSize: "Small", mesh: "200", chemistry: "Neutral (N)", expansion: 120, description: "Fine particle grade for applications requiring a smooth surface finish, such as in certain PVC or POM formulations.", expansion400C: 70, expansion800C: 150 },
        { name: "GG 220-50N", onsetTempC: 220, particleSize: "Large", mesh: "50", chemistry: "Neutral (N)", expansion: 170, description: "A robust grade for polypropylenes and other mid-range polymers, offering significant char formation.", expansion400C: 95, expansion800C: 210 },
        { name: "GG 220-80B", onsetTempC: 220, particleSize: "Medium", mesh: "80", chemistry: "Basic (B)", expansion: 165, description: "Basic chemistry grade designed for synergy with specific additives in polyamides and other engineering plastics.", expansion400C: 90, expansion800C: 205 },
        { name: "GG 220-80N", onsetTempC: 220, particleSize: "Medium", mesh: "80", chemistry: "Neutral (N)", expansion: 165, description: "The neutral counterpart to 220-80B, widely used in various thermoplastic applications for its reliable performance.", expansion400C: 90, expansion800C: 205 },
        { name: "GG 225-270N", onsetTempC: 225, particleSize: "Small", mesh: "270", chemistry: "Neutral (N)", expansion: 50, description: "Very fine particle grade for high-performance applications where maintaining mechanical properties is critical.", expansion400C: 30, expansion800C: 70 },
        { name: "GG 250-50N", onsetTempC: 250, particleSize: "Large", mesh: "50", chemistry: "Neutral (N)", expansion: 30, description: "High-temperature grade for engineering plastics like PA6 and PBT, activating at temperatures well above their processing range.", expansion400C: 15, expansion800C: 50 },
        { name: "GG 280-50N", onsetTempC: 280, particleSize: "Large", mesh: "50", chemistry: "Neutral (N)", expansion: 50, description: "Designed for high-temperature polymers such as PC and PET, providing flame retardancy without premature expansion.", expansion400C: 25, expansion800C: 80 }
    ]
};