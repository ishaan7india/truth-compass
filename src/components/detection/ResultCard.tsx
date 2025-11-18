import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface ResultCardProps {
  result: {
    score: number;
    verdict: string;
    factors: Array<{ label: string; impact: string; negative: boolean }>;
    type: "image" | "text";
    wordCount?: number;
    sentenceCount?: number;
  };
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const getVerdictColor = () => {
    if (result.score < 40) return "text-success";
    if (result.score < 70) return "text-warning";
    return "text-destructive";
  };

  const getVerdictIcon = () => {
    if (result.score < 40) return CheckCircle;
    if (result.score < 70) return AlertTriangle;
    return XCircle;
  };

  const VerdictIcon = getVerdictIcon();

  return (
    <Card className="border-2 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Analysis Results</span>
          <Badge variant={result.score < 40 ? "default" : result.score < 70 ? "secondary" : "destructive"}>
            {result.verdict}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">AI Detection Score</span>
            <span className={`text-2xl font-bold ${getVerdictColor()}`}>
              {result.score}/100
            </span>
          </div>
          <Progress value={result.score} className="h-3" />
          <p className="text-xs text-muted-foreground">
            {result.score < 40 && "Low probability of AI generation"}
            {result.score >= 40 && result.score < 70 && "Moderate probability of AI generation"}
            {result.score >= 70 && "High probability of AI generation"}
          </p>
        </div>

        {/* Verdict */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
          <VerdictIcon className={`h-6 w-6 ${getVerdictColor()}`} />
          <div>
            <p className="font-semibold">Verdict: {result.verdict}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {result.type === "image" ? "Based on image metadata and visual analysis" : "Based on text pattern and linguistic analysis"}
            </p>
          </div>
        </div>

        {/* Stats for text */}
        {result.type === "text" && result.wordCount && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground">Word Count</p>
              <p className="text-2xl font-bold">{result.wordCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground">Sentences</p>
              <p className="text-2xl font-bold">{result.sentenceCount}</p>
            </div>
          </div>
        )}

        {/* Analysis Factors */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Detection Factors</h4>
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

        {/* Disclaimer */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> This analysis uses rule-based algorithms and pattern matching. 
            Results should be used as guidance and not as definitive proof. Always verify with multiple sources.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
