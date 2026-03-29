export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  scenario: string;
  actions: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Defective Smartphone Purchase",
    category: "Consumer Rights",
    scenario: "You purchased a brand-new smartphone from an electronics store two weeks ago. The phone keeps freezing and shutting down randomly, making it impossible to use. You have the receipt and the phone is still under the manufacturer's 1-year warranty. The store refuses to exchange it, saying 'all sales are final.'",
    actions: [
      {
        text: "Accept the store's decision and keep the defective phone",
        isCorrect: false,
        feedback: "This is not the best option. You have consumer rights that protect you from defective products, especially when they're under warranty. Accepting a defective product means you're not exercising your legal rights."
      },
      {
        text: "Demand a refund or exchange based on warranty rights",
        isCorrect: true,
        feedback: "Correct! The manufacturer's warranty guarantees that the product will work as intended. You have the legal right to request a repair, replacement, or refund for a defective product under warranty. The store's 'all sales final' policy cannot override warranty protections."
      },
      {
        text: "Post negative reviews online and give up",
        isCorrect: false,
        feedback: "While you have the right to share your experience online, this alone doesn't resolve your problem. You should first pursue your legal remedies through the warranty and consumer protection laws before resorting only to public complaints."
      },
      {
        text: "Threaten legal action without attempting resolution",
        isCorrect: false,
        feedback: "Jumping straight to legal threats is premature. The proper first step is to formally request a remedy under the warranty. Most disputes can be resolved through proper channels before needing to involve courts."
      }
    ]
  },
  {
    id: "2",
    title: "School Locker Search Incident",
    category: "Fourth Amendment Rights",
    scenario: "A school administrator suspects that a student has brought prohibited items to school. Without any specific evidence or informing the student, the administrator opens and searches the student's locker while the student is in class. The administrator finds nothing illegal but discovers the student's personal diary.",
    actions: [
      {
        text: "The search was illegal because students have full privacy rights at school",
        isCorrect: false,
        feedback: "While students do have some privacy rights, these rights are more limited in school settings. Schools can conduct searches with 'reasonable suspicion' rather than the higher standard of 'probable cause' required in other contexts."
      },
      {
        text: "The search was legal because school lockers are school property",
        isCorrect: true,
        feedback: "Correct! Courts have generally held that school officials can search lockers with reasonable suspicion that school rules or laws are being violated. Schools maintain ownership of lockers and can establish policies about searches. However, the search should still be reasonable in scope."
      },
      {
        text: "The search was illegal because no warrant was obtained",
        isCorrect: false,
        feedback: "School officials typically don't need a warrant to search school property like lockers. They need 'reasonable suspicion' - a lower standard than the 'probable cause' required for police searches. Schools have special authority to maintain safety and order."
      },
      {
        text: "The administrator should be arrested for violating the student's rights",
        isCorrect: false,
        feedback: "This is an extreme overreaction. School searches conducted with reasonable suspicion are generally legal. If there were concerns about the search's legality, the proper recourse would be through school policies or civil complaints, not criminal charges."
      }
    ]
  },
  {
    id: "3",
    title: "Social Media Post About School",
    category: "First Amendment Rights",
    scenario: "A high school student creates a satirical video criticizing school lunch quality and posts it on social media over the weekend from home. The video goes viral among students. On Monday, the principal suspends the student for three days, claiming the post was 'disruptive and disrespectful to school staff.'",
    actions: [
      {
        text: "The suspension is justified because students must respect school authority at all times",
        isCorrect: false,
        feedback: "While respect is important, the First Amendment protects students' right to free speech, including criticism of school policies. The fact that the speech occurred off-campus and outside school hours strengthens the student's free speech protection."
      },
      {
        text: "The student's free speech rights likely protect this expression",
        isCorrect: true,
        feedback: "Correct! The Supreme Court has held that students don't 'shed their constitutional rights to freedom of speech at the schoolhouse gate.' Off-campus speech is generally more protected than on-campus speech. Unless the speech causes substantial disruption to school operations, it's likely protected. Criticism and satire about school policies are forms of protected speech."
      },
      {
        text: "Schools can punish any speech they find offensive or critical",
        isCorrect: false,
        feedback: "This is incorrect. Schools cannot punish speech simply because they find it offensive or critical. There must be evidence that the speech causes or is likely to cause substantial disruption to school activities. Student speech rights are constitutionally protected."
      },
      {
        text: "The student should delete the video to avoid further punishment",
        isCorrect: false,
        feedback: "While deleting the video might reduce conflict, it doesn't address whether the suspension was legal. If the speech is protected by the First Amendment, the student has the right to leave it posted and could challenge the suspension through appropriate channels."
      }
    ]
  },
  {
    id: "4",
    title: "Police Stop and Question",
    category: "Fifth Amendment Rights",
    scenario: "While walking home from school, a student is stopped by police who ask questions about a nearby incident. The student had nothing to do with the incident but the officer insists on getting answers and says 'refusing to talk makes you look guilty.'",
    actions: [
      {
        text: "You must answer all police questions or risk arrest",
        isCorrect: false,
        feedback: "This is incorrect. The Fifth Amendment protects your right against self-incrimination. You generally have the right to remain silent when questioned by police. While you may need to identify yourself in some jurisdictions, you're not required to answer other questions."
      },
      {
        text: "Politely state you wish to remain silent and want a parent/lawyer present",
        isCorrect: true,
        feedback: "Correct! This is the best approach. You have the constitutional right to remain silent under the Fifth Amendment and the right to have an attorney present during questioning under the Sixth Amendment. For minors, requesting a parent or guardian is also advisable. Being polite while asserting your rights is the professional approach."
      },
      {
        text: "Run away from the police officer",
        isCorrect: false,
        feedback: "Running away from police is dangerous and could lead to charges like obstruction or resisting arrest. It may also give officers reasonable suspicion to detain you. The proper way to handle the situation is to stay calm, be respectful, and clearly assert your constitutional rights."
      },
      {
        text: "Make up a story to satisfy the officer's questions",
        isCorrect: false,
        feedback: "Never lie to police! Providing false information to law enforcement is a crime. If you choose to speak to police, you must be truthful. If you're uncomfortable answering questions, exercise your right to remain silent instead."
      }
    ]
  },
  {
    id: "5",
    title: "Online Purchase Dispute",
    category: "Consumer Rights",
    scenario: "You ordered a laptop online for $800. When it arrives, it's a completely different, cheaper model worth about $300. The website shows 'no returns' policy. The seller claims they sent the correct item and won't respond to your emails.",
    actions: [
      {
        text: "Accept the loss because the website said 'no returns'",
        isCorrect: false,
        feedback: "A 'no returns' policy doesn't apply when the seller fails to deliver what was purchased. This is a breach of contract and potentially fraud. Consumer protection laws protect you from bait-and-switch tactics."
      },
      {
        text: "Dispute the charge with your credit card company",
        isCorrect: true,
        feedback: "Correct! This is called a chargeback and is one of your strongest consumer protections. Credit card companies have procedures to investigate disputes where you didn't receive what you paid for. Document everything: the order, what arrived, and your attempts to resolve it. You may also file a complaint with the FTC or your state's consumer protection office."
      },
      {
        text: "Threaten the seller with physical harm",
        isCorrect: false,
        feedback: "Absolutely not! Threats of violence are illegal and can result in criminal charges against you. Always pursue legal remedies through proper channels, such as chargebacks, consumer protection agencies, or small claims court."
      },
      {
        text: "Keep the laptop and stop paying your credit card bill",
        isCorrect: false,
        feedback: "Stopping payment on your credit card bill damages your credit score and doesn't resolve the issue with the seller. Instead, use the proper dispute process with your credit card company to challenge the specific charge."
      }
    ]
  },
  {
    id: "6",
    title: "Witness to Bullying",
    category: "Legal and Ethical Responsibilities",
    scenario: "You witness another student being physically bullied in the school hallway. The victim is clearly hurt and distressed. No teachers are immediately present, and other students are just walking by without helping.",
    actions: [
      {
        text: "Ignore it because it's not your problem",
        isCorrect: false,
        feedback: "While you may not have a legal duty to intervene in most situations, standing by when someone is being hurt raises serious ethical concerns. Many states have laws against bullying, and schools have policies requiring reporting. Bystander intervention can make a significant difference."
      },
      {
        text: "Immediately report it to a teacher, administrator, or school resource officer",
        isCorrect: true,
        feedback: "Correct! This is the safest and most effective response. School officials have the authority and responsibility to address bullying. Most schools have anti-bullying policies and legal obligations to protect students. Your report can help the victim get assistance and prevent future incidents. If you feel safe doing so, you could also check on the victim while waiting for help."
      },
      {
        text: "Physically fight the bully yourself",
        isCorrect: false,
        feedback: "While the impulse to help is admirable, physically confronting the bully could escalate the violence, get you hurt, or result in disciplinary action against you. The appropriate response is to get adult help immediately and, if safe, verbally intervene or help the victim move to safety."
      },
      {
        text: "Record it on your phone and post it on social media",
        isCorrect: false,
        feedback: "While documenting evidence might seem helpful, posting bullying incidents on social media can further humiliate the victim and may violate privacy laws or school policies. The priority should be stopping the bullying and getting help, not creating viral content. If you record evidence, share it with school officials, not social media."
      }
    ]
  }
];
