import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ActionLink } from "./Button";
import { Reveal } from "./Reveal";
import { galleryImages, gymConfig, images, pricingPlans, programs, trainers } from "@/data/site";

export function PageHero({
  eyebrow,
  title,
  copy,
  image = images.gymImage,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[76svh] items-end overflow-hidden pt-28">
      <img
        src={image}
        alt="Aura Fitness training environment"
        className="absolute inset-0 size-full object-cover opacity-50 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,162,39,0.12),transparent_50%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <div className="section-shell relative z-10 pb-16 md:pb-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-hero mt-5 max-w-5xl text-[clamp(4rem,12vw,9rem)] text-balance">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
          {copy}
        </p>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,color-mix(in_oklab,var(--primary)_15%,transparent),transparent_40%)]" />
      <div className="section-shell relative">
        <Reveal>
          <p className="eyebrow">START TODAY</p>
          <h2 className="display-hero mt-5 max-w-5xl text-[clamp(4rem,10vw,8rem)]">
            YOUR STRONGER
            <br />
            <span className="text-primary">SELF STARTS HERE.</span>
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">
            Train with purpose. Build strength. Become Aura. Experience Samalkota's premier fitness hub.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <ActionLink to="/contact">Join Aura Fitness</ActionLink>
            <a
              href={`tel:${gymConfig.phone}`}
              className="inline-flex min-h-12 items-center border border-border bg-surface/50 px-6 text-xs font-bold tracking-[.16em] text-foreground transition-all duration-300 hover:border-primary hover:bg-surface"
            >
              CALL {gymConfig.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProgramCard({
  program,
  index,
}: {
  program: (typeof programs)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      data-cursor="program"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative min-h-[26rem] overflow-hidden border border-border bg-card transition-all duration-500 hover:border-primary/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      <img
        loading="lazy"
        width={1200}
        height={800}
        src={program.image ?? images.programsImage}
        alt={`${program.name} training at Aura Fitness`}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        style={{ objectPosition: program.position }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,162,39,0.18),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div
        className="absolute inset-x-0 bottom-0 p-7 transition-transform duration-300 group-hover:-translate-y-1"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold tracking-widest text-primary">
            {program.number}
          </span>
          <span className="h-px w-6 bg-primary/40" />
        </div>
        <h3 className="mt-2.5 font-display text-4xl font-extrabold uppercase tracking-wide">
          {program.name}
        </h3>
        <p className="mt-2.5 max-w-sm text-xs leading-6 text-muted-foreground transition-colors group-hover:text-muted-foreground/95">
          {program.copy}
        </p>
      </div>
    </motion.article>
  );
}

export function ProgramsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-6 [perspective:1000px]">
      {programs.map((program, index) => (
        <Reveal
          key={program.name}
          className={`${index < 2 ? "md:col-span-3" : "md:col-span-2"}`}
          delay={index * 0.06}
        >
          <ProgramCard program={program} index={index} />
        </Reveal>
      ))}
    </div>
  );
}

