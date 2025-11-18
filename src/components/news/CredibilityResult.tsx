import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Shield } from "lucide-react";

interface CredibilityResultProps {
  result: {
    score: number;
    factors: Array<{ label: string; impact: string; negative: boolean }>;
    url: string;
  };
}

export const CredibilityResult = ({ result }: CredibilityResultProps) => {
  const getCredibilityLevel = () => {
    if (result.score >= 70) return { label: "High Credibility", color: "text-success", variant: "default" as const };
    if (result.score >= 40) return { label: "Medium Credibility", color: "text-warning", variant: "secondary" as const };
    return { label: "Low Credibility", color: "text-destructive", variant: "destructive" as const };
  };

  const credibility = getCredibilityLevel();

  return (
    <Card className="border-2 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Credibility Assessment</span>
          <Badge variant={credibility.variant}>
            {credibility.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Credibility Score</span>
            <span className={`text-2xl font-bold ${credibility.color}`}>
              {result.score}/100
            </span>
          </div>
          <Progress value={result.score} className="h-3" />
          <p className="text-xs text-muted-foreground">
            {result.score >= 70 && "This source shows strong credibility indicators"}
            {result.score >= 40 && result.score < 70 && "This source shows mixed credibility signals"}
            {result.score < 40 && "This source shows low credibility indicators"}
          </p>
        </div>

        {/* URL Display */}
        <div className="p-4 rounded-lg bg-muted break-all">
          <p className="text-xs text-muted-foreground mb-1">Analyzed Source:</p>
          <p className="text-sm font-mono">{result.url}</p>
        </div>

        {/* Factors */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Credibility Factors
          </h4>
          <div className="space-y-2">
            {result.factors.map((factor, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border border-border"
              >
                <div className={`mt-0.5 ${factor.negative ? "text-destructive" : "text-success"}`}>
                  {factor.negative ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{factor.label}</p>
                  <p className="text-xs text-muted-foreground">{factor.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className={`p-4 rounded-lg ${result.score >= 70 ? "bg-success/10 border border-success/20" : result.score >= 40 ? "bg-warning/10 border border-warning/20" : "bg-destructive/10 border border-destructive/20"}`}>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            {result.score >= 70 ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : result.score >= 40 ? (
              <AlertTriangle className="h-4 w-4 text-warning" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
            Recommendation
          </h4>
          <p className="text-xs text-muted-foreground">
            {result.score >= 70 && "This source appears credible, but always verify important claims with multiple sources."}
            {result.score >= 40 && result.score < 70 && "Exercise caution. Verify this information with more reliable sources before sharing."}
            {result.score < 40 && "Be skeptical. This source shows multiple red flags. Seek verification from reputable news outlets."}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> This analysis is based on automated checks and should not be the sole factor in determining credibility. 
            Always use critical thinking and verify with multiple trusted sources.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
