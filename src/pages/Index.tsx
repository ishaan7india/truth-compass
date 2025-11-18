import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Image, FileText, Newspaper, GraduationCap, Sparkles, Check } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Image,
      title: "Image Analysis",
      description: "Detect AI-generated images through EXIF data, artifacts, and visual inconsistencies",
      link: "/ai-detection",
    },
    {
      icon: FileText,
      title: "Text Analysis",
      description: "Identify AI-written text by analyzing patterns, tone, and linguistic markers",
      link: "/ai-detection",
    },
    {
      icon: Newspaper,
      title: "News Verification",
      description: "Verify news credibility with comprehensive fact-checking and source analysis",
      link: "/news-verification",
    },
    {
      icon: GraduationCap,
      title: "Educational Resources",
      description: "Learn about misinformation types and verification techniques",
      link: "/education",
    },
  ];

  const stats = [
    { label: "Detection Accuracy", value: "95%+" },
    { label: "Analysis Points", value: "50+" },
    { label: "Users Protected", value: "10K+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Advanced AI Detection & Verification</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Detect AI Content &<br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Verify News Truth
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Empower yourself with cutting-edge tools to identify AI-generated media and verify news authenticity. 
            Stay informed, stay protected.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-detection">
              <Button size="lg" className="w-full sm:w-auto">
                <Shield className="mr-2 h-5 w-5" />
                Start AI Detection
              </Button>
            </Link>
            <Link to="/news-verification">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Newspaper className="mr-2 h-5 w-5" />
                Verify News
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Detection Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our advanced algorithms analyze multiple factors to provide accurate and reliable results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={feature.title} to={feature.link}>
              <Card className="h-full hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/50 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6 space-y-4">
                  <div className="rounded-lg bg-gradient-primary p-3 w-fit">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and accurate analysis in three easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "01", title: "Upload Content", description: "Upload an image, paste text, or enter a news URL" },
            { step: "02", title: "AI Analysis", description: "Our algorithms analyze multiple detection factors" },
            { step: "03", title: "Get Results", description: "Receive detailed analysis with confidence scores" },
          ].map((item, index) => (
            <div key={item.step} className="text-center space-y-4 animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center text-2xl font-bold text-primary-foreground">
                {item.step}
              </div>
              <h3 className="font-semibold text-xl">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Verify the Truth?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Start using our advanced detection tools today and protect yourself from misinformation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-detection">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Try AI Detection
                </Button>
              </Link>
              <Link to="/education">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
