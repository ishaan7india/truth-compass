import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ResultCard } from "./ResultCard";

export const ImageAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Simulated analysis - in production, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Rule-based analysis simulation
      const hasExif = Math.random() > 0.5;
      const hasArtifacts = Math.random() > 0.4;
      const hasWatermark = Math.random() > 0.3;
      const hasAnatomicalErrors = Math.random() > 0.35;

      let score = 50;
      const factors = [];

      if (!hasExif) {
        score += 15;
        factors.push({ label: "Missing EXIF data", impact: "High suspicion", negative: true });
      } else {
        factors.push({ label: "EXIF data present", impact: "Low suspicion", negative: false });
      }

      if (hasArtifacts) {
        score += 20;
        factors.push({ label: "Visual artifacts detected", impact: "High suspicion", negative: true });
      }

      if (hasWatermark) {
        score += 10;
        factors.push({ label: "AI watermark detected", impact: "Medium suspicion", negative: true });
      }

      if (hasAnatomicalErrors) {
        score += 15;
        factors.push({ label: "Anatomical inconsistencies", impact: "High suspicion", negative: true });
      }

      const verdict = score < 40 ? "Human-Captured" : score < 70 ? "Possibly AI-Generated" : "Likely AI-Generated";

      setAnalysisResult({
        score: Math.min(score, 100),
        verdict,
        factors,
        type: "image",
      });

      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    analyzeImage(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Image Analysis</CardTitle>
          <CardDescription>
            Upload an image to detect AI-generated content through EXIF metadata, visual artifacts, and pattern analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {!imagePreview ? (
            <div
              onClick={handleUploadClick}
              className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Click to upload an image</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border-2 border-border">
                <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-96 object-contain bg-muted" />
              </div>
              <Button onClick={handleUploadClick} variant="outline" className="w-full">
                <ImageIcon className="mr-2 h-4 w-4" />
                Upload Different Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isAnalyzing && (
        <Card className="border-2 border-primary/50 animate-pulse-glow">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <p className="text-sm font-medium">Analyzing image...</p>
              <p className="text-xs text-muted-foreground">This may take a few moments</p>
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
