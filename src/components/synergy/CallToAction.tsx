import { Button } from "@/components/ui/button";
import { Book, Mail, Lightbulb } from "lucide-react";

export function CallToAction() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
      <h2 className="text-2xl font-bold text-neograf-dark-gray mb-2">
        Ready to Solve Your FR Challenge?
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        This tool provides a starting point. Our application engineers can help you select the perfect material for your specific design.
      </p>
      <p className="text-sm text-gray-500 mt-4 mb-6">
        Built with pride in Lakewood OH, USA — Just like our products!
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <Button asChild size="lg" className="bg-neograf-blue hover:bg-neograf-blue/90 text-white w-full sm:w-auto">
          <a href="https://neograf.com/contact-us/" target="_blank" rel="noopener noreferrer">
            <Mail className="mr-2 h-5 w-5" /> Contact an Expert
          </a>
        </Button>
        <Button asChild size="lg" className="bg-neograf-dark-gray hover:bg-neograf-dark-gray/90 text-white w-full sm:w-auto">
          <a href="https://neograf.live.itonicsit.de/insights" target="_blank" rel="noopener noreferrer">
            <Lightbulb className="mr-2 h-5 w-5" /> Submit Innovation Idea
          </a>
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-sm">
        <a href="https://www.neograf.com/wp-content/uploads/2023/04/grafguard-tds-226.pdf" target="_blank" rel="noopener noreferrer" className="text-neograf-blue hover:underline transition flex items-center gap-1">
          <Book className="h-4 w-4" /> View Technical Data Sheet
        </a>
        <a href="https://www.neograf.com/wp-content/uploads/2023/04/grafguard-sell-sheet.pdf" target="_blank" rel="noopener noreferrer" className="text-neograf-blue hover:underline transition flex items-center gap-1">
          <Book className="h-4 w-4" /> View Sell Sheet
        </a>
      </div>
    </div>
  );
}