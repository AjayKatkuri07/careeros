export function getDefaultChecklist() {
  return [
    { id: "java-oop", category: "Java", label: "OOP", checked: false },
    { id: "java-collections", category: "Java", label: "Collections", checked: false },
    { id: "java-streams", category: "Java", label: "Streams", checked: false },
    { id: "java-multithreading", category: "Java", label: "Multithreading", checked: false },

    { id: "sql-select", category: "SQL", label: "SELECT", checked: false },
    { id: "sql-join", category: "SQL", label: "JOIN", checked: false },
    { id: "sql-subqueries", category: "SQL", label: "Subqueries", checked: false },

    { id: "spring-rest", category: "Spring", label: "REST", checked: false },
    { id: "spring-jpa", category: "Spring", label: "JPA", checked: false },
    { id: "spring-security", category: "Spring", label: "Security", checked: false },
  ];
}