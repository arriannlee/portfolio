// ============================================
// PROJECT TYPES
// ============================================

export type ProjectScreenshot = {
  src: string;
  title: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  website?: string;

  // Project document information
  projectType?: string;
  status?: string;
  role?: string;
  overview?: string;
  objectives?: string;
  technologies?: string[];
  development?: string;
  challenges?: string;
  outcomes?: string;

  // Project screenshots
  screenshots?: ProjectScreenshot[];
};

// ============================================
// PROJECT DATA
// ============================================

export const projects: Project[] = [
  // ------------------------------------------
  // NERO PEPE
  // ------------------------------------------

  {
    id: "nero-pepe",
    name: "Nero Pepe",
    description: "Restaurant management SaaS platform",
    website: "https://neropepe.com",

    projectType: "SaaS Platform",
    status: "In Development",
    role: "Founder & Full-Stack Developer",

    overview:
      "Nero Pepe is a restaurant management platform designed to bring essential restaurant operations together within a single connected system.",

    objectives: [
      "Develop an integrated SaaS platform specifically designed for independent hospitality businesses.",
      "Consolidate restaurant website management, reservations, menus and operational functionality within a connected system.",
      "Implement a secure multi-tenant architecture capable of supporting multiple independent restaurant accounts.",
      "Create responsive interfaces suitable for restaurant management, staff operations and guest interactions.",
      "Establish a scalable technical foundation for additional features and integrations.",
      "Prepare the platform for commercial deployment through structured testing, staging and release processes.",
    ].join("\n"),

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Vercel",
    ],

    development: [
      "Designed and developed a multi-tenant SaaS platform using Next.js, React, TypeScript and Tailwind CSS.",
      "Implemented a modular content management system supporting restaurant website management, menus, reservations and operational functionality.",
      "Developed a PostgreSQL database architecture using Supabase, incorporating authentication, role-based access controls and tenant-specific data management.",
      "Integrated Stripe to support subscription billing and payment-related functionality.",
      "Created responsive interfaces for desktop, tablet and mobile devices, accommodating different restaurant workflows.",
      "Established separate development, staging and production environments to support controlled testing and deployment.",
      "Implemented automated testing and continuous integration workflows using Vitest, TypeScript and GitHub Actions.",
      "Developed reusable components and shared functionality to support platform scalability and ongoing feature development.",
    ].join("\n"),
    challenges: [
      "Multi-tenant architecture: Designed tenant-specific data structures and access controls to support multiple independent restaurants within a shared SaaS platform while maintaining data isolation.",
      "System complexity: Organised interconnected restaurant management features into modular components to improve maintainability and support future development.",
      "Role-based access: Implemented authentication and permission controls to manage access to functionality according to user roles and responsibilities.",
      "Deployment management: Established isolated staging and production environments, allowing new features and database migrations to be tested before release.",
      "Quality assurance: Introduced automated testing, TypeScript validation and continuous integration to identify regressions and improve development reliability.",
      "Responsive interfaces: Developed adaptable layouts to accommodate desktop administration, tablet-based operations and mobile guest interactions.",
    ].join("\n"),
    outcomes: [
      "Developed a substantial multi-tenant restaurant management SaaS application with interconnected management and guest-facing functionality.",
      "Established a modular application architecture designed to accommodate additional restaurants, features and future integrations.",
      "Implemented authentication, role-based permissions and tenant-specific data management.",
      "Created responsive management interfaces and guest-facing experiences across multiple device sizes.",
      "Established separate staging and production environments with controlled database migration workflows.",
      "Implemented automated testing and continuous integration, with more than 7,600 passing tests recorded during development.",
      "Progressed the platform towards commercial release, with further development, testing and launch preparation ongoing.",
    ].join("\n"),

    screenshots: [
      {
        src: "/images/projects/nero-pepe/manage-dashboard.webp",
        title: "Management Dashboard",
      },
      {
        src: "/images/projects/nero-pepe/manage-website-desktop.webp",
        title: "Website Management",
      },
      {
        src: "/images/projects/nero-pepe/manage-menu-cms-desktop.webp",
        title: "Menu Management",
      },
      {
        src: "/images/projects/nero-pepe/manage-dashboard-tablet.webp",
        title: "Tablet Dashboard",
      },
      {
        src: "/images/projects/nero-pepe/operate-reservations.webp",
        title: "Reservation Management",
      },
      {
        src: "/images/projects/nero-pepe/guest-home-phone.webp",
        title: "Guest Website (Mobile)",
      },
    ],
  },

  // ------------------------------------------
  // FLOOFERS
  // ------------------------------------------

  {
    id: "floofers",
    name: "Floofers",
    description: "Laravel e-commerce application for dog grooming products",

    projectType: "E-commerce Web Application",
    status: "In Development",
    role: "UI/UX Designer & Full-Stack Developer",

    overview:
      "Floofers is a branded e-commerce web application being developed using Laravel and PHP. The project focuses on creating an online shopping experience for specialist dog grooming products, combining distinctive visual design with full-stack development. The application is being developed from initial wireframes and brand design through to database architecture, product management and customer-facing shopping functionality.",

    objectives: [
      "Design and develop a fully functional e-commerce application using Laravel and PHP.",
      "Create a distinctive brand identity and responsive user interface.",
      "Implement a structured product catalogue with product categories and variations.",
      "Design a relational database to manage products, customers and orders.",
      "Develop customer account, shopping basket and checkout functionality.",
      "Introduce product upselling opportunities within the customer journey.",
      "Apply reusable components and maintainable application architecture.",
    ].join("\n"),

    technologies: [
      "Laravel",
      "PHP",
      "Blade",
      "Tailwind CSS",
      "MySQL",
      "HTML",
      "JavaScript",
    ],

    development: [
      "Created the Floofers brand identity, including its visual style, typography, colour palette and graphical assets.",
      "Produced wireframes for the homepage, product catalogue and product upselling functionality.",
      "Established the Laravel application structure using PHP, Blade templates and Tailwind CSS.",
      "Developed reusable layout components for the website header, navigation, footer and promotional sections.",
      "Implemented responsive interface elements, including a homepage hero section, product carousel and promotional banners.",
      "Designed the initial relational database structure for customer accounts, addresses and product information.",
      "Planned product catalogue management, customer authentication, shopping basket and checkout functionality for subsequent development.",
    ].join("\n"),

    challenges: [
      "Framework adoption: Learning Laravel and its MVC architecture while applying existing front-end development experience to a PHP-based environment.",
      "Database architecture: Planning relational database tables, primary keys and foreign key relationships to support customer and product information.",
      "Reusable components: Structuring Blade templates and layouts to maintain consistent styling and reduce duplicated code.",
      "Brand integration: Translating the initial visual identity and wireframes into responsive, functional website components.",
      "E-commerce functionality: Planning the integration of product management, customer accounts and transactional functionality within the Laravel application.",
    ].join("\n"),

    outcomes: [
      "Established a distinctive e-commerce brand with a consistent visual identity.",
      "Produced initial wireframes covering the homepage, product catalogue and upselling experience.",
      "Configured a Laravel development environment and established the application's front-end structure.",
      "Developed reusable Blade components and responsive interface elements.",
      "Designed the initial database structure to support future e-commerce functionality.",
      "Progressed from initial design concepts into active full-stack application development.",
      "Further development of the product catalogue, customer functionality and checkout process remains ongoing.",
    ].join("\n"),

    screenshots: [
      {
        src: "/images/projects/floofers/floofers-homepage.webp",
        title: "Homepage Wireframe",
      },
      {
        src: "/images/projects/floofers/floofers-products.webp",
        title: "Product Catalogue Wireframe",
      },
      {
        src: "/images/projects/floofers/floofers-upsell.webp",
        title: "Product Upselling Wireframe",
      },
    ],
  },

  // ------------------------------------------
  // VECTARIO
  // ------------------------------------------

  {
    id: "vectario",
    name: "Vectario",
    description: "Personalised products, signage and e-commerce business",
    website: "https://vectario.co.uk",

    projectType: "E-commerce & Branding",
    status: "Live",
    role: "Founder, Designer & E-commerce Developer",

    overview:
      "Vectario is an independent e-commerce and creative business specialising in personalised products, vehicle graphics and signage. The business operates through a WordPress and WooCommerce website, alongside established marketplaces including Etsy and eBay. The project combines website development, branding, product design, digital marketing and commercial business management.",

    objectives: [
      "Develop a professional e-commerce website to showcase and sell personalised products.",
      "Establish a consistent brand identity across the website and external marketplaces.",
      "Implement product categories, filtering and navigation to improve product discovery.",
      "Expand sales opportunities through Etsy and eBay.",
      "Create a scalable product catalogue supporting different product types and personalisation options.",
      "Manage the complete customer journey from product discovery through to fulfilment.",
    ].join("\n"),

    technologies: ["WordPress", "WooCommerce", "HTML", "CSS", "Etsy", "eBay"],

    development: [
      "Developed and customised an e-commerce website using WordPress and WooCommerce.",
      "Designed the website interface to reflect Vectario's brand identity and product offering.",
      "Organised products into categories and implemented product filtering to support catalogue navigation.",
      "Created and managed product listings across the website, Etsy and eBay.",
      "Developed product designs and visual assets for personalised merchandise, vehicle graphics and signage.",
      "Maintained product information, pricing and promotional activity across multiple sales channels.",
      "Managed customer enquiries, order processing, production and fulfilment.",
    ].join("\n"),

    challenges: [
      "Multi-channel management: Managing product listings, pricing and customer orders across WooCommerce, Etsy and eBay while maintaining consistency.",
      "Product personalisation: Presenting customisable products clearly so customers can understand available options and provide the required information.",
      "Product discovery: Organising a varied product catalogue into accessible categories with filtering and navigation.",
      "Brand consistency: Maintaining a recognisable visual identity across an independent website and third-party marketplaces.",
      "Commercial operations: Balancing website management, product development, customer service and physical order fulfilment.",
    ].join("\n"),

    outcomes: [
      "Established and operated a multi-channel e-commerce business.",
      "Developed a branded WordPress and WooCommerce website with product catalogue and filtering functionality.",
      "Expanded the business's online presence through Etsy and eBay storefronts.",
      "Created and maintained a range of personalised products, graphics and signage.",
      "Gained practical experience managing the complete e-commerce process, from product development and marketing to customer service and fulfilment.",
      "Combined technical development, creative design and commercial decision-making within a live business environment.",
    ].join("\n"),

    screenshots: [
      {
        src: "/images/projects/vectario/vectario-website.webp",
        title: "Vectario Website",
      },
      {
        src: "/images/projects/vectario/vectario-products.webp",
        title: "Product Catalogue",
      },
      {
        src: "/images/projects/vectario/vectario-products--filters.webp",
        title: "Product Filtering",
      },
      {
        src: "/images/projects/vectario/etsy-vectario.webp",
        title: "Etsy Storefront",
      },
      {
        src: "/images/projects/vectario/ebay-vectario.webp",
        title: "eBay Storefront",
      },
    ],
  },

  // ------------------------------------------
  // BEAUTIQUE
  // ------------------------------------------

  {
    id: "beautique",
    name: "Beautique",
    description: "Responsive website for a beauty salon",
    website: "https://beautiquesalon.netlify.app/",

    projectType: "Business Website",
    status: "Live",
    role: "Web Designer & Developer",

    overview:
      "Beautique is a beauty salon website designed to provide visitors with an accessible and visually engaging online experience. The website presents information about the salon, its services and pricing, alongside contact information. The project focuses on creating a cohesive visual identity, clear navigation and an intuitive user experience.",

    objectives: [
      "Design a visually appealing website appropriate for a beauty salon.",
      "Create a consistent visual identity across the website.",
      "Provide clear information about salon services and pricing.",
      "Develop intuitive navigation between website sections.",
      "Create a responsive interface suitable for different screen sizes.",
    ].join("\n"),

    technologies: [],

    development: "",
    challenges: "",
    outcomes: "",

    screenshots: [
      {
        src: "/images/projects/beautique/beautique-homepage.webp",
        title: "Homepage",
      },
      {
        src: "/images/projects/beautique/beautique-info.webp",
        title: "Salon Information",
      },
      {
        src: "/images/projects/beautique/beautique-pricing.webp",
        title: "Services & Pricing",
      },
      {
        src: "/images/projects/beautique/beautique-contact.webp",
        title: "Contact Page",
      },
    ],
  },

  // ------------------------------------------
  // PERSONAL PORTFOLIO
  // ------------------------------------------

  {
    id: "personal-portfolio",
    name: "Personal Portfolio",

    description:
      "Interactive developer portfolio featuring animated interfaces and a custom developer mode.",

    website: "https://arriannlee.com/",

    projectType: "Interactive Portfolio Website",
    status: "Live",
    role: "UI/UX Designer & Front-End Developer",

    overview:
      "A personal portfolio website designed to showcase creative and technical capabilities through an engaging, interactive experience. The website combines a distinctive visual identity with animated interface elements, audience-specific content and an alternative developer mode inspired by modern code editors. The project demonstrates the integration of creative design, front-end development and interactive storytelling.",

    objectives: [
      "Develop a distinctive personal brand and professional online presence.",
      "Create an engaging portfolio that demonstrates both creative and technical capabilities.",
      "Implement interactive elements and animations to enhance the visitor experience.",
      "Provide content tailored to different audiences, including recruiters, mentors and engineers.",
      "Develop an alternative developer mode to showcase technical skills through an interactive interface.",
      "Support light and dark visual themes while maintaining design consistency.",
    ].join("\n"),

    technologies: ["Next.js", "React", "TypeScript", "CSS", "GSAP"],

    development: [
      "Designed and developed a responsive portfolio website with a distinctive purple and pink visual identity.",
      "Created a custom illustrated avatar and integrated it into the main interface.",
      "Implemented audience-specific content sections allowing visitors to explore different professional perspectives.",
      "Integrated GSAP animations to introduce movement and interactive transitions.",
      "Developed an alternative developer mode featuring a code editor-inspired interface, file explorer and syntax-highlighted content.",
      "Implemented interactive navigation between the main portfolio and developer mode.",
      "Created light and dark themes with consistent styling and visual presentation.",
      "Integrated project information, contact options and links to professional platforms.",
    ].join("\n"),

    challenges: [
      "Creative and technical positioning: Designing a portfolio that communicates both visual design capabilities and software development experience.",
      "Interactive navigation: Creating an alternative developer mode while maintaining a straightforward visitor experience.",
      "Animation integration: Incorporating GSAP animations without distracting from the website's primary content.",
      "Visual consistency: Maintaining a cohesive brand identity across light and dark themes.",
      "Audience engagement: Presenting professional information in different ways to accommodate visitors with varying interests.",
    ].join("\n"),

    outcomes: [
      "Developed and deployed a distinctive personal portfolio website.",
      "Implemented an interactive developer mode inspired by a modern code editor.",
      "Integrated GSAP animations and interactive interface elements.",
      "Created audience-specific content and alternative visual themes.",
      "Established a professional online presence demonstrating both creative design and front-end development capabilities.",
    ].join("\n"),
    
    screenshots: [
      {
        src: "/images/projects/personal-portfolio/portfolio.webp",
        title: "Portfolio Homepage",
      },
      {
        src: "/images/projects/personal-portfolio/portfolio-darkmode.webp",
        title: "Dark Mode",
      },
      {
        src: "/images/projects/personal-portfolio/enter-developer-mode.webp",
        title: "Enter Developer Mode",
      },
      {
        src: "/images/projects/personal-portfolio/developer-mode.webp",
        title: "Interactive Developer Mode",
      },
      {
        src: "/images/projects/personal-portfolio/footer.webp",
        title: "Contact & Footer",
      },
    ],
  },
  // ------------------------------------------
  // INTERACTIVE CV
  // ------------------------------------------

  {
    id: "interactive-cv",
    name: "Interactive CV",
    description: "Retro Windows-inspired interactive portfolio",
    website: "https://arriannlee.com/cv",

    projectType: "Web Application",
    status: "Live",
    role: "Designer & Front-End Developer",

    overview:
      "An interactive CV developed as a creative alternative to a conventional portfolio website. Inspired by the Windows 95/98 desktop environment, the application allows visitors to explore professional experience, technical skills and projects through an interactive operating system-style interface. The project combines nostalgic visual design with modern web technologies to demonstrate front-end development, UI/UX design and creative problem-solving.",

    objectives: [
      "Create a distinctive and engaging alternative to a traditional CV.",
      "Demonstrate front-end development and UI/UX design capabilities.",
      "Develop a modular application using reusable React components.",
      "Implement interactive desktop functionality and intuitive navigation.",
      "Provide access to a conventional downloadable PDF CV.",
      "Create an expandable portfolio for showcasing additional projects.",
    ].join("\n"),

    technologies: ["Next.js", "React", "TypeScript", "CSS"],

    development: [
      "Designed and developed a Windows 95/98-inspired desktop interface featuring a welcome screen, taskbar, Start menu and interactive desktop icons.",
      "Built reusable application windows with minimise, maximise, close and active-window functionality.",
      "Implemented interactive features including a dial-up internet experience, email interface, wallpaper selection and shutdown sequence.",
      "Developed a Clippy-inspired assistant with animated blinking, contextual guidance and audio feedback.",
      "Integrated an embedded PDF viewer and downloadable conventional CV.",
      "Created a Windows Explorer-style portfolio featuring project folders, document previews and screenshot galleries.",
      "Separated project information from interface components using TypeScript interfaces and structured project data.",
    ].join("\n"),

    challenges: [
      "Window management: Coordinating multiple application windows and their active, minimised and maximised states within a browser-based environment.",
      "Interface design: Recreating the visual characteristics of a legacy operating system while maintaining usability within a modern web application.",
      "Component architecture: Developing reusable interface components to maintain consistency and reduce duplicated functionality.",
      "User experience: Balancing nostalgic desktop interactions with straightforward access to professional information and a conventional PDF alternative.",
    ].join("\n"),

    outcomes: [
      "Developed a functional interactive CV and professional portfolio.",
      "Implemented a reusable React component architecture with TypeScript.",
      "Created an expandable project showcase with document and image viewers.",
      "Integrated interactive navigation, desktop functionality and audio feedback.",
      "Provided visitors with both interactive and conventional ways to access professional information.",
    ].join("\n"),

    screenshots: [
      {
        src: "/images/projects/interactive-cv/login.webp",
        title: "Welcome & Login Screen",
      },
      {
        src: "/images/projects/interactive-cv/retro-setup.webp",
        title: "Retro Desktop Interface",
      },
      {
        src: "/images/projects/interactive-cv/cv.webp",
        title: "CV Document Viewer",
      },
      {
        src: "/images/projects/interactive-cv/contact-form-email.webp",
        title: "Interactive Email Client",
      },
      {
        src: "/images/projects/interactive-cv/dial-up.webp",
        title: "Dial-Up Internet Experience",
      },
      {
        src: "/images/projects/interactive-cv/shutting-down.webp",
        title: "Windows-Style Shutdown Screen",
      },
    ],
  },
];
