import Link from 'next/link';
import { Mountain, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Mountain className="h-7 w-7" />
              <span>Nepal Trek Guide</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm">
              Connect with licensed Nepali trekking guides for authentic Himalayan adventures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link href="/guides" className="hover:text-primary-foreground transition-colors">
                Find Guides
              </Link>
              <Link href="/regions" className="hover:text-primary-foreground transition-colors">
                Trekking Regions
              </Link>
              <Link href="/how-it-works" className="hover:text-primary-foreground transition-colors">
                How It Works
              </Link>
              <Link href="/register" className="hover:text-primary-foreground transition-colors">
                Become a Guide
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link href="/faq" className="hover:text-primary-foreground transition-colors">
                FAQ
              </Link>
              <Link href="/safety" className="hover:text-primary-foreground transition-colors">
                Safety Guidelines
              </Link>
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Thamel, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@nepaltrekguide.com" className="hover:text-primary-foreground transition-colors">
                  info@nepaltrekguide.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+9771234567890" className="hover:text-primary-foreground transition-colors">
                  +977 1 234 5678
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Nepal Trek Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
