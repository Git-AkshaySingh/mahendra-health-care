import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, HeartPulse } from "lucide-react";

export const PromotionalBanner = () => {
  return (
    <section className="py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-orange-400 to-amber-300 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
            <div className="absolute right-10 top-5 w-20 h-20 bg-white rounded-full" />
            <div className="absolute right-32 top-16 w-12 h-12 bg-white rounded-full" />
            <div className="absolute right-20 bottom-10 w-16 h-16 bg-white rounded-full" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <HeartPulse className="h-6 w-6 text-white" />
                <span className="text-white/90 text-sm font-medium">Health Support</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ask anything about your health.
              </h3>
              <p className="text-white/90 text-sm md:text-base mb-4">
                Get trusted answers and expert guidance from our pharmacists.
              </p>
              <Button 
                asChild 
                className="bg-white text-orange-600 hover:bg-white/90 gap-2"
              >
                <Link to="/contact">
                  <MessageCircle className="h-4 w-4" />
                  Talk to a Pharmacist
                </Link>
              </Button>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 text-white mb-2" />
                <p className="text-white text-sm font-medium">24/7 Support</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <HeartPulse className="h-8 w-8 text-white mb-2" />
                <p className="text-white text-sm font-medium">Expert Advice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
