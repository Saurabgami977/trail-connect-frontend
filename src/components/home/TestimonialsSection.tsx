import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Australia",
    trek: "Everest Base Camp",
    rating: 5,
    text: "Tenzing was an incredible guide! His knowledge of the mountains and local culture made our trek unforgettable. The verification system gave us peace of mind.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Marcus Weber",
    location: "Germany",
    trek: "Annapurna Circuit",
    rating: 5,
    text: "Finally, a platform where I can book directly with local guides! Fair pricing, no agency markup. Pemba was fantastic and spoke perfect German.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Yuki Tanaka",
    location: "Japan",
    trek: "Langtang Valley",
    rating: 5,
    text: "The license verification feature is so important. Karma spoke Japanese and made our family feel safe throughout the entire journey.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Trekkers Say
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Real experiences from travelers who found their perfect guide through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="h-8 w-8 text-amber-400 mb-4" />
              
              <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-primary-foreground/60">
                    {testimonial.location} • {testimonial.trek}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
