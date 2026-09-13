import { ArrowDown, Clock3, MapPin } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { Atmosphere } from "./Atmosphere";
import { ActionLink } from "./Button";
import { FinalCta, ProgramsGrid } from "./PageBlocks";
import { Reveal } from "./Reveal";
import { features, gymConfig, images, pricingPlans, testimonials } from "@/data/site";
import { MagneticButton } from "./MagneticButton";

function AnimatedStat({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="border-l-2 border-primary/70 pl-5 transition-all duration-300 hover:border-primary">
      <div className="font-display text-4xl font-extrabold tracking-tight text-primary md:text-6xl">
        {value}
      </div>
      <div className="mt-1 text-xs font-extrabold tracking-[.18em] text-foreground uppercase">
        {label}
      </div>
      <div className="text-[.68rem] tracking-[.12em] text-muted-foreground uppercase">
        {sub}
      </div>
    </div>
  );
}

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.65]);

  // Mouse parallax for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxBgX = useTransform(smoothMouseX, [-500, 500], [-15, 15]);
  const parallaxBgY = useTransform(smoothMouseY, [-500, 500], [-10, 10]);

  const parallaxTextX = useTransform(smoothMouseX, [-500, 500], [10, -10]);
  const parallaxTextY = useTransform(smoothMouseY, [-500, 500], [8, -8]);

  // Radial light follower in hero
  const lightX = useSpring(useMotionValue(500), { stiffness: 120, damping: 25 });
  const lightY = useSpring(useMotionValue(300), { stiffness: 120, damping: 25 });

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    lightX.set(cx);
    lightY.set(cy);

    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  };

  return (
    <main>
      {/* 7-LAYER CINEMATIC HERO */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-[100svh] overflow-hidden bg-background"
      >
        {/* Layer 1: Scaled & Parallax Background Image */}
        <motion.div
          style={{
            x: parallaxBgX,
            y: parallaxBgY,
            scale: heroScale,
            opacity: heroOpacity,
          }}
          className="absolute inset-0 size-full"
        >
          <img
            src={images.heroCinematic ?? images.heroImage}
            width={1920}
            height={1088}
            fetchPriority="high"
            alt="Cinematic athlete strength training with dumbbell at Aura Fitness"
            className="size-full object-cover object-[62%_center] md:object-center filter brightness-90 contrast-105"
          />
        </motion.div>

        {/* Layer 2: Vignettes & Gradients */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/75 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-background/40" />

        {/* Layer 3: Soft Gold Radial Mouse Light Follower (Desktop) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
          style={{
            x: lightX,
            y: lightY,
            width: 580,
            height: 580,
            background: "radial-gradient(circle, rgba(201,162,39,0.18) 0%, rgba(201,162,39,0.04) 50%, transparent 75%)",
          }}
        />

        {/* Layer 4: Ambient Red Energy Glow in Distance */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[10%] top-[25%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(180,30,30,0.12)_0%,transparent_70%)] blur-3xl"
        />

        {/* Layer 5: Atmosphere 3D Particle Canvas */}
        <Atmosphere />

        {/* Layer 6: Film Grain Noise */}
        <div className="noise absolute inset-0 opacity-25 pointer-events-none" />

        {/* Layer 7: Typography & Foreground Hero Content */}
        <motion.div
          style={{
            x: parallaxTextX,
            y: parallaxTextY,
          }}
          className="section-shell relative z-10 flex min-h-[100svh] items-end pb-24 pt-32 md:items-center md:pb-12"
        >
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                <p className="eyebrow">AURA FITNESS · SAMALKOTA</p>
              </div>

              <h1 className="display-hero mt-5 text-[clamp(4.5rem,12vw,10.5rem)] text-balance">
                AURA <span className="text-primary">FITNESS</span>
              </h1>

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <p className="font-display text-2xl font-extrabold uppercase tracking-[.05em] md:text-4xl text-foreground">
                  {gymConfig.position}
                </p>
                <span className="hidden md:inline-block text-muted-foreground/50">/</span>
                <p className="text-xs font-extrabold tracking-[.25em] text-primary uppercase">
                  {gymConfig.tagline}
                </p>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Train harder. Move stronger. Become better. A premium unisex fitness environment built for people who take their physical potential seriously.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton strength={8}>
                  <ActionLink to="/contact">Join Now</ActionLink>
                </MagneticButton>
                <MagneticButton strength={6}>
                  <ActionLink to="/pricing" variant="outline">View Plans</ActionLink>
                </MagneticButton>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-2 font-medium">
                  <Clock3 className="size-4 text-primary" />
                  5 AM – 1 PM · 5 PM – 9 PM
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <MapPin className="size-4 text-primary" />
                  Samalkota, Andhra Pradesh
                </span>
              </div>
            </Reveal>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 right-8 z-10 hidden items-center gap-3 text-[.62rem] font-bold tracking-[.24em] text-muted-foreground md:flex">
          <span>SCROLL TO EXPLORE</span>
          <span className="animate-line block h-12 w-px bg-primary" />
          <ArrowDown className="size-3 text-primary animate-bounce" />
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <div className="section-shell grid items-center gap-14 md:grid-cols-[.88fr_1.12fr]">
          <Reveal>
            <div className="relative group">
              <div className="overflow-hidden border border-border/70 bg-surface">
                <img
                  loading="lazy"
                  width={1200}
                  height={1504}
                  src={images.welcomeImage}
                  alt="Athlete preparing a barbell in a premium gym"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-2/3 w-px bg-primary" />
              <div className="absolute -top-3 -left-3 size-12 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
            </div>
          </Reveal>

          <Reveal>
            <p className="eyebrow">WELCOME TO AURA</p>
            <h2 className="display-hero mt-5 text-[clamp(3.8rem,8vw,7.5rem)] text-balance">
              TRAIN DIFFERENT.<br />
              <span className="text-primary">LIVE STRONGER.</span>
            </h2>
            <div className="gold-rule my-7 w-32" />
            <p className="max-w-xl text-base leading-8 text-muted-foreground">
              Aura Fitness is built for people who want more from their training — more strength, more discipline, more energy and sustained results.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              Founded by <strong className="text-foreground">{gymConfig.founder}</strong>, Aura Fitness is designed as Samalkota's premier unisex fitness destination, providing advanced equipment and a high-focus environment.
            </p>
            <div className="mt-8">
              <ActionLink to="/about" variant="outline">
                Our Story & Philosophy
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="border-y border-border/80 bg-surface/40 py-16">
        <div className="section-shell grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-4">
          <AnimatedStat value="500+" label="MEMBERS" sub="COMMITTED TO PROGRESS" />
          <AnimatedStat value="50+" label="STATIONS" sub="HEAVY-DUTY EQUIPMENT" />
          <AnimatedStat value="5+" label="PROGRAMS" sub="STRENGTH · CARDIO · ZUMBA" />
          <AnimatedStat value="100%" label="PURPOSE" sub="FITNESS FREAKS' HEAVEN" />
        </div>
      </section>

      {/* WHY AURA? */}
      <section className="bg-surface py-24 md:py-36">
        <div className="section-shell">
          <Reveal>
            <p className="eyebrow">BUILT FOR PROGRESS</p>
            <h2 className="display-hero mt-4 text-6xl md:text-8xl">WHY AURA?</h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3">
            {features.map(([n, title, copy], i) => (
              <Reveal key={n} delay={i * 0.05}>
                <article className="group min-h-68 border-b border-border p-8 transition-all duration-300 hover:bg-surface-high hover:border-primary/40 md:border-r">
                  <span className="font-display text-5xl font-extrabold text-gold-dim transition-colors duration-300 group-hover:text-primary">
                    {n}
                  </span>
                  <h3 className="mt-7 font-display text-2xl font-extrabold uppercase tracking-wide">
                    {title}
                  </h3>
                  <p className="mt-3.5 text-xs leading-6 text-muted-foreground">
                    {copy}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="py-24 md:py-36">
        <div className="section-shell">
          <Reveal>
            <p className="eyebrow">FIND YOUR TRAINING</p>
            <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="display-hero text-6xl md:text-8xl">
                MOVE WITH<br />
                <span className="text-primary">PURPOSE.</span>
              </h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                Different goals. One destination to become stronger, faster, and healthier.
              </p>
            </div>
          </Reveal>
          <div className="mt-14">
            <ProgramsGrid />
          </div>
          <div className="mt-10">
            <ActionLink to="/programs" variant="outline">
              Explore All Programs
            </ActionLink>
          </div>
        </div>
      </section>

      {/* MINDSET SECTION */}
      <section className="relative flex min-h-[75svh] items-center overflow-hidden">
        <img
          loading="lazy"
          width={1600}
          height={1072}
          src={images.gymImage}
          alt="Premium Aura Fitness training floor"
          className="absolute inset-0 size-full object-cover opacity-40 filter contrast-110"
        />
        <div className="absolute inset-0 bg-background/65 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.12),transparent_70%)]" />
        <div className="section-shell relative z-10 py-20">
          <Reveal>
            <p className="eyebrow">THE AURA MINDSET</p>
            <h2 className="display-hero mt-5 max-w-5xl text-[clamp(4rem,10vw,8.5rem)]">
              DISCIPLINE<br />
              <span className="text-primary">CREATES RESULTS.</span>
            </h2>
            <p className="mt-8 font-display text-xl font-bold uppercase leading-9 text-muted-foreground max-w-xl">
              Show up. Put in the work.<br />
              Stay consistent. Become stronger.
            </p>
            <div className="mt-8">
              <ActionLink to="/contact">Start Today</ActionLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section className="bg-surface py-24 md:py-36">
        <div className="section-shell">
          <Reveal>
            <p className="eyebrow">MEMBERSHIP PLANS</p>
            <h2 className="display-hero mt-4 text-6xl md:text-8xl">
              CHOOSE YOUR<br />
              <span className="text-primary">COMMITMENT.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-5">
            {pricingPlans.map((plan) => (
              <article
                key={plan.term}
                className={`relative flex flex-col justify-between border p-7 transition-all duration-300 hover:border-primary/80 ${
                  plan.featured
                    ? "border-primary bg-primary/10 shadow-[0_0_35px_rgba(201,162,39,0.15)] ring-1 ring-primary/40"
                    : "border-border bg-card hover:bg-surface-high"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-[.64rem] font-extrabold tracking-[.18em] text-primary">
                      {plan.featured ? "★ LAUNCH OFFER" : "MEMBERSHIP"}
                    </p>
                    {plan.badge && (
                      <span className="rounded-xs border border-primary px-2 py-0.5 text-[.55rem] font-bold text-primary">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold uppercase">
                    {plan.term}
                  </h3>
                  <p className="mt-3 font-display text-4xl font-extrabold text-foreground">
                    {plan.price}
                  </p>
                  <p className="mt-4 text-xs leading-5 text-muted-foreground">
                    {plan.note ?? "Full gym access & complete equipment availability."}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border/60">
                  <ActionLink
                    to="/contact"
                    variant={plan.featured ? "primary" : "outline"}
                    className="w-full text-center justify-center text-[.66rem]"
                  >
                    SELECT PLAN
                  </ActionLink>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <ActionLink to="/pricing" variant="outline">
              View Detailed Plan Breakdown
            </ActionLink>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 md:py-32">
        <div className="section-shell">
          <p className="eyebrow">COMMUNITY VOICES</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <blockquote
                key={item.quote}
                className="relative border-l-2 border-primary bg-card p-10 transition-all duration-300 hover:border-primary/80 hover:bg-surface"
              >
                <div className="font-display text-7xl leading-none text-primary/40">“</div>
                <p className="mt-2 font-display text-3xl font-bold uppercase tracking-wide">
                  {item.quote}
                </p>
                <footer className="mt-6 text-xs font-mono tracking-[.16em] text-muted-foreground">
                  {item.name} · {item.detail}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCta />
    </main>
  );
}