export function PricingDisplay() {
  return (
    <div className="grid border-t border-border">
      {pricingPlans.map((plan) => (
        <div
          key={plan.term}
          className={`relative grid items-center gap-4 border-b border-border px-4 py-7 transition-all duration-300 md:grid-cols-[1.2fr_1fr_auto] md:px-8 ${
            plan.featured
              ? "bg-primary/10 before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-primary shadow-[inset_0_0_40px_rgba(201,162,39,0.06)]"
              : "hover:bg-surface/80"
          }`}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[.65rem] font-extrabold tracking-[.18em] text-primary">
                {plan.featured ? "★ LIMITED LAUNCH OFFER" : "MEMBERSHIP PLAN"}
              </span>
              {plan.badge && (
                <span className="rounded-xs border border-primary/60 bg-primary/15 px-2 py-0.5 text-[.6rem] font-bold text-primary">
                  {plan.badge}
                </span>
              )}
            </div>
            <h3 className="mt-1.5 font-display text-3xl font-extrabold tracking-wide">
              {plan.term}
            </h3>
          </div>

          <div className="text-sm text-muted-foreground">
            {plan.note ?? "Full gym access & state-of-the-art strength training"}
          </div>

          <div className="text-right">
            <div className="font-display text-5xl font-extrabold text-primary">
              {plan.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrainerCard({
  trainer,
  i,
}: {
  trainer: (typeof trainers)[number];
  i: number;
}) {
  return (
    <article className="group relative min-h-[34rem] overflow-hidden border border-border bg-card transition-all duration-500 hover:border-primary/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
      <img
        loading="lazy"
        width={1200}
        height={1504}
        src={images.welcomeImage}
        alt="Editable trainer profile placeholder"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
        style={{
          objectPosition: `${35 + i * 22}% center`,
          filter: i === 1 ? "grayscale(0.7) contrast(1.1)" : undefined,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.15),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-xs font-bold tracking-[.18em] text-primary uppercase">
          {trainer.specialty}
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold tracking-wide">
          {trainer.name}
        </h3>
        <p className="mt-2.5 text-xs leading-6 text-muted-foreground">
          {trainer.bio}
        </p>
      </div>
    </article>
  );
}

export function TrainerGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {trainers.map((trainer, i) => (
        <Reveal key={trainer.name} delay={i * 0.08}>
          <TrainerCard trainer={trainer} i={i} />
        </Reveal>
      ))}
    </div>
  );
}

export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (active === null) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight")
        setActive((active + 1) % galleryImages.length);
      if (event.key === "ArrowLeft")
        setActive((active - 1 + galleryImages.length) % galleryImages.length);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid auto-rows-[16rem] gap-4 md:grid-cols-3">
        {galleryImages.map((image, i) => (
          <button
            key={`${image.alt}-${i}`}
            type="button"
            data-cursor="gallery"
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden border border-border text-left transition-all duration-300 hover:border-primary/60 hover:shadow-lg ${
              i === 0 || i === 5 ? "md:col-span-2" : ""
            } ${i === 1 || i === 4 ? "md:row-span-2" : ""}`}
            aria-label={`View ${image.alt}`}
          >
            <img
              loading="lazy"
              width={1600}
              height={1200}
              src={image.src}
              alt={image.alt}
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              style={{ objectPosition: image.position }}
            />
            <div className="absolute inset-0 bg-background/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
              <span className="border border-primary bg-background/80 px-4 py-2 font-display text-xs font-bold tracking-[.25em] text-primary">
                VIEW PHOTO
              </span>
            </div>
            <div className="absolute bottom-3 left-3 bg-background/80 px-2 py-1 font-mono text-[.6rem] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              0{i + 1} / 0{galleryImages.length}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/96 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
        >
          {/* Top Bar: Counter & Close */}
          <div className="absolute inset-x-0 top-0 flex h-16 items-center justify-between px-6 border-b border-border/40">
            <span className="font-mono text-xs font-bold tracking-[.2em] text-primary">
              PHOTO {active + 1 < 10 ? `0${active + 1}` : active + 1} / 0{galleryImages.length}
            </span>
            <button
              className="grid size-11 place-items-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              onClick={() => setActive(null)}
              aria-label="Close gallery"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Main Image */}
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center max-h-[78vh] max-w-[92vw]"
          >
            <img
              src={galleryImages[active].src}
              alt={galleryImages[active].alt}
              className="max-h-[72vh] max-w-[92vw] object-contain border border-border/60 shadow-2xl"
            />
            <p className="mt-4 text-center text-xs font-medium text-muted-foreground max-w-lg">
              {galleryImages[active].alt}
            </p>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 grid size-12 place-items-center border border-border/60 bg-surface/80 text-foreground backdrop-blur transition-all duration-300 hover:border-primary hover:bg-surface hover:text-primary md:left-8"
            onClick={() =>
              setActive((active - 1 + galleryImages.length) % galleryImages.length)
            }
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 grid size-12 place-items-center border border-border/60 bg-surface/80 text-foreground backdrop-blur transition-all duration-300 hover:border-primary hover:bg-surface hover:text-primary md:right-8"
            onClick={() => setActive((active + 1) % galleryImages.length)}
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}

