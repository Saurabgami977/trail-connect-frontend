import { Search, Shield, Calendar, Mountain } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Search",
    description:
      "Find guides by region, dates, language, and experience level. Read reviews and compare rates.",
  },
  {
    icon: Shield,
    title: "Verified Guides",
    description:
      "Every guide is verified through their official Nepal trekking license. No middlemen, direct connection.",
  },
  {
    icon: Calendar,
    title: "Book Directly",
    description:
      "Select your dates, add optional services like porters or permits, and book directly with your guide.",
  },
  {
    icon: Mountain,
    title: "Trek with Confidence",
    description:
      "Meet your licensed guide and embark on an authentic Himalayan adventure with local expertise.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book your trekking guide in four simple steps. Direct connection,
            transparent pricing, verified credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              {/* Step number */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary text-primary-foreground mb-6 shadow-lg">
                <step.icon className="h-8 w-8" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
