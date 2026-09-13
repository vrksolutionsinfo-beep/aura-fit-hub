import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Dumbbell, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { gymConfig, navItems } from "@/data/site";
import { MagneticButton } from "./MagneticButton";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-background/90 py-2.5 backdrop-blur-xl shadow-lg shadow-black/40"
          : "border-b border-border/30 bg-background/40 py-4 backdrop-blur-sm"
      }`}
    >
      <div className="section-shell flex h-14 items-center justify-between">
        <Link
          to="/"
          aria-label="Aura Fitness home"
          className="group flex items-center gap-3"
        >
          <span className="grid size-9 place-items-center overflow-hidden rounded-full border border-primary/60 bg-black/60 shadow-[0_0_12px_rgba(201,162,39,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:border-primary">
            <img src="/favicon.png" alt="Aura Fitness logo" className="size-full object-cover" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-[.08em]">
            AURA <span className="text-primary">FITNESS</span>
          </span>

        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              activeProps={{
                className: "text-primary font-extrabold after:w-full",
              }}
              className="relative py-1 text-[.68rem] font-bold tracking-[.18em] text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:block">
          <MagneticButton strength={8}>
            <Link
              to="/contact"
              className="inline-flex min-h-10 items-center justify-center bg-primary px-6 text-[.68rem] font-extrabold tracking-[.2em] text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]"
            >
              JOIN NOW
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="grid size-11 place-items-center border border-border/60 text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5 text-primary" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[65px] z-50 flex flex-col justify-between overflow-y-auto bg-background/98 px-6 pb-28 pt-6 backdrop-blur-2xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1">
              {navItems.map(([label, to], i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    activeProps={{ className: "text-primary" }}
                    className="flex items-center justify-between border-b border-border/60 py-4 font-display text-3xl font-extrabold tracking-wide uppercase transition-colors hover:text-primary"
                  >
                    <span>{label}</span>
                    <span className="text-xs font-mono text-muted-foreground/60">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="eyebrow">{gymConfig.position}</p>
              <p className="mt-2 text-xs text-muted-foreground">{gymConfig.shortLocation} · {gymConfig.phoneDisplay}</p>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-5 flex min-h-12 w-full items-center justify-center bg-primary text-xs font-extrabold tracking-[.2em] text-primary-foreground shadow-[0_0_25px_rgba(201,162,39,0.3)]"
              >
                JOIN AURA FITNESS
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-16 pb-28 md:pb-16">
      <div className="section-shell grid gap-12 md:grid-cols-[1.3fr_.8fr_.9fr]">
        <div>
          <div className="font-display text-4xl font-extrabold tracking-wide">
            AURA <span className="text-primary">FITNESS</span>
          </div>
          <p className="mt-3 text-xs font-bold tracking-[.22em] text-muted-foreground">
            {gymConfig.tagline}
          </p>
          <p className="mt-4 max-w-sm text-xs leading-6 text-muted-foreground">
            {gymConfig.position}. State-of-the-art strength training, conditioning, group workouts and personal training in Samalkota.
          </p>
        </div>

        <div>
          <p className="eyebrow">EXPLORE</p>
          <div className="mt-5 grid grid-cols-2 gap-3.5">
            {navItems.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">VISIT & CONTACT</p>
          <p className="mt-5 text-sm font-medium text-muted-foreground">
            {gymConfig.shortLocation}
          </p>
          <a
            href={`tel:${gymConfig.phone}`}
            className="mt-2 block font-display text-2xl font-bold text-primary hover:underline"
          >
            {gymConfig.phoneDisplay}
          </a>
          <p className="mt-3 text-xs text-muted-foreground/80">
            {gymConfig.hours.join(" · ")}
          </p>
          <a
            href="https://wa.me/916304746380?text=Hi%20Aura%20Fitness%2C%20I%20am%20interested%20in%20joining!"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-primary hover:underline"
          >
            <MessageCircle className="size-4" /> CHAT ON WHATSAPP
          </a>
        </div>
      </div>

      <div className="section-shell mt-14 border-t border-border/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[.68rem] tracking-[.18em] text-muted-foreground">
        <span>© 2026 AURA FITNESS. ALL RIGHTS RESERVED.</span>
        <span>FOUNDED BY {gymConfig.founder.toUpperCase()}</span>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-background/95 p-2 backdrop-blur-lg md:hidden">
      <Link
        to="/contact"
        className="grid min-h-12 place-items-center bg-primary text-[.68rem] font-extrabold tracking-[.14em] text-primary-foreground shadow-sm"
      >
        JOIN NOW
      </Link>
      <a
        href={`tel:${gymConfig.phone}`}
        className="flex min-h-12 items-center justify-center gap-1.5 border-l border-r border-border text-[.68rem] font-bold tracking-[.14em] text-foreground hover:text-primary transition-colors"
      >
        <Phone className="size-3.5 text-primary" />
        CALL
      </a>
      <a
        href="https://wa.me/916304746380?text=Hi%20Aura%20Fitness%2C%20I%20want%20to%20know%20more%20about%20membership"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 items-center justify-center gap-1.5 text-[.68rem] font-bold tracking-[.14em] text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        <MessageCircle className="size-3.5 text-emerald-400" />
        WHATSAPP
      </a>
    </div>
  );
}

