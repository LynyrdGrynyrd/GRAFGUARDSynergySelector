export function Resources() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">Resources & Feedback</h3>
      <div className="flex flex-col gap-2 text-sm">
        <a href="https://neograf.com/wp-content/uploads/NGS_TDS226_GrafGuard-Flame-Retardant-Additive_4-1-23_WEB.pdf" target="_blank" rel="noopener noreferrer" className="text-neograf-blue hover:underline transition">View Technical Data Sheet</a>
        <a href="https://www.neograf.com/wp-content/uploads/2023/04/grafguard-sell-sheet.pdf" target="_blank" rel="noopener noreferrer" className="text-neograf-blue hover:underline transition">View Sell Sheet</a>
        <a href="https://neograf.live.itonicsit.de/insights" target="_blank" rel="noopener noreferrer" className="font-semibold text-neograf-blue hover:underline transition">Submit Innovation Idea</a>
        <a href="https://neograf.com/contact-us/" target="_blank" rel="noopener noreferrer" className="text-neograf-blue hover:underline transition">Contact an Expert</a>
      </div>
    </div>
  );
}