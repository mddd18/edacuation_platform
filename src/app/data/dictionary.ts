export interface DictionaryEntry {
  id: string;
  term: string;
  definition: string;
  category: string;
  examples?: string[];
  relatedTerms?: string[];
}

export const dictionary: DictionaryEntry[] = [
  {
    id: "1",
    term: "Constitution",
    definition: "The supreme law of the United States that establishes the structure of government and protects individual rights. It was ratified in 1788 and has been amended 27 times.",
    category: "Constitutional Law",
    examples: [
      "The Constitution divides power among three branches of government.",
      "Constitutional rights cannot be violated by federal or state governments."
    ],
    relatedTerms: ["Bill of Rights", "Amendment", "Ratification"]
  },
  {
    id: "2",
    term: "Bill of Rights",
    definition: "The first ten amendments to the Constitution that guarantee specific rights and freedoms to individuals, including freedom of speech, religion, and the right to a fair trial.",
    category: "Constitutional Law",
    examples: [
      "The First Amendment in the Bill of Rights protects freedom of speech.",
      "The Bill of Rights was added to the Constitution in 1791."
    ],
    relatedTerms: ["Constitution", "Amendment", "First Amendment"]
  },
  {
    id: "3",
    term: "Due Process",
    definition: "The legal requirement that the government must respect all legal rights owed to a person according to law. It ensures fair treatment through the judicial system.",
    category: "Constitutional Law",
    examples: [
      "Due process requires that you be notified of charges against you.",
      "The right to due process protects against arbitrary government action."
    ],
    relatedTerms: ["Fifth Amendment", "Fourteenth Amendment", "Fair Trial"]
  },
  {
    id: "4",
    term: "Equal Protection",
    definition: "A constitutional guarantee that all people must be treated equally by the law and government. It prohibits discrimination based on race, religion, gender, or other protected characteristics.",
    category: "Constitutional Law",
    examples: [
      "Equal protection ensures that laws apply to everyone fairly.",
      "The Fourteenth Amendment's Equal Protection Clause prohibits discrimination."
    ],
    relatedTerms: ["Fourteenth Amendment", "Discrimination", "Civil Rights"]
  },
  {
    id: "5",
    term: "First Amendment",
    definition: "Constitutional protection for freedom of speech, religion, press, assembly, and petition. It prevents the government from restricting these fundamental rights.",
    category: "Constitutional Law",
    examples: [
      "The First Amendment protects your right to criticize the government.",
      "Schools must respect students' First Amendment rights with some limitations."
    ],
    relatedTerms: ["Freedom of Speech", "Freedom of Religion", "Bill of Rights"]
  },
  {
    id: "6",
    term: "Fourth Amendment",
    definition: "Constitutional protection against unreasonable searches and seizures. It generally requires law enforcement to obtain a warrant before searching private property.",
    category: "Constitutional Law",
    examples: [
      "The Fourth Amendment protects your home from warrantless searches.",
      "School locker searches have different Fourth Amendment standards than home searches."
    ],
    relatedTerms: ["Search Warrant", "Probable Cause", "Reasonable Suspicion"]
  },
  {
    id: "7",
    term: "Fifth Amendment",
    definition: "Constitutional protection that includes the right against self-incrimination, double jeopardy, and guarantees due process. It allows individuals to refuse to answer questions that might incriminate them.",
    category: "Constitutional Law",
    examples: [
      "You can 'plead the Fifth' and refuse to answer police questions.",
      "The Fifth Amendment prevents trying someone twice for the same crime."
    ],
    relatedTerms: ["Self-Incrimination", "Due Process", "Double Jeopardy"]
  },
  {
    id: "8",
    term: "Probable Cause",
    definition: "A reasonable belief, based on facts, that a crime has been or is being committed. It's the standard required for police to obtain a search warrant or make an arrest.",
    category: "Criminal Law",
    examples: [
      "Police need probable cause to arrest someone.",
      "A judge will only issue a warrant if there is probable cause."
    ],
    relatedTerms: ["Fourth Amendment", "Search Warrant", "Reasonable Suspicion"]
  },
  {
    id: "9",
    term: "Reasonable Suspicion",
    definition: "A lower standard than probable cause, based on specific facts that suggest criminal activity. School officials can search with reasonable suspicion rather than probable cause.",
    category: "Criminal Law",
    examples: [
      "A teacher's reasonable suspicion allowed the locker search.",
      "Reasonable suspicion requires more than a hunch but less proof than probable cause."
    ],
    relatedTerms: ["Probable Cause", "Fourth Amendment", "School Searches"]
  },
  {
    id: "10",
    term: "Warranty",
    definition: "A guarantee from a seller that a product will meet certain standards of quality and performance. Warranties can be express (written/stated) or implied (assumed by law).",
    category: "Consumer Law",
    examples: [
      "Most electronics come with a one-year manufacturer's warranty.",
      "An implied warranty guarantees that products will work for their intended purpose."
    ],
    relatedTerms: ["Consumer Protection", "Refund", "Defective Product"]
  },
  {
    id: "11",
    term: "Consumer Protection",
    definition: "Laws and regulations designed to safeguard buyers from unfair business practices, fraud, and dangerous products. These laws ensure fair treatment in the marketplace.",
    category: "Consumer Law",
    examples: [
      "Consumer protection laws require truth in advertising.",
      "The Federal Trade Commission enforces consumer protection regulations."
    ],
    relatedTerms: ["Warranty", "Fraud", "Federal Trade Commission"]
  },
  {
    id: "12",
    term: "Fraud",
    definition: "Intentional deception for personal gain or to damage another individual. In consumer contexts, it includes false advertising, identity theft, and scams.",
    category: "Consumer Law",
    examples: [
      "Selling fake products online is consumer fraud.",
      "Credit card fraud is a serious criminal offense."
    ],
    relatedTerms: ["Consumer Protection", "Deception", "Identity Theft"]
  },
  {
    id: "13",
    term: "Defamation",
    definition: "False statements that harm someone's reputation. Includes libel (written defamation) and slander (spoken defamation). Truth is a complete defense against defamation claims.",
    category: "Civil Law",
    examples: [
      "Posting false accusations on social media could be defamation.",
      "Public figures must prove actual malice to win defamation cases."
    ],
    relatedTerms: ["Libel", "Slander", "First Amendment"]
  },
  {
    id: "14",
    term: "Liability",
    definition: "Legal responsibility for one's actions or omissions. If you are liable, you may be required to pay damages or face other legal consequences.",
    category: "Civil Law",
    examples: [
      "Drivers are liable for accidents they cause through negligence.",
      "Product manufacturers can be held liable for defective products."
    ],
    relatedTerms: ["Negligence", "Damages", "Tort"]
  },
  {
    id: "15",
    term: "Miranda Rights",
    definition: "Constitutional rights that police must inform you of when placing you under arrest, including the right to remain silent and the right to an attorney.",
    category: "Criminal Law",
    examples: [
      "Police read Miranda rights: 'You have the right to remain silent...'",
      "Failure to read Miranda rights can make statements inadmissible in court."
    ],
    relatedTerms: ["Fifth Amendment", "Sixth Amendment", "Right to Counsel"]
  }
];
