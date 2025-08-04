export function Resources() {
  return (
    <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">Resources</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <a href="https://neograf.com/wp-content/uploads/NGS_TDS226_GrafGuard-Flame-Retardant-Additive_4-1-23_WEB.pdf" target="_blank" rel="noopener noreferrer" className="text-neograf-blue hover:underline transition">View GRAFGUARD® Technical Data Sheet (TDS 226)</a>
        <span className="hidden sm:block text-gray-400">|</span>
        <a href="https://neograf.com/contact-us/" target="_blank" rel="noopener noreferrer" className="text-neograf-blue hover:underline transition">Contact a NeoGraf Expert</a>
      </div>
    </div>
  );
}