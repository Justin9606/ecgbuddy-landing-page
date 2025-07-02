export interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
}

export const jobPositions: JobPosition[] = [
  {
    id: 1,
    title: "Senior AI/ML Engineer",
    department: "engineering",
    location: "Seoul, Korea",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120K - $180K",
    description: "Lead the development of our next-generation AI models for ECG analysis and cardiac diagnostics. You'll work with cutting-edge machine learning technologies to improve diagnostic accuracy and help save lives through innovative healthcare AI solutions.",
    requirements: [
      "PhD/MS in Computer Science, AI, or related field",
      "5+ years experience in machine learning and deep learning",
      "Expertise in TensorFlow, PyTorch, or similar frameworks",
      "Experience with medical data and healthcare AI applications",
      "Strong Python programming and cloud computing skills",
      "Knowledge of signal processing and time-series analysis",
      "Experience with MLOps and model deployment pipelines"
    ],
    benefits: ["Stock options", "Health insurance", "Flexible hours", "Remote work"],
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Senior Frontend Developer",
    department: "engineering",
    location: "Seoul, Korea",
    type: "Full-time",
    experience: "4+ years",
    salary: "$90K - $140K",
    description: "Build beautiful, responsive user interfaces for our healthcare platform using React and Next.js. Create intuitive experiences that help medical professionals analyze ECG data efficiently and accurately.",
    requirements: [
      "BS in Computer Science or equivalent experience",
      "4+ years React/Next.js development experience",
      "Expert knowledge of TypeScript and modern JavaScript",
      "Proficiency with Tailwind CSS and responsive design",
      "Experience with healthcare/medical user interfaces",
      "Strong design sensibility and attention to detail",
      "Knowledge of accessibility standards (WCAG)"
    ],
    benefits: ["Stock options", "Health insurance", "Learning budget", "Gym membership"],
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "Clinical Research Specialist",
    department: "clinical",
    location: "Seoul, Korea",
    type: "Full-time",
    experience: "3+ years",
    salary: "$70K - $110K",
    description: "Lead clinical validation studies and collaborate with medical institutions to improve our AI algorithms. Work directly with cardiologists and healthcare professionals to ensure our technology meets clinical standards.",
    requirements: [
      "MD, PhD, or MS in Biomedical Sciences or related field",
      "3+ years clinical research experience",
      "Experience with cardiology and ECG analysis",
      "Strong statistical analysis and data interpretation skills",
      "Knowledge of regulatory compliance (FDA, CE marking)",
      "Experience with clinical trial design and execution",
      "Excellent communication and presentation skills"
    ],
    benefits: ["Health insurance", "Conference budget", "Research grants", "Flexible schedule"],
    posted: "3 days ago"
  },
  {
    id: 4,
    title: "Product Designer",
    department: "design",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$80K - $120K",
    description: "Design intuitive healthcare experiences that help medical professionals save lives. Create user-centered designs for our ECG analysis platform, ensuring complex medical data is presented clearly and actionably.",
    requirements: [
      "Bachelor's degree in Design, HCI, or equivalent experience",
      "3+ years product design experience, preferably in healthcare",
      "Proficiency in Figma, Adobe Creative Suite, and prototyping tools",
      "Healthcare/medical design experience strongly preferred",
      "Strong user research and usability testing skills",
      "Understanding of accessibility and inclusive design principles",
      "Experience with design systems and component libraries"
    ],
    benefits: ["Remote work", "Design tools budget", "Health insurance", "Unlimited PTO"],
    posted: "5 days ago"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "engineering",
    location: "Seoul, Korea",
    type: "Full-time",
    experience: "4+ years",
    salary: "$100K - $150K",
    description: "Build and maintain our cloud infrastructure to ensure 99.9% uptime for critical healthcare services. Implement robust CI/CD pipelines and monitoring systems for our AI-powered ECG analysis platform.",
    requirements: [
      "BS in Computer Science, Engineering, or equivalent experience",
      "4+ years DevOps/Infrastructure experience",
      "Expert knowledge of AWS, Kubernetes, and Docker",
      "Experience with healthcare compliance (HIPAA, SOC 2)",
      "Strong automation and monitoring skills (Terraform, Ansible)",
      "Knowledge of security best practices and vulnerability management",
      "Experience with high-availability systems and disaster recovery"
    ],
    benefits: ["Stock options", "Health insurance", "On-call compensation", "Training budget"],
    posted: "1 day ago"
  },
  {
    id: 6,
    title: "Data Scientist",
    department: "data",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$95K - $135K",
    description: "Analyze large-scale medical data to improve our AI models and generate clinical insights. Work with massive datasets of ECG recordings to identify patterns and improve diagnostic accuracy.",
    requirements: [
      "PhD/MS in Statistics, Data Science, Mathematics, or related field",
      "3+ years data science experience, preferably in healthcare",
      "Expert knowledge of Python, R, SQL, and statistical modeling",
      "Experience with medical/healthcare data and privacy regulations",
      "Strong statistical modeling and machine learning skills",
      "Experience with big data technologies (Spark, Hadoop)",
      "Knowledge of clinical research methodologies"
    ],
    benefits: ["Remote work", "Conference budget", "Health insurance", "Research time"],
    posted: "1 week ago"
  }
];

export const getJobById = (id: number): JobPosition | undefined => {
  return jobPositions.find(job => job.id === id);
};

export const getJobsByDepartment = (department: string): JobPosition[] => {
  if (department === "all") return jobPositions;
  return jobPositions.filter(job => job.department === department);
};