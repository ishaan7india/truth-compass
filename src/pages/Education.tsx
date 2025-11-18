import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GraduationCap, AlertCircle, CheckCircle, Eye, Brain, Shield } from "lucide-react";

const Education = () => {
  const misinformationTypes = [
    {
      title: "Misinformation",
      description: "False information shared without intent to harm",
      example: "Sharing an outdated medical study without checking the date",
      icon: AlertCircle,
      color: "text-warning",
    },
    {
      title: "Disinformation",
      description: "Deliberately false information spread to deceive",
      example: "Fabricated political stories designed to damage a candidate",
      icon: AlertCircle,
      color: "text-destructive",
    },
    {
      title: "Malinformation",
      description: "True information used to inflict harm",
      example: "Leaking private information to embarrass someone",
      icon: AlertCircle,
      color: "text-warning",
    },
  ];

  const verificationSteps = [
    {
      step: "Check the Source",
      description: "Verify the credibility of the publisher and author",
      tips: ["Look for contact information", "Check domain registration", "Research the author's credentials"],
    },
    {
      step: "Examine the Evidence",
      description: "Evaluate the quality and sources of evidence provided",
      tips: ["Look for primary sources", "Check if claims are cited", "Verify statistics with original data"],
    },
    {
      step: "Cross-Reference",
      description: "Compare with other reputable sources",
      tips: ["Check multiple news outlets", "Look for fact-checking sites", "Verify with official sources"],
    },
    {
      step: "Analyze Bias",
      description: "Identify potential biases and perspectives",
      tips: ["Note emotional language", "Check for balanced reporting", "Identify missing viewpoints"],
    },
    {
      step: "Check Images",
      description: "Verify authenticity of visual content",
      tips: ["Use reverse image search", "Look for manipulation signs", "Check image metadata"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Educational Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn to Verify Information
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understand misinformation, develop critical thinking skills, and learn verification techniques
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Types of Misinformation */}
          <section className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              Understanding Misinformation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {misinformationTypes.map((type, index) => (
                <Card key={type.title} className="border-2 hover:shadow-glow transition-all" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <type.icon className={`h-5 w-5 ${type.color}`} />
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-xs font-medium mb-1">Example:</p>
                      <p className="text-xs text-muted-foreground italic">{type.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Verification Steps */}
          <section className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-success" />
              Verification Process
            </h2>
            <Card className="border-2">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {verificationSteps.map((step, index) => (
                    <AccordionItem key={index} value={`step-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-semibold">{step.step}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-11 space-y-3">
                          <p className="text-muted-foreground">{step.description}</p>
                          <div className="space-y-2">
                            <p className="font-medium text-sm">Tips:</p>
                            <ul className="space-y-1">
                              {step.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </section>

          {/* AI Detection Education */}
          <section className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Eye className="h-8 w-8 text-accent" />
              Spotting AI-Generated Content
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>AI-Generated Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Common Signs:</p>
                    <ul className="space-y-1">
                      <li>• Asymmetrical faces or features</li>
                      <li>• Distorted hands or fingers</li>
                      <li>• Inconsistent lighting/shadows</li>
                      <li>• Unusual text or watermarks</li>
                      <li>• Repeating patterns or textures</li>
                      <li>• Missing or altered metadata</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>AI-Generated Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Common Characteristics:</p>
                    <ul className="space-y-1">
                      <li>• Overly formal or consistent tone</li>
                      <li>• Generic, templated phrasing</li>
                      <li>• Repetitive sentence structures</li>
                      <li>• Lack of personal anecdotes</li>
                      <li>• Perfect grammar without errors</li>
                      <li>• Missing contextual nuances</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Best Practices */}
          <section className="animate-slide-up" style={{ animationDelay: "400ms" }}>
            <Card className="border-2 border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Best Practices for Digital Literacy
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">Do:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      Verify before sharing
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      Check multiple sources
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      Question emotional content
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      Use fact-checking tools
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      Read beyond headlines
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">Don't:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      Share without verification
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      Trust single sources
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      Ignore bias indicators
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      Believe clickbait headlines
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      Skip fact-checking
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Education;
