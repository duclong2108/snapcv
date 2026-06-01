export const defaultResumeData = {
  personal: {
    firstName: 'Alex',
    lastName: 'Johnson',
    title: 'Senior Product Designer',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexjohnson.design',
    linkedin: 'linkedin.com/in/alexjohnson',
    summary: 'Creative and detail-oriented Product Designer with 6+ years of experience crafting intuitive digital experiences. Passionate about user-centered design, design systems, and bridging the gap between design and development. Led design for products used by 2M+ users.'
  },
  experience: [
    {
      id: '1',
      company: 'TechFlow Inc.',
      position: 'Senior Product Designer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      bullets: [
        'Led the redesign of the core product dashboard, increasing user engagement by 40% and reducing churn by 15%',
        'Established and maintained a comprehensive design system used across 5 product teams',
        'Mentored 3 junior designers and conducted weekly design critique sessions',
        'Collaborated with engineering to implement pixel-perfect, accessible UI components'
      ]
    },
    {
      id: '2',
      company: 'DesignCraft Studio',
      position: 'Product Designer',
      location: 'New York, NY',
      startDate: 'Mar 2019',
      endDate: 'Dec 2021',
      bullets: [
        'Designed and shipped 12+ features for a B2B SaaS platform serving 500K+ users',
        'Conducted user research with 100+ participants, translating insights into actionable design improvements',
        'Reduced onboarding drop-off by 35% through iterative prototyping and A/B testing'
      ]
    },
    {
      id: '3',
      company: 'Starter Labs',
      position: 'UI/UX Designer',
      location: 'Austin, TX',
      startDate: 'Jun 2017',
      endDate: 'Feb 2019',
      bullets: [
        'Created wireframes, prototypes, and high-fidelity mockups for mobile and web applications',
        'Worked closely with founders to define product vision and user experience strategy'
      ]
    }
  ],
  education: [
    {
      id: '1',
      school: 'California Institute of Design',
      degree: 'Bachelor of Fine Arts in Interaction Design',
      location: 'Pasadena, CA',
      startDate: '2013',
      endDate: '2017',
      gpa: '3.8'
    }
  ],
  skills: [
    'Figma', 'Sketch', 'Adobe XD', 'Prototyping',
    'User Research', 'Design Systems', 'HTML/CSS',
    'React', 'Accessibility', 'Wireframing',
    'A/B Testing', 'Agile/Scrum'
  ],
  projects: [
    {
      id: '1',
      name: 'DesignKit — Open Source UI Library',
      description: 'Created an open-source UI component library with 50+ components, 2K+ GitHub stars, and adoption by 200+ developers.',
      link: 'github.com/alexj/designkit'
    },
    {
      id: '2',
      name: 'Wellness App — Health Tracker',
      description: 'Designed a wellness tracking app from concept to launch, featured on App Store "Apps We Love".',
      link: ''
    }
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'Conversational' }
  ],
  customSections: []
}

export function getEmptyResumeData() {
  return {
    personal: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    customSections: []
  }
}
