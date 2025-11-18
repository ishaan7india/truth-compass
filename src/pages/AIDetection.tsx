import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageAnalyzer } from "@/components/detection/ImageAnalyzer";
import { TextAnalyzer } from "@/components/detection/TextAnalyzer";
import { Shield, Image, FileText } from "lucide-react";

const AIDetection = () => {
  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Detection Toolkit</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Misuse Detection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze images and text to detect AI-generated content using advanced algorithms and pattern recognition
          </p>
        </div>

        <Tabs defaultValue="image" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image Analysis
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Text Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="animate-fade-in">
            <ImageAnalyzer />
          </TabsContent>

          <TabsContent value="text" className="animate-fade-in">
            <TextAnalyzer />
          </TabsContent>
        </Tabs>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                Image Detection Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• EXIF metadata analysis</p>
              <p>• Visual artifact detection</p>
              <p>• Edge consistency checking</p>
              <p>• Pattern repetition analysis</p>
              <p>• AI watermark detection</p>
              <p>• Anatomical error detection</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Text Detection Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Sentence structure patterns</p>
              <p>• Vocabulary consistency</p>
              <p>• Tone uniformity analysis</p>
              <p>• Burstiness measurement</p>
              <p>• Generic phrasing detection</p>
              <p>• Writing style markers</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIDetection;
