// Pre-curated, ATS-optimized bullet points organized by role/industry
// Real AI integrations would call an API, but for SnapCV we provide an instant client-side library.

export const aiBulletPoints = {
  "Software Engineer": [
    "Architected and developed scalable microservices using Node.js and Express, improving system throughput by 40%.",
    "Led the migration of legacy monolithic architecture to AWS cloud infrastructure, reducing hosting costs by 25%.",
    "Implemented CI/CD pipelines using GitHub Actions, decreasing deployment time from hours to minutes.",
    "Optimized SQL queries and database indexing, reducing average API response time by 200ms.",
    "Mentored junior developers through code reviews and pair programming, increasing team productivity.",
    "Developed responsive front-end components using React and TailwindCSS, improving Lighthouse performance score to 98."
  ],
  "Frontend Developer": [
    "Spearheaded the redesign of the core web application using React and Next.js, resulting in a 35% increase in user engagement.",
    "Implemented state management using Redux Toolkit, reducing unnecessary re-renders and improving app performance.",
    "Collaborated with UX/UI designers to translate Figma mockups into pixel-perfect, accessible components.",
    "Integrated RESTful APIs and GraphQL endpoints to power dynamic user interfaces.",
    "Established frontend testing standards using Jest and React Testing Library, achieving 85% code coverage."
  ],
  "Product Manager": [
    "Defined product roadmap and strategy for a B2B SaaS platform, driving a 50% increase in MRR within 12 months.",
    "Conducted user interviews and analyzed product analytics to identify friction points and prioritize feature development.",
    "Led cross-functional teams of engineering, design, and marketing to launch 3 major product updates on schedule.",
    "Implemented agile methodologies (Scrum/Kanban) to streamline the product development lifecycle.",
    "Developed go-to-market strategies and sales enablement materials for new feature releases."
  ],
  "Data Analyst": [
    "Developed interactive Tableau dashboards to visualize key performance indicators, saving the executive team 10 hours per week in reporting.",
    "Extracted and cleaned datasets of 1M+ rows using Python (Pandas) and SQL for complex statistical analysis.",
    "Identified customer churn patterns through cohort analysis, leading to a targeted retention campaign that reduced churn by 15%.",
    "Automated daily reporting workflows using Python scripts and cron jobs, eliminating manual data entry.",
    "Presented data-driven recommendations to stakeholders, resulting in a 10% optimization in marketing spend."
  ],
  "Marketing Manager": [
    "Designed and executed multi-channel digital marketing campaigns, resulting in a 40% increase in inbound leads.",
    "Managed a $100k+ quarterly ad budget across Google Ads and Meta Ads, achieving a 3x Return on Ad Spend (ROAS).",
    "Developed a comprehensive SEO strategy that increased organic website traffic by 150% year-over-year.",
    "Created automated email nurture sequences in HubSpot, improving lead-to-customer conversion rates by 25%.",
    "Analyzed campaign performance metrics using Google Analytics to continuously optimize marketing efforts."
  ],
  "Sales Representative": [
    "Exceeded annual sales quota by 125%, generating $1.2M in new revenue.",
    "Prospected and qualified inbound and outbound leads, maintaining a robust pipeline of potential clients.",
    "Conducted product demonstrations and presentations for C-level executives and key decision-makers.",
    "Negotiated and closed complex enterprise contracts with an average deal size of $50k.",
    "Utilized Salesforce CRM to track sales activities, manage accounts, and forecast revenue."
  ],
  "Customer Success Manager": [
    "Managed a portfolio of 50+ enterprise clients, maintaining a 98% gross retention rate.",
    "Conducted quarterly business reviews (QBRs) to ensure clients were achieving ROI and identifying upsell opportunities.",
    "Developed comprehensive onboarding programs, reducing time-to-value for new customers by 30%.",
    "Collaborated with the product team to advocate for customer feature requests and prioritize bug fixes.",
    "Proactively identified accounts at risk of churn and implemented successful mitigation strategies."
  ],
  "Graphic Designer": [
    "Designed brand identities, marketing collateral, and digital assets for 20+ clients, maintaining a 95% client satisfaction rate.",
    "Created engaging social media graphics and short-form video content that increased brand engagement by 45%.",
    "Collaborated with the marketing team to design visually compelling presentations and pitch decks.",
    "Managed multiple design projects simultaneously, consistently meeting tight deadlines without sacrificing quality.",
    "Maintained and updated brand guidelines to ensure visual consistency across all company materials."
  ],
  "General/Administrative": [
    "Streamlined office operations by implementing a new digital filing system, improving document retrieval time by 50%.",
    "Managed complex scheduling and travel arrangements for 3 C-level executives.",
    "Coordinated cross-departmental meetings and events, ensuring clear communication and smooth execution.",
    "Processed expense reports and invoices accurately using QuickBooks.",
    "Provided exceptional administrative support, handling inquiries and resolving issues efficiently."
  ]
};

// Flatten to a single array with tags for searching
export const getAllBulletPoints = () => {
  const all = [];
  Object.keys(aiBulletPoints).forEach(role => {
    aiBulletPoints[role].forEach(text => {
      all.push({ role, text });
    });
  });
  return all;
};

// Simple search function
export const searchBulletPoints = (query) => {
  if (!query) return [];
  const q = query.toLowerCase();
  const all = getAllBulletPoints();
  
  // Try to find exact role match first
  if (aiBulletPoints[query]) {
      return aiBulletPoints[query];
  }

  // Fallback to fuzzy search
  return all.filter(item => 
    item.role.toLowerCase().includes(q) || item.text.toLowerCase().includes(q)
  ).map(item => item.text).slice(0, 6); // Max 6 results
};
