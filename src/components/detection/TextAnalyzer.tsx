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
      // Enhanced analysis simulation
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Advanced linguistic analysis
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const words = text.split(/\s+/).filter(w => w.length > 0);
      const avgSentenceLength = words.length / sentences.length;

      // Expanded AI phrase detection (25+ phrases)
      const aiPhrases = [
        "it's worth noting", "it's important to", "in conclusion", "to summarize",
        "essentially", "fundamentally", "paradigm", "leverage", "synergy",
        "delve into", "tapestry", "realm", "multifaceted", "comprehensive",
        "holistic", "robust", "cutting-edge", "state-of-the-art", "innovative",
        "revolutionize", "transformative", "game-changing", "pivotal", "crucial",
        "furthermore", "moreover", "additionally", "consequently"
      ];
      
      const aiPhraseMatches = aiPhrases.filter(phrase => 
        text.toLowerCase().includes(phrase)
      );
      const aiPhraseCount = aiPhraseMatches.length;

      // Sentence length variance (burstiness)
      const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
      const lengthVariance = calculateVariance(sentenceLengths);
      
      // Lexical diversity (unique words / total words)
      const uniqueWords = new Set(words.map(w => w.toLowerCase()));
      const lexicalDiversity = uniqueWords.size / words.length;

      // Transition word analysis
      const transitionWords = ["however", "moreover", "furthermore", "additionally", "consequently", "therefore"];
      const transitionCount = transitionWords.filter(word => 
        text.toLowerCase().includes(word)
      ).length;
      
      // Scoring factors
      let score = 30;
      const factors = [];

      // Burstiness check (25 points)
      if (lengthVariance < 15) {
        score += 25;
        factors.push({ label: "Low burstiness - repetitive patterns", impact: "High suspicion", negative: true });
      } else if (lengthVariance < 25) {
        score += 12;
        factors.push({ label: "Medium burstiness", impact: "Medium suspicion", negative: true });
      } else {
        factors.push({ label: "High burstiness - human-like variation", impact: "Low suspicion", negative: false });
      }

      // AI Phrase Detection (20 points)
      if (aiPhraseCount >= 3) {
        score += 20;
        factors.push({ label: `Multiple AI phrases detected (${aiPhraseCount} found)`, impact: "High suspicion", negative: true });
      } else if (aiPhraseCount >= 1) {
        score += 10;
        factors.push({ label: `Some AI phrasing detected (${aiPhraseCount} found)`, impact: "Medium suspicion", negative: true });
      } else {
        factors.push({ label: "Natural vocabulary and expressions", impact: "Low suspicion", negative: false });
      }

      // Tone Consistency (15 points)
      if (avgSentenceLength > 18 && avgSentenceLength < 24 && lengthVariance < 20) {
        score += 15;
        factors.push({ label: "Overly consistent, formal tone", impact: "Medium-High suspicion", negative: true });
      }

      // Lexical Diversity (15 points)
      if (lexicalDiversity < 0.35) {
        score += 15;
        factors.push({ label: `Limited word variety (${Math.round(lexicalDiversity * 100)}%)`, impact: "Medium-High suspicion", negative: true });
      } else if (lexicalDiversity < 0.5) {
        score += 7;
        factors.push({ label: `Moderate lexical diversity (${Math.round(lexicalDiversity * 100)}%)`, impact: "Low-Medium suspicion", negative: true });
      } else {
        factors.push({ label: `Good lexical diversity (${Math.round(lexicalDiversity * 100)}%)`, impact: "Low suspicion", negative: false });
      }

      // Transition Word Usage (10 points)
      if (transitionCount > sentences.length * 0.3) {
        score += 10;
        factors.push({ label: "Excessive formal transition words", impact: "Medium suspicion", negative: true });
      }

      // Perplexity simulation (5 points)
      if (lexicalDiversity < 0.4 || lengthVariance < 15) {
        score += 5;
        factors.push({ label: "Low perplexity - predictable patterns", impact: "Low suspicion", negative: true });
      } else {
        factors.push({ label: "High perplexity - creative, unpredictable", impact: "Low suspicion", negative: false });
      }

      const finalScore = Math.min(score, 100);
      const verdict = finalScore < 40 ? "Likely Human" : finalScore < 70 ? "Possibly AI-Generated" : "AI-Like";

      setAnalysisResult({
        score: finalScore,
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
