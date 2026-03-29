import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Scale, 
  CheckCircle2, 
  XCircle, 
  Award,
  RotateCcw
} from "lucide-react";
import { caseStudies } from "../data/cases";

export function CaseStudiesPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleCaseSelect = (caseId: string) => {
    setSelectedCase(caseId);
    setSelectedAction(null);
    setShowFeedback(false);
  };

  const handleActionSelect = (actionIndex: number) => {
    setSelectedAction(actionIndex);
    setShowFeedback(true);
  };

  const handleReset = () => {
    setSelectedAction(null);
    setShowFeedback(false);
  };

  const currentCase = caseStudies.find(c => c.id === selectedCase);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2 flex items-center gap-3">
          <Scale className="w-8 h-8 text-primary" />
          Case Studies & Practice
        </h1>
        <p className="text-muted-foreground">
          Apply your legal knowledge to real-world scenarios
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select a Case</CardTitle>
              <CardDescription>Choose a scenario to practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {caseStudies.map((caseStudy) => {
                  const isSelected = selectedCase === caseStudy.id;
                  
                  return (
                    <button
                      key={caseStudy.id}
                      onClick={() => handleCaseSelect(caseStudy.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-xs">
                          {caseStudy.category}
                        </Badge>
                        <h4 className="font-semibold text-sm">{caseStudy.title}</h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Case Details */}
        <div className="lg:col-span-2">
          {!currentCase ? (
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Scale className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select a Case to Begin</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a scenario from the list to start practicing
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Scenario Card */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2">
                        {currentCase.category}
                      </Badge>
                      <CardTitle className="text-xl">{currentCase.title}</CardTitle>
                    </div>
                    {showFeedback && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Try Again
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-primary">The Scenario:</h4>
                    <p className="text-sm leading-relaxed">
                      {currentCase.scenario}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What should be done?</CardTitle>
                  <CardDescription>
                    Select the most appropriate legal action
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentCase.actions.map((action, index) => {
                      const isSelected = selectedAction === index;
                      const isCorrect = action.isCorrect;
                      
                      let borderColor = "border-border";
                      let bgColor = "bg-white hover:bg-accent/5";
                      
                      if (showFeedback && isSelected) {
                        if (isCorrect) {
                          borderColor = "border-secondary";
                          bgColor = "bg-secondary/5";
                        } else {
                          borderColor = "border-destructive";
                          bgColor = "bg-destructive/5";
                        }
                      }

                      return (
                        <div key={index}>
                          <button
                            onClick={() => !showFeedback && handleActionSelect(index)}
                            disabled={showFeedback}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${borderColor} ${bgColor} ${
                              showFeedback ? "cursor-default" : "cursor-pointer hover:border-accent"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm flex-1">{action.text}</p>
                              {showFeedback && isSelected && (
                                <>
                                  {isCorrect ? (
                                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                                  )}
                                </>
                              )}
                            </div>
                          </button>

                          {/* Show feedback only for selected action */}
                          {showFeedback && isSelected && (
                            <div className={`mt-2 p-4 rounded-lg border ${
                              isCorrect 
                                ? "bg-secondary/5 border-secondary/20" 
                                : "bg-destructive/5 border-destructive/20"
                            }`}>
                              <div className="flex items-start gap-3">
                                {isCorrect ? (
                                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1">
                                  <h4 className="font-semibold mb-1 text-sm">
                                    {isCorrect ? "Correct!" : "Incorrect"}
                                  </h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {action.feedback}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Success Message */}
                  {showFeedback && currentCase.actions[selectedAction!]?.isCorrect && (
                    <div className="mt-6 p-4 bg-secondary/5 border-2 border-secondary/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary/10 p-2 rounded-lg">
                          <Award className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary">Case Solved!</h4>
                          <p className="text-sm text-muted-foreground">
                            +100 XP earned for correct legal reasoning
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
