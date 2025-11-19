import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BatchResult {
  fileName: string;
  verdict: "human" | "possibly-ai" | "likely-ai";
  score: number;
}

export const BatchAnalyzer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<BatchResult[]>([]);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setResults([]);
      setProgress(0);
    }
  };

  const analyzeBatch = async () => {
    setIsAnalyzing(true);
    const newResults: BatchResult[] = [];

    for (let i = 0; i < files.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const score = Math.floor(Math.random() * 100);
      let verdict: "human" | "possibly-ai" | "likely-ai";
      if (score > 75) verdict = "human";
      else if (score > 45) verdict = "possibly-ai";
      else verdict = "likely-ai";

      newResults.push({
        fileName: files[i].name,
        verdict,
        score,
      });

      setProgress(((i + 1) / files.length) * 100);
      setResults([...newResults]);
    }

    setIsAnalyzing(false);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "human": return "bg-success/10 text-success border-success";
      case "possibly-ai": return "bg-warning/10 text-warning border-warning";
      case "likely-ai": return "bg-destructive/10 text-destructive border-destructive";
      default: return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Batch Analysis
        </CardTitle>
        <CardDescription>
          Upload multiple images for simultaneous analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="batch-upload"
          />
          <label htmlFor="batch-upload">
            <Button variant="outline" className="w-full" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Select Multiple Images
              </span>
            </Button>
          </label>
          {files.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {files.length} file(s) selected
            </p>
          )}
        </div>

        {files.length > 0 && !isAnalyzing && results.length === 0 && (
          <Button onClick={analyzeBatch} className="w-full">
            Analyze All Files
          </Button>
        )}

        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Analyzing files...</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Analysis Results</h3>
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{result.fileName}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-sm font-bold">{result.score}%</span>
                  <Badge className={getVerdictColor(result.verdict)}>
                    {result.verdict === "human" ? "Human" : 
                     result.verdict === "possibly-ai" ? "Possibly AI" : "Likely AI"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
