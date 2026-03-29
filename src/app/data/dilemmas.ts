export interface DailyDilemma {
  id: string;
  date: string;
  title: string;
  scenario: string;
  options: string[];
}

export const dailyDilemmas: DailyDilemma[] = [
  {
    id: "1",
    date: "2026-03-27",
    title: "School Dress Code Dilemma",
    scenario: "Your school has a strict dress code that prohibits students from wearing any political messages on clothing. A student wears a shirt supporting environmental protection. Should the school be allowed to enforce the dress code in this case?",
    options: [
      "Yes, schools can enforce dress codes to maintain order",
      "No, this is protected political speech",
      "It depends on whether it disrupts learning",
      "The student should be allowed to explain their choice first"
    ]
  },
  {
    id: "2",
    date: "2026-03-28",
    title: "Privacy vs. Safety in Schools",
    scenario: "After several incidents of students bringing prohibited items to school, the administration proposes installing security cameras in all hallways and common areas (but not in bathrooms or locker rooms). Should this be allowed?",
    options: [
      "Yes, school safety should be the top priority",
      "No, it violates students' privacy rights",
      "Yes, but only in certain high-risk areas",
      "No, there are less invasive alternatives"
    ]
  },
  {
    id: "3",
    date: "2026-03-29",
    title: "Social Media Evidence in School Discipline",
    scenario: "Two students get into an argument at school that doesn't become physical. Later that night, one student posts threats against the other on social media from home. Should the school have the authority to discipline the student for the online post?",
    options: [
      "Yes, threats affect school safety even if made off-campus",
      "No, schools shouldn't control student behavior outside school",
      "Yes, but only if parents agree to the discipline",
      "No, this should be a matter for police, not schools"
    ]
  }
];

// Mock voting results (would come from database in real app)
export const dilemmaResults = {
  "1": {
    votes: [245, 189, 312, 154],
    totalVotes: 900
  },
  "2": {
    votes: [423, 178, 267, 132],
    totalVotes: 1000
  },
  "3": {
    votes: [389, 201, 156, 254],
    totalVotes: 1000
  }
};
