export interface LegalTerm {
  term: string;
  definition: string;
}

export interface Lesson {
  id: string;
  title: string;
  module: string;
  content: {
    paragraphs: string[];
    terms: LegalTerm[];
  };
  comprehension: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Introduction to Constitutional Rights",
    module: "Constitutional Law",
    content: {
      paragraphs: [
        "The Constitution of the United States establishes the fundamental framework of our government and guarantees certain basic rights to all citizens. These rights are designed to protect individuals from government overreach and ensure fairness in legal proceedings.",
        "The Bill of Rights, comprising the first ten amendments to the Constitution, outlines specific protections for individual liberties. These include freedom of speech, religion, and assembly, as well as the right to due process and equal protection under the law.",
        "Understanding constitutional rights is essential for every citizen. These rights form the foundation of our democratic system and ensure that all individuals are treated fairly under the law, regardless of their background or circumstances."
      ],
      terms: [
        {
          term: "Constitution",
          definition: "The supreme law of the United States that establishes the structure of government and protects individual rights"
        },
        {
          term: "Bill of Rights",
          definition: "The first ten amendments to the Constitution that guarantee specific rights and freedoms to individuals"
        },
        {
          term: "Due Process",
          definition: "The legal requirement that the government must respect all legal rights owed to a person according to law"
        },
        {
          term: "Equal Protection",
          definition: "The guarantee that all people must be treated equally by the law and government"
        }
      ]
    },
    comprehension: {
      question: "What is the primary purpose of the Bill of Rights?",
      options: [
        "To establish the three branches of government",
        "To protect individual liberties and limit government power",
        "To create laws for criminal behavior",
        "To define the duties of citizens"
      ],
      correctAnswer: 1,
      explanation: "The Bill of Rights was specifically designed to protect individual liberties and limit government power by guaranteeing fundamental rights such as freedom of speech, religion, and due process."
    }
  },
  {
    id: "2",
    title: "Freedom of Speech and Expression",
    module: "First Amendment",
    content: {
      paragraphs: [
        "The First Amendment to the United States Constitution protects several fundamental freedoms, with freedom of speech being one of the most celebrated. This protection allows individuals to express their opinions, ideas, and beliefs without fear of government censorship or punishment.",
        "However, freedom of speech is not absolute. The Supreme Court has recognized certain limitations, such as speech that incites immediate violence, constitutes defamation, or creates a clear and present danger. Schools also have some authority to regulate student speech in certain contexts.",
        "Understanding the scope and limits of free speech is crucial for young citizens. While you have the right to express controversial or unpopular opinions, this right comes with the responsibility to respect the rights of others and understand when speech may cross legal boundaries."
      ],
      terms: [
        {
          term: "First Amendment",
          definition: "Constitutional protection for freedom of speech, religion, press, assembly, and petition"
        },
        {
          term: "Censorship",
          definition: "The suppression or prohibition of speech or writing deemed objectionable by the government or other authorities"
        },
        {
          term: "Defamation",
          definition: "False statements that harm someone's reputation; includes both libel (written) and slander (spoken)"
        },
        {
          term: "Clear and Present Danger",
          definition: "A legal standard that allows government to limit speech if it poses an immediate threat to public safety"
        }
      ]
    },
    comprehension: {
      question: "According to the passage, which statement about freedom of speech is TRUE?",
      options: [
        "Freedom of speech is completely unlimited in all circumstances",
        "Schools have no authority to regulate student speech",
        "Speech that incites immediate violence may be restricted",
        "Only popular opinions are protected by the First Amendment"
      ],
      correctAnswer: 2,
      explanation: "While freedom of speech is a fundamental right, it is not absolute. The Supreme Court has recognized that speech inciting immediate violence, among other limited categories, may be restricted to protect public safety."
    }
  },
  {
    id: "3",
    title: "Consumer Rights and Responsibilities",
    module: "Consumer Law",
    content: {
      paragraphs: [
        "As a consumer, you have important legal rights when you purchase goods or services. Consumer protection laws exist to ensure fair business practices and protect buyers from fraud, deception, and unfair treatment by sellers.",
        "Key consumer rights include the right to receive accurate information about products, the right to safe products, the right to choose among competing products, and the right to seek redress when problems occur. Many purchases also come with warranties that guarantee certain standards of quality and performance.",
        "Understanding your rights as a consumer empowers you to make informed decisions and take action when those rights are violated. Whether you're buying a phone, ordering food, or making an online purchase, knowing what protections exist can help you navigate the marketplace confidently."
      ],
      terms: [
        {
          term: "Consumer Protection",
          definition: "Laws and regulations designed to safeguard buyers from unfair business practices"
        },
        {
          term: "Warranty",
          definition: "A guarantee from a seller that a product will meet certain standards of quality and performance"
        },
        {
          term: "Fraud",
          definition: "Intentional deception for personal gain or to damage another individual"
        },
        {
          term: "Redress",
          definition: "Compensation or remedy for a wrong or grievance"
        }
      ]
    },
    comprehension: {
      question: "What is the main purpose of consumer protection laws?",
      options: [
        "To help businesses make more profit",
        "To ensure fair business practices and protect buyers from unfair treatment",
        "To prevent people from returning purchased items",
        "To increase the price of consumer goods"
      ],
      correctAnswer: 1,
      explanation: "Consumer protection laws are specifically designed to ensure fair business practices and protect buyers from fraud, deception, and unfair treatment by sellers, giving consumers important legal rights in the marketplace."
    }
  }
];
