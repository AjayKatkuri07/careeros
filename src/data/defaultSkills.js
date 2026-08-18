const skillsByRole = {
  "Frontend Developer": [
    { id: "html-css", name: "HTML/CSS", progress: 0, notes: "" },
    { id: "javascript", name: "JavaScript", progress: 0, notes: "" },
    { id: "react", name: "React", progress: 0, notes: "" },
    { id: "responsive-design", name: "Responsive Design", progress: 0, notes: "" },
    { id: "git", name: "Git & GitHub", progress: 0, notes: "" },
    { id: "testing", name: "Testing Basics", progress: 0, notes: "" },
  ],
  "Backend Developer": [
    { id: "core-language", name: "Core Programming Language", progress: 0, notes: "" },
    { id: "databases", name: "Databases", progress: 0, notes: "" },
    { id: "rest-apis", name: "REST APIs", progress: 0, notes: "" },
    { id: "auth", name: "Authentication & Security", progress: 0, notes: "" },
    { id: "git", name: "Git & GitHub", progress: 0, notes: "" },
    { id: "deployment", name: "Deployment Basics", progress: 0, notes: "" },
  ],
  "Java Full Stack Developer": [
    { id: "html-css", name: "HTML/CSS", progress: 0, notes: "" },
    { id: "javascript", name: "JavaScript", progress: 0, notes: "" },
    { id: "react", name: "React", progress: 0, notes: "" },
    { id: "java", name: "Java", progress: 0, notes: "" },
    { id: "sql", name: "SQL", progress: 0, notes: "" },
    { id: "spring-boot", name: "Spring Boot", progress: 0, notes: "" },
    { id: "security", name: "Security", progress: 0, notes: "" },
    { id: "microservices", name: "Microservices", progress: 0, notes: "" },
  ],
  "Software Developer": [
    { id: "dsa", name: "Data Structures & Algorithms", progress: 0, notes: "" },
    { id: "core-language", name: "Core Programming Language", progress: 0, notes: "" },
    { id: "git", name: "Git & GitHub", progress: 0, notes: "" },
    { id: "databases", name: "Databases", progress: 0, notes: "" },
    { id: "system-design", name: "System Design Basics", progress: 0, notes: "" },
  ],
  "Data Analyst": [
    { id: "excel", name: "Excel", progress: 0, notes: "" },
    { id: "sql", name: "SQL", progress: 0, notes: "" },
    { id: "python", name: "Python", progress: 0, notes: "" },
    { id: "statistics", name: "Statistics", progress: 0, notes: "" },
    { id: "visualization", name: "Data Visualization", progress: 0, notes: "" },
  ],
};

const genericSkills = [
  { id: "programming-fundamentals", name: "Programming Fundamentals", progress: 0, notes: "" },
  { id: "git", name: "Git & GitHub", progress: 0, notes: "" },
  { id: "dsa", name: "Data Structures & Algorithms", progress: 0, notes: "" },
  { id: "databases", name: "Databases", progress: 0, notes: "" },
];

export function getDefaultSkills(targetRole) {
  return skillsByRole[targetRole] || genericSkills;
}