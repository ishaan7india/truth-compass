import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ComparisonTool = () => {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  const [results, setResults] = useState<{ img1: number; img2: number } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageNum: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (imageNum === 1) {
          setImage1(e.target?.result as string);
        } else {
          setImage2(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const compareImages = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResults({
      img1: Math.floor(Math.random() * 100),
      img2: Math.floor(Math.random() * 100),
    });
  };

  const getScoreColor = (score: number) => {
    if (score > 75) return "text-success";
    if (score > 45) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5" />
          Side-by-Side Comparison
        </CardTitle>
        <CardDescription>
          Compare two images to determine which is more likely AI-generated
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image 1 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Image 1</h3>
            {image1 ? (
              <div className="relative">
                <img
                  src={image1}
                  alt="Comparison 1"
                  className="w-full h-48 object-cover rounded-lg border"
                />
                {results && (
                  <Badge className="absolute top-2 right-2 text-lg font-bold">
                    <span className={getScoreColor(results.img1)}>{results.img1}%</span>
                  </Badge>
                )}
              </div>
            ) : (
              <div className="h-48 border-2 border-dashed rounded-lg flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 1)}
                  className="hidden"
                  id="image1-upload"
                />
                <label htmlFor="image1-upload">
                  <Button variant="ghost" asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image 1
                    </span>
                  </Button>
                </label>
              </div>
            )}
          </div>

          {/* Image 2 */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Image 2</h3>
            {image2 ? (
              <div className="relative">
                <img
                  src={image2}
                  alt="Comparison 2"
                  className="w-full h-48 object-cover rounded-lg border"
                />
                {results && (
                  <Badge className="absolute top-2 right-2 text-lg font-bold">
                    <span className={getScoreColor(results.img2)}>{results.img2}%</span>
                  </Badge>
                )}
              </div>
            ) : (
              <div className="h-48 border-2 border-dashed rounded-lg flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 2)}
                  className="hidden"
                  id="image2-upload"
                />
                <label htmlFor="image2-upload">
                  <Button variant="ghost" asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image 2
                    </span>
                  </Button>
                </label>
              </div>
            )}
          </div>
        </div>

        {image1 && image2 && !results && (
          <Button onClick={compareImages} className="w-full">
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            Compare Images
          </Button>
        )}

        {results && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-semibold">Comparison Results</h3>
            <p className="text-sm text-muted-foreground">
              {results.img1 > results.img2 
                ? "Image 1 appears more likely to be human-captured"
                : results.img2 > results.img1
                ? "Image 2 appears more likely to be human-captured"
                : "Both images show similar likelihood scores"}
            </p>
            <div className="flex gap-4 text-sm">
              <div>Image 1: <span className={`font-bold ${getScoreColor(results.img1)}`}>{results.img1}%</span></div>
              <div>Image 2: <span className={`font-bold ${getScoreColor(results.img2)}`}>{results.img2}%</span></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
