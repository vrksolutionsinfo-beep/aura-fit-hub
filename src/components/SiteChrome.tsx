import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Dumbbell, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { gymConfig, navItems } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-background/90 py-2 backdrop-blur-xl" : "py-4"}`}>
    <div className="section-shell flex h-14 items-center justify-between border-b border-border/70">
      <Link to="/" aria-label="Aura Fitness home" className="flex items-center gap-3"><span className="grid size-9 place-items-center border border-primary text-primary"><Dumbbell className="size-4" /></span><span className="font-display text-xl font-extrabold tracking-[.08em]">AURA <span className="text-primary">FITNESS</span></span></Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">{navItems.map(([label,to]) => <Link key={to} to={to} activeProps={{ className: "text-primary" }} className="text-[.66rem] font-bold tracking-[.16em] text-muted-foreground transition-colors hover:text-foreground">{label}</Link>)}</nav>
      <Link to="/contact" className="hidden min-h-10 items-center bg-primary px-5 text-[.66rem] font-extrabold tracking-[.18em] text-primary-foreground transition-colors hover:bg-accent sm:inline-flex">JOIN NOW</Link>
      <button type="button" onClick={() => setOpen(!open)} className="grid size-11 place-items-center text-foreground lg:hidden" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} className="absolute inset-x-0 top-full bg-background/98 px-5 pb-8 backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">{navItems.map(([label,to],i) => <Link key={to} to={to} onClick={() => setOpen(false)} className="flex border-b border-border py-4 font-display text-3xl font-bold" style={{ transitionDelay: `${i*20}ms` }}>{label}</Link>)}</motion.nav>}</AnimatePresence>
  </header>;
}

export function Footer() {
  return <footer className="border-t border-border bg-surface py-14 pb-24 md:pb-14"><div className="section-shell grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
    <div><div className="font-display text-4xl font-extrabold">AURA <span className="text-primary">FITNESS</span></div><p className="mt-3 text-xs font-bold tracking-[.2em] text-muted-foreground">{gymConfig.tagline}</p></div>
    <div><p className="eyebrow">EXPLORE</p><div className="mt-5 grid grid-cols-2 gap-3">{navItems.map(([label,to]) => <Link key={to} to={to} className="text-xs text-muted-foreground hover:text-primary">{label}</Link>)}</div></div>
    <div><p className="eyebrow">VISIT</p><p className="mt-5 text-sm text-muted-foreground">{gymConfig.shortLocation}</p><a href={`tel:${gymConfig.phone}`} className="mt-2 block font-display text-2xl font-bold text-primary">{gymConfig.phoneDisplay}</a><p className="mt-3 text-xs text-muted-foreground">{gymConfig.hours.join(" · ")}</p></div>
  </div><div className="section-shell mt-12 border-t border-border pt-5 text-[.65rem] tracking-[.16em] text-muted-foreground">© 2026 AURA FITNESS. ALL RIGHTS RESERVED.</div></footer>;
}

export function MobileBar() { return <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background/95 p-2 backdrop-blur md:hidden"><Link to="/contact" className="grid min-h-12 place-items-center bg-primary text-xs font-bold tracking-[.16em] text-primary-foreground">JOIN NOW</Link><a href={`tel:${gymConfig.phone}`} className="flex min-h-12 items-center justify-center gap-2 text-xs font-bold tracking-[.16em]"><Phone className="size-4 text-primary"/>CALL</a></div>; }
