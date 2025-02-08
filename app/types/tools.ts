export interface Tool {
  id: string;
  title: string;
  icon: string;
  experience: 1 | 2 | 3 | 4 | 5;
  type: "code" | "tool";
}

// experience = {
//   1: {
//     name: "Beginner (Exploring)",
//     description: {
//       code: "Initial exposure. Learning basic concepts and syntax (if applicable). Can follow tutorials and examples, but struggles with complex tasks.",
//       tool: "Can perform basic operations, but needs frequent reference to documentation.",
//     },
//   },
//   2: {
//     name: "Novice (Apprentice)",
//     description: {
//       code: "Can use the technology for simple tasks. Starting to become more independent, but still learning best practices and common patterns.",
//       tool: "Can use core features, but may need guidance on more advanced usage.",
//     },
//   },
//   3: {
//     name: "Junior (Practitioner)",
//     description: {
//       code: "Can use the technology for common tasks. Understands core concepts and can contribute to simple projects. Still needs guidance on complex issues or advanced features.",
//       tool: "Comfortable with most common use cases and can integrate into basic workflows.",
//     },
//   },
//   4: {
//     name: "Mid-Level (Proficient)",
//     description: {
//       code: "Comfortable using the technology for most tasks. Can solve problems independently and implement features with minimal guidance.",
//       tool: "Proficient in most features and can integrate into complex workflows. Can optimize basic usage.",
//     },
//   },
//   5: {
//     name: "Senior (Competent)",
//     description: {
//       code: "Deep understanding of the technology. Can design complex solutions, optimize performance, and troubleshoot difficult problems. Mentors others and contributes to architectural decisions.",
//       tool: "Deep understanding of internals and best practices. Can develop custom extensions or integrations.",
//     },
//   },
//   6: {
//     name: "Expert (Master)",
//     description: {
//       code: "Extensive experience, deep understanding of internals, contributes to the technology's development, recognized authority, leads large-scale projects, pushes boundaries.",
//       tool: "Recognized expert, contributes to the library/tool's development (e.g., open-source contributions), and may be considered a authority.",
//     },
//   },
// };
