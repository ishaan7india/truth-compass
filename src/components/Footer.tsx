import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gradient-primary p-2">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TruthGuard
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering users to detect AI-generated content and verify news authenticity through advanced analysis tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-detection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Detection Toolkit
                </Link>
              </li>
              <li>
                <Link to="/news-verification" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  News Verification
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Educational Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Developed By</h3>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} CDT Ishaan
              </p>
              <a 
                href="https://east.dpsbangalore.edu.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                DPS Bangalore East
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Built with advanced AI detection and verification algorithms</p>
        </div>
      </div>
    </footer>
  );
};
