import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaCode, 
  FaCertificate, 
  FaFolderOpen, 
  FaLaptopCode, 
  FaUserGraduate, 
  FaBriefcase, 
  FaAward,
  FaHeart,
  FaCss3Alt
} from 'react-icons/fa';
import { 
  SiLeetcode, 
  SiCodechef, 
  SiReact, 
  SiNodedotjs, 
  SiMongodb, 
  SiTailwindcss, 
  SiJavascript, 
  SiPython, 
  SiPostman, 
  SiGit, 
  SiExpress, 
  SiMysql, 
  SiHtml5, 
  SiBootstrap 
} from 'react-icons/si';

export const portfolioData = {
  personalInfo: {
    name: "Pittala Rakesh",
    titles: [
      "Software Engineer",
      "Full Stack Developer",
      "Data Science Student"
    ],
    bio: "Passionate Software Engineer and Full Stack Developer. Currently pursuing Data Science studies, focusing on building scalable, performant web applications and solving complex algorithmic challenges. I love blending clean UI/UX with solid engineering principles to create elegant digital experiences.",
    shortBio: "Building high-performance applications with beautiful, functional design. Focused on MERN Stack, Algorithms, and Data Science.",
    email: "pittalarakesh2004@gmail.com",
    emailSecondary: "pittalarakesh067@gmail.com",
    resumeUrl: "#", // Mock download link (triggers auto-generated resume layout)
    socials: [
      {
        name: "GitHub",
        url: "https://github.com/Rakesh-2006-r",
        icon: FaGithub,
        color: "hover:text-white hover:bg-slate-950"
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/pittala-rakesh-2594b9291/",
        icon: FaLinkedin,
        color: "hover:text-blue-500 hover:bg-blue-950/30"
      },
      {
        name: "LeetCode",
        url: "https://leetcode.com/u/Pittala_Rakesh/",
        icon: SiLeetcode,
        color: "hover:text-yellow-500 hover:bg-yellow-950/30"
      },
      {
        name: "CodeChef",
        url: "https://www.codechef.com/users/rakesh_04_20",
        icon: SiCodechef,
        color: "hover:text-orange-500 hover:bg-orange-950/30"
      },
      {
        name: "Email",
        url: "mailto:pittalarakesh2004@gmail.com",
        icon: FaEnvelope,
        color: "hover:text-red-500 hover:bg-red-950/30"
      }
    ]
  },
  
  stats: [
    { label: "Projects Completed", value: 15, target: 15, suffix: "+" },
    { label: "DSA Problems Solved", value: 1000, target: 1000, suffix: "+" },
    { label: "Technologies Mastered", value: 18, target: 18, suffix: "" },
    { label: "Certifications Earned", value: 10, target: 10, suffix: "+" }
  ],
  
  skills: [
    {
      category: "Programming",
      items: [
        { name: "Java", level: 90, icon: FaCode },
        { name: "Python", level: 85, icon: SiPython },
        { name: "JavaScript", level: 90, icon: SiJavascript },
        { name: "SQL", level: 80, icon: FaCode },
        { name: "C", level: 75, icon: FaCode }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React", level: 90, icon: SiReact },
        { name: "HTML5", level: 95, icon: SiHtml5 },
        { name: "CSS3", level: 90, icon: FaCss3Alt },
        { name: "Tailwind CSS", level: 92, icon: SiTailwindcss },
        { name: "Bootstrap", level: 80, icon: SiBootstrap }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", level: 85, icon: SiNodedotjs },
        { name: "Express.js", level: 85, icon: SiExpress }
      ]
    },
    {
      category: "Database",
      items: [
        { name: "MongoDB", level: 85, icon: SiMongodb },
        { name: "MySQL", level: 80, icon: SiMysql }
      ]
    },
    {
      category: "Tools",
      items: [
        { name: "Git", level: 88, icon: SiGit },
        { name: "GitHub", level: 92, icon: FaGithub },
        { name: "VS Code", level: 95, icon: FaLaptopCode },
        { name: "Postman", level: 85, icon: SiPostman }
      ]
    }
  ],
  
  projects: [
    {
      id: 4,
      title: "Car Rental Web Application",
      description: "A comprehensive full-stack car rental platform with dynamic vehicle filtering, real-time availability tracking, and automated booking workflows.",
      longDescription: "Designed a highly responsive, cross-device React.js user interface that integrates seamlessly with a secure Node.js/Express.js backend for state management. Architected scalable MongoDB and Mongoose data models to efficiently handle concurrent user profiles, vehicle inventory, and transaction records. Deployed the application to production via Vercel for high availability.",
      tags: ["React", "Node.js", "MongoDB", "Express", "Vercel"],
      image: "car_rental",
      github: "https://github.com/Rakesh-2006-r/CarRental",
      demo: "https://car-rental-rho-lake.vercel.app/",
      highlights: ["MERN Stack", "Dynamic Filtering", "Real-time Availability", "Automated Booking", "Vercel Deployment"]
    },
    {
      id: 3,
      title: "AgriConnect",
      description: "A scalable multi-role agricultural platform featuring custom dashboards, a real-time Mandi Price Engine, and intelligent Google Gemini AI modules.",
      longDescription: "Architected a scalable platform featuring 5 custom React.js dashboards with strict role-based access control. Engineered a real-time Mandi Price Engine integrating Government APIs with server-side caching. Integrated Google Gemini AI to deploy 7 intelligent modules, including image-based crop disease detection, price forecasting, and a voice assistant. Built a robust Node.js backend with JWT authentication and escrow-based payments.",
      tags: ["React", "Node.js", "MongoDB", "Express", "Gemini AI"],
      image: "agri_connect",
      github: "https://github.com/Rakesh-2006-r/Agri_Connect",
      demo: "#",
      highlights: ["MERN Stack", "Gemini AI Integration", "Role-Based Access", "Mandi Price Engine", "Escrow Payments"]
    },
    {
      id: 2,
      title: "E-Library Management System",
      description: "A sleek React and Node web application that facilitates seamless book searches, instant PDF uploading/storage, administrative control panels, and multi-tier user authentication.",
      longDescription: "Designed with modern state managers and file-upload validation. Integrates cloud-storage features for PDF document indexing. Features a clean catalog interface with search-as-you-type options, reading progress trackers, and detailed reviews sections for interactive learning communities.",
      tags: ["React", "Node.js", "MongoDB", "Express", "Multer"],
      image: "e_library",
      github: "https://github.com/Rakesh-2006-r/E-library",
      demo: "https://demo.com",
      highlights: ["React & Node", "MongoDB Database", "Book Upload", "PDF Storage", "User Authentication"]
    },
    {
      id: 1,
      title: "Proof of Work Incentive System",
      description: "A comprehensive MERN Stack platform designed for organizational transparency. It features real-time progress leaderboards, submission review pipelines, task approval gateways, and cryptographic validation protocols.",
      longDescription: "This decentralization-inspired system helps administrators incentivize high-fidelity work within groups. Users submit evidence of task completion, which administrators verify. It uses Socket.io for instantaneous leaderboard updates, custom MongoDB schemas to evaluate engagement coefficients, and an interactive frontend showcasing animated progress reports.",
      tags: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
      image: "pow_system", // Name mapping for rendering mock visual card
      github: "https://github.com/Rakesh-2006-r/Work-Submission",
      demo: "https://demo.com",
      highlights: ["MERN Stack", "Admin/User Dashboard", "Leaderboard", "Task Approval", "Real-time Updates"]
    }
  ],
  
  experience: [
    {
      role: "Freelance Full Stack Developer",
      company: "Independent Contracts",
      duration: "2025 - Present",
      description: "Building premium landing pages, MERN stack dashboards, and custom web applications for various startup clients. Optimizing animations, performance, and SEO scores using modern tools.",
      skills: ["React", "Node.js", "MongoDB", "Framer Motion", "Tailwind CSS"]
    },
    {
      role: "Software Developer Intern",
      company: "TechSolutions Labs",
      duration: "2024 - 2025",
      description: "Assisted in architecting administrative dashboards and responsive portals. Refactored state-management systems, resulting in a 25% reduction in API overhead and faster rendering benchmarks.",
      skills: ["JavaScript", "React", "Postman", "Git", "REST APIs"]
    },
    {
      role: "Open Source Contributor",
      company: "GitHub / Community Projects",
      duration: "2023 - 2024",
      description: "Contributed components to UI widget packages, squashed bugs in developer tools, and actively participated in building educational tools with JavaScript and Python.",
      skills: ["Git", "GitHub", "Python", "HTML/CSS"]
    }
  ],
  
  education: [
    {
      degree: "Bachelor of Technology in Computer Science (Specialization in Data Science)",
      institution: "Gokaraju Rangaraju Institute of Engineering and Technology",
      duration: "2023 - 2027",
      grade: "CGPA: 8.9 / 10.0 (Ongoing)",
      description: "Focusing heavily on Advanced Algorithms, Machine Learning paradigms, Data Analysis, Database Management, and Full-Stack Engineering principles."
    },
    {
      degree: "High School (Intermediate Education) - MPC",
      institution: "Shivani Junior College",
      duration: "2021 - 2023",
      grade: "Percentage: 96.5%",
      description: "Rigorous focus on Mathematics, Physics, and Chemistry, laying a solid foundation for logical engineering problems."
    }
  ],
  
  achievements: [
    {
      title: "Solved 1000+ DSA Problems",
      description: "Actively resolved questions across platforms such as LeetCode and CodeStudio. Maintained top scores for algorithmic accuracy.",
      platform: "LeetCode & GFG"
    },
    {
      title: "Weekly Coding Contest Participant",
      description: "Ranked inside the top 8% of competitors globally in regular virtual contests, solving high-difficulty tree, graph, and DP problems.",
      platform: "LeetCode / CodeChef"
    },
    {
      title: "National Hackathon Finalist",
      description: "Pioneered the frontend integration and state machine for a green energy tracking dashboard during an intense 36-hour sprint.",
      platform: "Smart India Hackathon"
    },
    {
      title: "Infosys DSE Selection",
      description: "Passed rigorous multi-stage coding interviews and assessments, qualifying for the prestigious Digital Specialist Engineer pathway.",
      platform: "Infosys"
    },
    {
      title: "Certified MERN Developer",
      description: "Completed intensive training courses and project audits for building industrial-grade cloud APIs and reactive interfaces.",
      platform: "Udemy / Coursera"
    }
  ],
  
  certifications: [
    {
      title: "The Joy of Computing using Python (92%)",
      issuer: "NPTEL",
      date: "Jan-Apr 2026",
      id: "NPTEL26CS84S356202520",
      link: "#"
    },
    {
      title: "Introduction to Internet of Things (78%)",
      issuer: "NPTEL",
      date: "Jul-Oct 2025",
      id: "NPTEL25CS147S1058208182",
      link: "#"
    }
  ]
};
