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

      // Detection factors with adjusted probabilities
      const detectionFactors = {
        // Image defects - highest priority
        hasAnatomicalErrors: Math.random() > 0.55,
        hasArtifacts: Math.random() > 0.5,
        edgeInconsistency: Math.random() > 0.52,
        lightingIssues: Math.random() > 0.48,
        textureRepeating: Math.random() > 0.5,
        colorGradientUnnatural: Math.random() > 0.58,
        noisePatternArtificial: Math.random() > 0.62,
        // AI watermarks - second priority
        hasWatermark: Math.random() > 0.75,
        // Metadata - lowest priority
        hasExif: Math.random() > 0.4,
      };

      let score = 0;
      const factors = [];

      // === HIGHEST PRIORITY: IMAGE DEFECTS (Total: ~75 points) ===
      
      // Anatomical Errors (18 points) - Critical defect
      if (detectionFactors.hasAnatomicalErrors) {
        score += 18;
        factors.push({ label: "Anatomical inconsistencies (hands, teeth, symmetry)", impact: "Critical defect", negative: true });
      } else {
        factors.push({ label: "Natural anatomical proportions", impact: "Low suspicion", negative: false });
      }

      // Visual Artifacts (15 points) - Major defect
      if (detectionFactors.hasArtifacts) {
        score += 15;
        factors.push({ label: "AI generation artifacts (oversharpening/blur)", impact: "Major defect", negative: true });
      } else {
        factors.push({ label: "Natural image quality, no artifacts", impact: "Low suspicion", negative: false });
      }

      // Edge Consistency (12 points) - Major defect
      if (detectionFactors.edgeInconsistency) {
        score += 12;
        factors.push({ label: "Inconsistent edge rendering detected", impact: "Major defect", negative: true });
      } else {
        factors.push({ label: "Consistent edge definition", impact: "Low suspicion", negative: false });
      }

      // Lighting Analysis (10 points) - Significant defect
      if (detectionFactors.lightingIssues) {
        score += 10;
        factors.push({ label: "Unrealistic lighting or shadow inconsistencies", impact: "Significant defect", negative: true });
      } else {
        factors.push({ label: "Realistic lighting and shadows", impact: "Low suspicion", negative: false });
      }

      // Texture Patterns (8 points) - Moderate defect
      if (detectionFactors.textureRepeating) {
        score += 8;
        factors.push({ label: "Repetitive or synthetic texture patterns", impact: "Moderate defect", negative: true });
      } else {
        factors.push({ label: "Natural texture variation", impact: "Low suspicion", negative: false });
      }

      // Color Gradients (7 points) - Moderate defect
      if (detectionFactors.colorGradientUnnatural) {
        score += 7;
        factors.push({ label: "Unnatural color gradients or blending", impact: "Moderate defect", negative: true });
      } else {
        factors.push({ label: "Natural color transitions", impact: "Low suspicion", negative: false });
      }

      // Noise Patterns (5 points) - Minor defect
      if (detectionFactors.noisePatternArtificial) {
        score += 5;
        factors.push({ label: "Artificial noise patterns detected", impact: "Minor defect", negative: true });
      } else {
        factors.push({ label: "Organic noise distribution", impact: "Low suspicion", negative: false });
      }

      // === SECOND PRIORITY: AI WATERMARKS (Total: 25 points) ===
      
      // AI Watermarks (25 points) - Very high indicator
      if (detectionFactors.hasWatermark) {
        score += 25;
        factors.push({ label: "AI company watermark/signature detected", impact: "Very high indicator", negative: true });
      } else {
        factors.push({ label: "No AI watermarks present", impact: "Low suspicion", negative: false });
      }

      // === LOWEST PRIORITY: METADATA (Total: 10 points) ===
      
      // EXIF Data Analysis (10 points) - Supporting indicator
      if (!detectionFactors.hasExif) {
        score += 10;
        factors.push({ label: "Missing or suspicious EXIF metadata", impact: "Supporting indicator", negative: true });
      } else {
        factors.push({ label: "Authentic camera EXIF data present", impact: "Low suspicion", negative: false });
      }

      const finalScore = Math.min(score, 100);
      
      // Adjusted verdict thresholds for 0-100 scale
      let verdict: string;
      if (finalScore <= 30) {
        verdict = "Human-Captured";
      } else if (finalScore <= 65) {
        verdict = "Possibly AI-Generated";
      } else {
        verdict = "Likely AI-Generated";
      }

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
