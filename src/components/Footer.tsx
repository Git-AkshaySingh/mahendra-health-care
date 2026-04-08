import { Link } from "react-router-dom";
import { Mail, Phone, Share2, Shield, CheckCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Get the App */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Get the App</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Experience faster ordering and real-time tracking on our mobile platform.
            </p>
            <div className="space-y-2">
              <div className="bg-foreground text-background rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-2 w-full max-w-[200px]">
                <span className="text-xs">GET IT ON</span>
                <span className="font-bold">Google Play</span>
              </div>
              <div className="bg-foreground text-background rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-2 w-full max-w-[200px]">
                <span className="text-xs">DOWNLOAD ON THE</span>
                <span className="font-bold">App Store</span>
              </div>
            </div>
          </div>

          {/* About MHC */}
          <div>
            <h4 className="font-bold text-foreground mb-4">About MHC</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Heritage</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Quality Standards</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">MHC Careers</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Press Releases</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/return-policy" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Contact Us</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Questions or feedback?<br />
              Reach out to our clinical care team.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/contact" className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
                <Mail className="h-4 w-4 text-foreground" />
              </Link>
              <Link to="/contact" className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
                <Phone className="h-4 w-4 text-foreground" />
              </Link>
              <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
                <Share2 className="h-4 w-4 text-foreground" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">LICENSED PHARMACY</p>
              <p className="text-xs text-muted-foreground">Reg: MHC-994700-IND</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mahendra Health Care. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <span className="inline-flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" /> Secure Payment
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Verified Experts
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
