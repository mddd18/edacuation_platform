import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { LegalTerm } from "../data/lessons";

interface LegalTermTooltipProps {
  text: string;
  terms: LegalTerm[];
}

export function LegalTermTooltip({ text, terms }: LegalTermTooltipProps) {
  // Create a map of terms for quick lookup
  const termMap = new Map(terms.map(t => [t.term.toLowerCase(), t]));
  
  // Split text into words while preserving spaces and punctuation
  const words = text.split(/(\s+|[.,;:!?])/);
  
  return (
    <TooltipProvider delayDuration={200}>
      {words.map((word, index) => {
        // Clean the word for lookup (remove punctuation)
        const cleanWord = word.replace(/[.,;:!?]/g, "").toLowerCase();
        const term = termMap.get(cleanWord);
        
        if (term) {
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted decoration-primary/50 cursor-help text-primary font-medium hover:decoration-primary transition-colors">
                  {word}
                </span>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="max-w-xs p-4 bg-primary text-white border-primary"
              >
                <div>
                  <p className="font-semibold mb-1 text-sm">{term.term}</p>
                  <p className="text-xs leading-relaxed opacity-90">{term.definition}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        }
        
        return <span key={index}>{word}</span>;
      })}
    </TooltipProvider>
  );
}
