export function EducationalSection() {
  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h2 className="text-2xl font-semibold text-neograf-dark-gray mb-3">What is Expandable Graphite?</h2>
      <p className="text-sm">
        Expandable graphite, like GRAFGUARD®, is a non-halogenated, intumescent fire retardant. When exposed to heat, it expands dramatically to form a thick, non-burnable char layer. This "condensed phase" action is different from other flame retardants:
      </p>
      <div className="mt-4 space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-7 h-7 text-neograf-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <h4 className="font-semibold text-neograf-dark-gray">Intumescent Systems (GRAFGUARD®)</h4>
            <p className="text-sm text-gray-600">Forms a physical char barrier, insulating the material from heat and oxygen.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </div>
          <div>
            <h4 className="font-semibold text-neograf-dark-gray">Vapor/Gas Phase Retardants</h4>
            <p className="text-sm text-gray-600">Release non-combustible gases (e.g., halogens) to dilute flammable gases and inhibit combustion in the air.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
            <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg>
          </div>
          <div>
            <h4 className="font-semibold text-neograf-dark-gray">Cooling Agents</h4>
            <p className="text-sm text-gray-600">Undergo an endothermic (heat-absorbing) reaction, often releasing water (e.g., ATH, Mg(OH)₂) to cool the material.</p>
          </div>
        </div>
      </div>
      <p className="text-sm mt-4 font-semibold">The key to maximizing effectiveness is to select a GRAFGUARD® grade with an onset temperature safely above the polymer's processing temperature, but within the decomposition range of the synergistic additive.</p>
    </div>
  );
}