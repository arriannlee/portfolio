// This module defines the Project type and exports a list of projects with their details
// Each project includes an id, title, description, technology stack, image, color, and link
// This data can be used to display project information in the portfolio website
// This data can be easily accesssed abnd edited in one place

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
  color: string;
  link: string; // or link?: string; if some don't have links
};
export const PROJECTS: Project[] = [
  {
    id: "mojito",
    title: "Mojito",
    description:
      "A modern cocktail-bar website with smooth micro-interactions, atmospheric visuals, and an elevated UI that mirrors the bar’s premium experience.",
    stack: ["React", "Next.js", "Tailwind", "GSAP"],
    image: "/images/mojito.png",
    color: "#6B00D7",
    link: "https://beautiquesalon.netlify.app/",
  },
  {
    id: "beautique",
    title: "Beautique",
    description:
      "A light, responsive salon interface with clean typography and a calm, spacious layout. Smooth interactions and clear hierarchy guide visitors through treatments, pricing and booking with zero friction.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "/images/beautique.jpeg",
    color: "#15003E",
    link: "https://beautiquesalon.netlify.app/",
  },
  {
    id: "cocktail-ninja",
    title: "Cocktail Ninja",
    description:
      "A modern cocktail-bar website with smooth micro-interactions, atmospheric visuals and a refined UI that mirrors the bar’s premium experience.",
    stack: ["HTML", "CSS", "JavaScript", "API Integration"],
    image: "/images/cocktail-ninja.png",
    color: "#6B00D7",
    link: "https://cocktailninja.netlify.app/",
  },
  {
    id: "beat-the-bot",
    title: "Beat The Bot",
    description:
      "Fast, arcade-style web game with crisp UI, bright feedback and simple, reactive controls. Lightweight design and snappy animations make each round a quick, addictive challenge.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "/images/beat-the-bot.jpeg",
    color: "#15003E",
    link: "https://beat-the-bot.netlify.app/",
  },
];
