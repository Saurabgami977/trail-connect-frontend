"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Shield, Star } from "lucide-react";
import heroImage from "@/assets/hero-mountains.jpg";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const auth = useSelector((state: any) => state.auth);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage.src})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-emerald-900/50 to-emerald-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Shield className="h-4 w-4 text-amber-400" />
            <span className="text-primary-foreground text-sm font-medium">
              Only Licensed & Verified Guides
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Trek the Himalayas
            <br />
            <span className="text-amber-400">With Local Experts</span>
          </h1>

          <p
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Connect directly with licensed Nepali trekking guides. Authentic
            experiences, fair prices, verified credentials.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button variant="hero" size="xl" asChild>
              <Link href="/guides">
                <Search className="h-5 w-5" />
                Find Your Guide
              </Link>
            </Button>
            {!auth.isAuthenticated && (
              <Button variant="heroOutline" size="xl" asChild>
                <Link href="/register">Become a Guide</Link>
              </Button>
            )}
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">
                150+
              </div>
              <div className="text-sm text-primary-foreground/60">
                Verified Guides
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">
                2,500+
              </div>
              <div className="text-sm text-primary-foreground/60">
                Treks Completed
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-3xl md:text-4xl font-bold text-primary-foreground">
                4.9 <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              </div>
              <div className="text-sm text-primary-foreground/60">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
