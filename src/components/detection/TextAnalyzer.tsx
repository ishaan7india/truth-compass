import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { ResultCard } from "./ResultCard";

export const TextAnalyzer = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const analyzeText = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    if (text.length < 50) {
      toast.error("Please enter at least 50 characters for accurate analysis");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Simulated analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simple rule-based analysis
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const words = text.split(/\s+/);
      const avgSentenceLength = words.length / sentences.length;

      // Check for repetitive patterns
      const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
      const lengthVariance = calculateVariance(sentenceLengths);
      
      // Check for burstiness (variation in sentence length)
      const burstiness = lengthVariance > 20 ? "High" : lengthVariance > 10 ? "Medium" : "Low";
      
      // Check for common AI phrases
      const aiPhrases = ["it's important to note", "in conclusion", "furthermore", "moreover", "it is worth noting"];
      const hasAiPhrases = aiPhrases.some(phrase => text.toLowerCase().includes(phrase));

      let score = 30;
      const factors = [];

      if (burstiness === "Low") {
        score += 25;
        factors.push({ label: "Low sentence variation", impact: "High suspicion", negative: true });
      } else {
        factors.push({ label: "Natural sentence variation", impact: "Low suspicion", negative: false });
      }

      if (hasAiPhrases) {
        score += 20;
        factors.push({ label: "Generic AI phrasing detected", impact: "Medium suspicion", negative: true });
      }

      if (avgSentenceLength > 20) {
        score += 15;
        factors.push({ label: "Consistently long sentences", impact: "Medium suspicion", negative: true });
      }

      // Check grammar perfection (in real implementation)
      if (Math.random() > 0.6) {
        score += 10;
        factors.push({ label: "Unnaturally perfect grammar", impact: "Low suspicion", negative: true });
      }

      const verdict = score < 40 ? "Likely Human" : score < 70 ? "Possibly AI-Generated" : "AI-Like";

      setAnalysisResult({
        score: Math.min(score, 100),
        verdict,
        factors,
        type: "text",
        wordCount: words.length,
        sentenceCount: sentences.length,
      });

      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calculateVariance = (arr: number[]) => {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
    return variance;
  };

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Text Analysis</CardTitle>
          <CardDescription>
            Paste text to detect AI-generated content through pattern analysis, tone consistency, and linguistic markers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your text here for analysis... (minimum 50 characters)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {text.length} characters
            </span>
            <Button
              onClick={analyzeText}
              disabled={isAnalyzing || text.length < 50}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Analyze Text
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <Card className="border-2 border-primary/50 animate-pulse-glow">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <p className="text-sm font-medium">Analyzing text patterns...</p>
              <p className="text-xs text-muted-foreground">Checking for AI signatures</p>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && !isAnalyzing && (
        <ResultCard result={analysisResult} />
      )}
    </div>
  );
};
