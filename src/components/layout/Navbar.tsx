import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Briefs" },
  { to: "/matrix", label: "Stack Matrix" },
  { to: "/tools", label: "Tools" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/30" role="banner">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group" aria-label="AI Threat Brief — Home">
          <div className="relative">
            <Shield className="h-7 w-7 text-primary transition-all group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]" aria-hidden="true" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm leading-none tracking-tight">AI THREAT BRIEF</span>
            <span className="text-[10px] text-primary font-mono tracking-widest">INTELLIGENCE FOR THE AGENTIC ERA</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to))
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/pricing">
                <Button variant="hero" size="sm">Get Pro Access</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" className="md:hidden glass-panel border-t border-border/30 p-4 space-y-2" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary"
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border/30 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">Dashboard</Button>
                </Link>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => { signOut(); setMobileOpen(false); }}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link to="/pricing" onClick={() => setMobileOpen(false)}>
                  <Button variant="hero" size="sm" className="w-full">Get Pro Access</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
