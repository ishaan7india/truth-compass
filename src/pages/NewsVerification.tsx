import { NewsChecker } from "@/components/news/NewsChecker";
import { TruthFunnel } from "@/components/news/TruthFunnel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Shield, AlertTriangle } from "lucide-react";

const NewsVerification = () => {
  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">News Verification Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fake News Detection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verify news credibility through comprehensive analysis and fact-checking algorithms
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <NewsChecker />

          <TruthFunnel />

          {/* Verification Factors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Newspaper className="h-5 w-5 text-primary" />
                  Source Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Domain reputation check</p>
                <p>• Author verification</p>
                <p>• Publication date analysis</p>
                <p>• URL authenticity</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Content Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Clickbait detection</p>
                <p>• Emotional tone analysis</p>
                <p>• Exaggeration patterns</p>
                <p>• Fact consistency check</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-success" />
                  Media Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Image manipulation check</p>
                <p>• Shadow consistency</p>
                <p>• Lighting analysis</p>
                <p>• Metadata verification</p>
              </CardContent>
            </Card>
          </div>

          {/* Warning Signs */}
          <Card className="border-2 border-warning/50 bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Red Flags to Watch For
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-2">Content Warning Signs:</p>
                <ul className="space-y-1">
                  <li>• Sensational headlines</li>
                  <li>• Missing sources or citations</li>
                  <li>• Emotional manipulation</li>
                  <li>• Grammatical errors</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Source Warning Signs:</p>
                <ul className="space-y-1">
                  <li>• Suspicious domain names</li>
                  <li>• No contact information</li>
                  <li>• Recent registration date</li>
                  <li>• No author attribution</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewsVerification;
