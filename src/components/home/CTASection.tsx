import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, DollarSign, Users } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - For Tourists */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready for Your Adventure?
            </h2>
            <p className="text-muted-foreground mb-6">
              Browse our verified guides, compare rates, and book directly. No
              agency fees, no middlemen—just you and your local expert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/guides">Find Your Guide</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right - For Guides */}
          <div className="bg-secondary/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Are You a Licensed Guide?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join Nepal's premier platform connecting verified guides directly
              with trekkers worldwide.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    License Verification
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Stand out with your verified credentials
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    Set Your Own Rates
                  </div>
                  <div className="text-sm text-muted-foreground">
                    No commission cuts, keep what you earn
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    Direct Bookings
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Connect directly with international clients
                  </div>
                </div>
              </div>
            </div>

            <Button variant="accent" size="lg" className="w-full" asChild>
              <Link href="/register">Register as Guide</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
