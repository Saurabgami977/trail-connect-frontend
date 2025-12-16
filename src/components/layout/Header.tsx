"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Mountain, Menu, X, User } from "lucide-react";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const headerBg = "bg-card/95 backdrop-blur-md border-b";
  const textColor = "text-foreground";
  const logoColor = "text-primary";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 ${logoColor} font-bold text-xl`}
          >
            <Mountain className="h-7 w-7" />
            <span className="hidden sm:inline">Nepal Trek Guide</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-8 ${textColor}`}>
            <Link
              href="/guides"
              className="hover:opacity-80 transition-opacity font-medium"
            >
              Find Guides
            </Link>
            <Link
              href="/regions"
              className="hover:opacity-80 transition-opacity font-medium"
            >
              Trekking Regions
            </Link>
            <Link
              href="/user/treks"
              className="hover:opacity-80 transition-opacity font-medium"
            >
              Treks
            </Link>
            <Link
              href="/user/create-trek"
              className="hover:opacity-80 transition-opacity font-medium"
            >
              Create Trek
            </Link>
            <Link
              href="/how-it-works"
              className="hover:opacity-80 transition-opacity font-medium"
            >
              How It Works
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {auth.isAuthenticated ? (
              <UserDropdown />
            ) : (
              <>
                <Button variant="hero" size="sm" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/register">
                    <User className="h-4 w-4" />
                    Register as Guide
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 ${textColor}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card rounded-xl shadow-xl border p-4 mb-4 animate-slide-up">
            <nav className="flex flex-col gap-3">
              <Link
                href="/guides"
                className="px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Guides
              </Link>
              <Link
                href="/regions"
                className="px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Trekking Regions
              </Link>
              <Link
                href="/user/treks"
                className="px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Treks
              </Link>
              <Link
                href="/user/create-trek"
                className="px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Trek
              </Link>
              <Link
                href="/how-it-works"
                className="px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <hr className="border-border" />
              <div className="flex gap-2">
                {auth?.isAuthenticated ? (
                  <>Profile</>
                ) : (
                  <>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Log In
                      </Link>
                    </Button>
                    <Button className="flex-1" asChild>
                      <Link
                        href="/register"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
