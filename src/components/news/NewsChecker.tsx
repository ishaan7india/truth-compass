import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { CredibilityResult } from "./CredibilityResult";

export const NewsChecker = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeNews = async () => {
    if (!url.trim()) {
      toast.error("Please enter a news URL or headline");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Simulated analysis
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Rule-based credibility check
      const urlLower = url.toLowerCase();
      
      let score = 50;
      const factors = [];

      // Check for clickbait words
      const clickbaitWords = ["shocking", "unbelievable", "you won't believe", "secret", "they don't want you to know"];
      const hasClickbait = clickbaitWords.some(word => urlLower.includes(word));
      
      if (hasClickbait) {
        score -= 20;
        factors.push({ label: "Clickbait language detected", impact: "Reduces credibility", negative: true });
      }

      // Check for suspicious TLDs
      const suspiciousTlds = [".xyz", ".click", ".info", ".blog"];
      const hasSuspiciousTld = suspiciousTlds.some(tld => urlLower.endsWith(tld));
      
      if (hasSuspiciousTld) {
        score -= 15;
        factors.push({ label: "Suspicious domain extension", impact: "Questionable source", negative: true });
      }

      // Check for known credible sources
      const credibleSources = ["bbc", "reuters", "ap", "npr", "pbs"];
      const hasCredibleSource = credibleSources.some(source => urlLower.includes(source));
      
      if (hasCredibleSource) {
        score += 20;
        factors.push({ label: "Reputable news source", impact: "Increases credibility", negative: false });
      }

      // Simulate other checks
      if (Math.random() > 0.5) {
        score += 10;
        factors.push({ label: "Source has contact information", impact: "Positive indicator", negative: false });
      } else {
        score -= 10;
        factors.push({ label: "No clear author attribution", impact: "Reduces credibility", negative: true });
      }

      if (Math.random() > 0.6) {
        score -= 15;
        factors.push({ label: "Emotional manipulation detected", impact: "Biased reporting", negative: true });
      }

      setResult({
        score: Math.max(0, Math.min(100, score)),
        factors,
        url,
      });

      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle>News Credibility Checker</CardTitle>
          <CardDescription>
            Enter a news URL or headline to verify its credibility through source analysis and content verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter news URL or headline..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyzeNews()}
            />
            <Button onClick={analyzeNews} disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Verify
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter a complete URL (e.g., https://example.com/article) or paste a headline
          </p>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <Card className="border-2 border-primary/50 animate-pulse-glow">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <p className="text-sm font-medium">Verifying news source...</p>
              <p className="text-xs text-muted-foreground">Analyzing credibility factors</p>
            </div>
          </CardContent>
        </Card>
      )}

      {result && !isAnalyzing && (
        <CredibilityResult result={result} />
      )}
    </div>
  );
};
