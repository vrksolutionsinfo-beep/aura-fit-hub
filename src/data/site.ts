import heroImage from "@/assets/aura-hero.jpg";
import welcomeImage from "@/assets/aura-welcome.jpg";
import gymImage from "@/assets/aura-gym.jpg";
import programsImage from "@/assets/aura-programs.jpg";

export const gymConfig = {
  name: "AURA FITNESS",
  founder: "AmmiRaju",
  location: "Samalkota, Andhra Pradesh, India",
  shortLocation: "Samalkota, Andhra Pradesh",
  phoneDisplay: "6304-746380",
  phone: "+916304746380",
  hours: ["5:00 AM – 1:00 PM", "5:00 PM – 9:00 PM"],
  tagline: "FITNESS FREAKS' HEAVEN",
  position: "SAMALKOT'S BIGGEST GYM",
};

export const images = { heroImage, welcomeImage, gymImage, programsImage };

export const programs = [
  { number: "01", name: "Strength Training", copy: "Build foundational power with focused free-weight and resistance training.", position: "0% 0%" },
  { number: "02", name: "Cardio", copy: "Condition your heart, sharpen endurance and move with purpose.", position: "100% 0%" },
  { number: "03", name: "Zumba", copy: "High-energy group movement that makes every session feel alive.", position: "0% 100%" },
  { number: "04", name: "CrossFit", copy: "Functional intensity, athletic movement and measurable progress.", position: "50% 100%" },
  { number: "05", name: "Personal Training", copy: "One-to-one guidance shaped around your goals and ability.", position: "100% 100%" },
];

export const pricingPlans = [
  { term: "1 MONTH", price: "₹1,999" },
  { term: "3 MONTHS", price: "₹5,499" },
  { term: "6 MONTHS", price: "₹7,999" },
  { term: "12 MONTHS", price: "₹13,999" },
  { term: "LAUNCH OFFER", price: "₹11,999", note: "Gym + Cardio Combo", badge: "FIRST 50 MEMBERS", featured: true },
];

export const features = [
  ["01", "Premium Training Environment", "A focused space designed to help serious training feel exceptional."],
  ["02", "Powerful Equipment", "Purposeful strength and conditioning equipment for complete sessions."],
  ["03", "Unisex Fitness Community", "A motivating environment where everyone can train with confidence."],
  ["04", "Result-Focused Training", "Every session is built around progress, consistency and better performance."],
  ["05", "Energy That Moves You", "An atmosphere that helps you show up, work harder and stay committed."],
  ["06", "Built for Fitness Freaks", "A home for people who take their physical potential seriously."],
];

export const trainers = [
  { name: "TRAINER PROFILE 01", specialty: "Strength & Conditioning", bio: "Details to be updated." },
  { name: "TRAINER PROFILE 02", specialty: "Functional Fitness", bio: "Details to be updated." },
  { name: "TRAINER PROFILE 03", specialty: "Group Training", bio: "Details to be updated." },
];

export const galleryImages = [
  { src: gymImage, alt: "Premium strength training floor at Aura Fitness", position: "center" },
  { src: welcomeImage, alt: "Athlete preparing weights in the strength area", position: "center" },
  { src: programsImage, alt: "A range of training programs available at Aura Fitness", position: "center" },
  { src: heroImage, alt: "Focused athlete training with a dumbbell", position: "70% center" },
  { src: gymImage, alt: "Modern free weights and gym equipment", position: "left center" },
  { src: programsImage, alt: "Group and personal fitness training", position: "bottom center" },
];

export const testimonials = [
  { quote: "Member stories are coming soon.", name: "AURA COMMUNITY", detail: "Real reviews will appear here." },
  { quote: "Your progress could be the next story.", name: "TRAIN WITH PURPOSE", detail: "Editable testimonial placeholder." },
];

export const navItems = [
  ["HOME", "/"], ["ABOUT", "/about"], ["PROGRAMS", "/programs"], ["TRAINERS", "/trainers"],
  ["PRICING", "/pricing"], ["GALLERY", "/gallery"], ["CONTACT", "/contact"],
] as const;
