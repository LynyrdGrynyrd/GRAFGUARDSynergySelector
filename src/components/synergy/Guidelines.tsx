export function Guidelines() {
  return (
    <div className="mb-8">
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold mb-3 text-neograf-green">General EG Loading Guidelines</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold">General EG Loading:</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>5–15 wt%:</strong> Common range for most polymers to balance flame retardancy and mechanical properties.</li>
              <li><strong>&lt;10 wt%:</strong> Recommended for applications requiring good processability and minimal property degradation.</li>
              <li><strong>15–25 wt%:</strong> Used in high-demand flame retardancy applications (e.g., UL-94 V0).</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Loading Optimization Principles:</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>Total Loading Threshold:</strong> Degradation of mechanical properties can be significant above 30 wt% total additives. 15–25 wt% is an optimal balance for most systems.</li>
              <li><strong>Synergist Ratios:</strong> An EG:Synergist ratio is typically 2:1 to 3:1 (e.g., 15% EG + 5% synergist).</li>
              <li><strong>Mechanical Property Preservation:</strong> Keep EG ≤10 wt% when tensile strength/elongation are critical.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Polymer-Specific Considerations:</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>Engineering Plastics (PA6, PC):</strong> Tolerate higher loadings (20–25 wt% total).</li>
              <li><strong>Polyolefins (PP, PE):</strong> Require careful balancing (15–20 wt% optimal).</li>
              <li><strong>Foams (PUF):</strong> Benefit from lower-density synergists to maintain cellular structure.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}