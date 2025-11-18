import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Search, FileText, Scale, Eye, CheckCircle, Target } from "lucide-react";

export const TruthFunnel = () => {
  const steps = [
    {
      icon: Search,
      title: "Source",
      description: "Identify the original source and publisher",
      questions: ["Who published this?", "Is the source reputable?", "Does the domain seem legitimate?"],
    },
    {
      icon: FileText,
      title: "Evidence",
      description: "Examine the quality of evidence provided",
      questions: ["Are claims cited?", "Are there primary sources?", "Can evidence be verified?"],
    },
    {
      icon: Scale,
      title: "Logic",
      description: "Evaluate logical consistency",
      questions: ["Do the conclusions follow?", "Are there logical fallacies?", "Is reasoning sound?"],
    },
    {
      icon: Eye,
      title: "Bias",
      description: "Identify potential biases",
      questions: ["What's the perspective?", "Are opposing views presented?", "Is language neutral?"],
    },
    {
      icon: CheckCircle,
      title: "Verification",
      description: "Cross-reference with trusted sources",
      questions: ["Do other sources confirm?", "What do fact-checkers say?", "Are there contradictions?"],
    },
    {
      icon: Target,
      title: "Conclusion",
      description: "Make an informed judgment",
      questions: ["What's the credibility?", "Should I share this?", "What's the context?"],
    },
  ];

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          The Truth Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.title} className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-gradient-primary p-3 shrink-0">
                  <step.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {step.questions.map((question, qIndex) => (
                      <li key={qIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex justify-center">
                  <ArrowDown className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
