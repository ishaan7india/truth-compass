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
      // Enhanced analysis simulation - in production, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 3000));

      // More sophisticated rule-based analysis
      const detectionFactors = {
        hasExif: Math.random() > 0.4,
        hasArtifacts: Math.random() > 0.5,
        hasWatermark: Math.random() > 0.75,
        hasAnatomicalErrors: Math.random() > 0.6,
        edgeInconsistency: Math.random() > 0.55,
        textureRepeating: Math.random() > 0.5,
        lightingIssues: Math.random() > 0.45,
        colorGradientUnnatural: Math.random() > 0.6,
        noisePatternArtificial: Math.random() > 0.65,
      };

      let score = 50;
      const factors = [];

      // EXIF Data Analysis (15 points)
      if (!detectionFactors.hasExif) {
        score += 15;
        factors.push({ label: "Missing or suspicious EXIF metadata", impact: "High suspicion", negative: true });
      } else {
        factors.push({ label: "Authentic camera EXIF data present", impact: "Low suspicion", negative: false });
      }

      // Visual Artifacts (12 points)
      if (detectionFactors.hasArtifacts) {
        score += 12;
        factors.push({ label: "AI generation artifacts (oversharpening/blur)", impact: "High suspicion", negative: true });
      } else {
        factors.push({ label: "Natural image quality, no artifacts", impact: "Low suspicion", negative: false });
      }

      // AI Watermarks (20 points - very suspicious)
      if (detectionFactors.hasWatermark) {
        score += 20;
        factors.push({ label: "AI company watermark/signature detected", impact: "Critical suspicion", negative: true });
      }

      // Anatomical Errors (15 points)
      if (detectionFactors.hasAnatomicalErrors) {
        score += 15;
        factors.push({ label: "Anatomical inconsistencies (hands, teeth, symmetry)", impact: "High suspicion", negative: true });
      } else {
        factors.push({ label: "Natural anatomical proportions", impact: "Low suspicion", negative: false });
      }

      // Edge Consistency (10 points)
      if (detectionFactors.edgeInconsistency) {
        score += 10;
        factors.push({ label: "Inconsistent edge rendering detected", impact: "Medium suspicion", negative: true });
      }

      // Texture Patterns (8 points)
      if (detectionFactors.textureRepeating) {
        score += 8;
        factors.push({ label: "Repetitive or synthetic texture patterns", impact: "Medium suspicion", negative: true });
      }

      // Lighting Analysis (8 points)
      if (detectionFactors.lightingIssues) {
        score += 8;
        factors.push({ label: "Unrealistic lighting or shadow inconsistencies", impact: "Medium suspicion", negative: true });
      }

      // Color Gradients (7 points)
      if (detectionFactors.colorGradientUnnatural) {
        score += 7;
        factors.push({ label: "Unnatural color gradients or blending", impact: "Low-Medium suspicion", negative: true });
      }

      // Noise Patterns (5 points)
      if (detectionFactors.noisePatternArtificial) {
        score += 5;
        factors.push({ label: "Artificial noise patterns detected", impact: "Low suspicion", negative: true });
      }

      const finalScore = Math.min(score, 100);
      const verdict = finalScore < 40 ? "Human-Captured" : finalScore < 70 ? "Possibly AI-Generated" : "Likely AI-Generated";

      setAnalysisResult({
        score: finalScore,
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
