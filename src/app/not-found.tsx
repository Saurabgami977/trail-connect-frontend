// app/not-found.tsx
import Link from "next/link";
import {
  Mountain,
  Home,
  Compass,
  Map,
  Navigation,
  MapPin,
  ArrowRight,
  MountainSnow,
  Route,
  ChevronRight,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-x-hidden">
      {/* Simple dark background with subtle texture */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-emerald-950/5 to-background">
        {/* Very subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--emerald-600)) 1px, transparent 1px),
                             linear-gradient(to bottom, hsl(var(--emerald-600)) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Mobile-optimized top indicator */}
        <div className="w-full max-w-sm mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-card/90 backdrop-blur-sm border border-emerald-800/50 shadow-lg">
            <MapPin className="w-4 h-4 shrink-0 text-emerald-500" />
            <span className="text-sm font-medium text-foreground truncate">
              Elevation: 404m • Trail: Not Found
            </span>
            <div className="w-2 h-2 shrink-0 rounded-full bg-amber-500 animate-pulse"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-md sm:max-w-2xl text-center">
          {/* Mountain Icon - Optimized for mobile */}
          <div className="relative mb-6 sm:mb-8 mx-auto w-fit">
            <div className="absolute -inset-3 sm:-inset-4 bg-linear-to-r from-emerald-500/10 via-transparent to-amber-500/10 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="relative bg-linear-to-b from-emerald-900/30 to-emerald-950/30 p-1 rounded-3xl shadow-2xl">
                <div className="bg-linear-to-br from-emerald-700 via-emerald-800 to-emerald-900 p-6 sm:p-8 rounded-2xl shadow-inner">
                  <div className="relative">
                    <MountainSnow className="w-20 h-20 sm:w-28 sm:h-28 text-emerald-200 drop-shadow-lg" />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-12 sm:h-12 bg-linear-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-white/20">
                      <Route className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Code - Responsive sizing */}
          <div className="relative mb-6 sm:mb-8">
            <div className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none">
              <span className="relative inline-block">
                <span className="absolute inset-0 text-emerald-600/20 blur-md animate-pulse">
                  404
                </span>
                <span className="relative bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                  404
                </span>
              </span>
            </div>
            <div className="mt-3 sm:mt-4 text-sm font-semibold tracking-widest text-emerald-500 uppercase">
              • Off the Trail •
            </div>
          </div>

          {/* Main Message - Mobile optimized */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">
              You've Reached Unexplored Territory
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed px-2">
              This path doesn't exist on our map. Every explorer wanders off
              trail sometimes.
            </p>
          </div>

          {/* Action Buttons - Stacked on mobile */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
            <Link
              href="/"
              className="group flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-emerald-700 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-emerald-500/25"
            >
              <Home className="w-5 h-5" />
              <span>Return to Base</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/explore"
              className="group flex items-center justify-center gap-3 px-6 py-4 bg-card hover:bg-card/80 border-2 border-emerald-800/30 hover:border-emerald-700/50 text-foreground rounded-xl font-semibold transition-all duration-300 active:scale-95 shadow"
            >
              <Compass className="w-5 h-5 text-emerald-500" />
              <span>Explore Trails</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Tips - Grid on mobile */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center">
                <Map className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Quick Navigation Tips
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  title: "Check URL",
                  desc: "Verify the path is correct",
                  icon: "🔍",
                },
                { title: "Use Search", desc: "Find what you need", icon: "🔎" },
                { title: "Browse Home", desc: "Start fresh", icon: "🏠" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-emerald-900/30 hover:border-emerald-700/50 transition-colors"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats - Responsive grid */}
          <div className="bg-card/30 backdrop-blur-sm border border-emerald-900/20 rounded-xl p-4 sm:p-6 mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 text-center">
              Trail Statistics
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: "150+", label: "Trails", color: "text-emerald-400" },
                { value: "24/7", label: "Support", color: "text-amber-400" },
                { value: "99.9%", label: "Safe", color: "text-emerald-400" },
                { value: "10K+", label: "Hikers", color: "text-amber-400" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 rounded-lg bg-background/50 border border-emerald-900/20"
                >
                  <div
                    className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Helpful Links - Optimized for mobile */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Quick Links
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "Trails", href: "/trails" },
                { label: "Guides", href: "/guides" },
                { label: "Contact", href: "/contact" },
                { label: "Help", href: "/help" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm bg-card/50 hover:bg-card border border-emerald-900/30 hover:border-emerald-700/50 rounded-lg text-foreground hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for trails..."
                className="w-full px-4 py-3 bg-card/50 border-2 border-emerald-800/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white transition-colors">
                <Navigation className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Contact our guides
              </Link>
            </p>
            <p className="text-xs text-muted-foreground/60">
              Every wrong turn is an opportunity to discover something new
            </p>
          </div>
        </div>
      </div>

      {/* Floating elements for desktop only */}
      <div
        className="hidden sm:block absolute bottom-10 left-10 w-4 h-4 bg-emerald-500/20 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="hidden sm:block absolute top-20 right-10 w-6 h-6 bg-amber-500/20 rounded-full animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Mobile bottom indicator */}
      <div className="sm:hidden absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-linear-to-r from-emerald-700 via-amber-600 to-emerald-700 rounded-full"></div>
    </div>
  );
}
