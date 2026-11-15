const skillGroups = [
  {
    title: "Languages & Frameworks",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "PHP",
      "React",
      "Next.js",
      "Laravel",
      "Node.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      "PostgreSQL",
      "Supabase",
      "MySQL",
      "REST APIs",
      "Database design",
      "Authentication",
      "RBAC",
    ],
  },
  {
    title: "Development Tools",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Docker",
      "Composer",
      "npm",
      "Vercel",
    ],
  },
  {
    title: "Web & Ecommerce",
    skills: [
      "WordPress",
      "WooCommerce",
      "CMS development",
      "Responsive web design",
    ],
  },
  {
    title: "Design & UX",
    skills: [
      "UI/UX design",
      "GSAP",
      "Design systems",
      "Graphic design",
      "WCAG",
      "Accessibility",
    ],
  },
  {
    title: "Marketing & Analytics",
    skills: [
      "Google Analytics",
      "SEO",
      "Paid advertising",
      "Market research",
      "Performance analysis",
    ],
  },
];

export default function SkillsContent() {
  return (
    <div className="cv-skills">
      <div className="cv-skills-grid">
        {skillGroups.map((group) => (
          <fieldset className="cv-skills-group" key={group.title}>
            <legend>{group.title}</legend>

            <ul className="cv-skills-list">
              {group.skills.map((skill) => (
                <li className="cv-skills-item" key={skill}>
                  <span className="cv-skills-check" aria-hidden="true" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
