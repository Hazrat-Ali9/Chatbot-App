export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
    level: "A" | "B" | "C" | "D";
  }[];
}

export const TOPICS = [
  "Health",
  "Fitness",
  "Nutrition",
  "Mental Wellbeing",
  "Productivity",
  "Finance",
  "Technology Awareness",
  "Personal Development",
  "Social Skills",
  "Home Management",
] as const;

export const QUESTIONS: Record<string, Question[]> = {
  Health: [
    {
      id: 1,
      text: "How often do you exercise?",
      options: [
        { text: "Never", score: 2, level: "A" },
        { text: "1-2 times/week", score: 5, level: "B" },
        { text: "3-4 times/week", score: 3, level: "C" },
        { text: "Daily", score: 7, level: "D" },
      ],
    },
    {
      id: 2,
      text: "How would you rate your sleep quality?",
      options: [
        { text: "Poor", score: 1, level: "A" },
        { text: "Fair", score: 4, level: "B" },
        { text: "Good", score: 6, level: "C" },
        { text: "Excellent", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "How often do you go for medical checkups?",
      options: [
        { text: "Never", score: 2, level: "A" },
        { text: "Rarely", score: 5, level: "B" },
        { text: "Once a year", score: 3, level: "C" },
        { text: "Every 6 months", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "How much water do you drink daily?",
      options: [
        { text: "Less than 1L", score: 1, level: "A" },
        { text: "1-2L", score: 4, level: "B" },
        { text: "2-3L", score: 6, level: "C" },
        { text: "3L+", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "Do you have any chronic illnesses?",
      options: [
        { text: "Yes, multiple", score: 2, level: "A" },
        { text: "Yes, but managed", score: 5, level: "B" },
        { text: "No, but some risk factors", score: 3, level: "C" },
        { text: "No, I'm completely healthy", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How often do you experience headaches?",
      options: [
        { text: "Daily", score: 1, level: "A" },
        { text: "Few times a week", score: 4, level: "B" },
        { text: "Occasionally", score: 6, level: "C" },
        { text: "Rarely or never", score: 3, level: "D" },
      ],
    },
  ],
  Fitness: [
    {
      id: 1,
      text: "How intense are your workouts?",
      options: [
        { text: "Light (walking, stretching)", score: 2, level: "A" },
        { text: "Moderate (jogging, cycling)", score: 5, level: "B" },
        { text: "Vigorous (running, HIIT)", score: 3, level: "C" },
        { text: "Very intense (competitive sports)", score: 7, level: "D" },
      ],
    },
    {
      id: 2,
      text: "How often do you engage in strength training?",
      options: [
        { text: "Never", score: 1, level: "A" },
        { text: "Once a week", score: 4, level: "B" },
        { text: "Twice a week", score: 6, level: "C" },
        { text: "Three or more times a week", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "How do you track your fitness progress?",
      options: [
        { text: "I don't track", score: 2, level: "A" },
        { text: "I track occasionally", score: 5, level: "B" },
        { text: "I track regularly", score: 3, level: "C" },
        { text: "I use detailed metrics and logs", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "What's your main fitness goal?",
      options: [
        { text: "Weight loss", score: 1, level: "A" },
        { text: "Muscle gain", score: 4, level: "B" },
        { text: "General health", score: 6, level: "C" },
        { text: "Athletic performance", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "How do you warm up before workouts?",
      options: [
        { text: "I don't warm up", score: 2, level: "A" },
        { text: "A quick stretch", score: 5, level: "B" },
        { text: "5-10 mins dynamic stretching", score: 3, level: "C" },
        { text: "A structured warm-up routine", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How do you recover after exercise?",
      options: [
        { text: "I don't do anything", score: 1, level: "A" },
        { text: "Some light stretching", score: 4, level: "B" },
        { text: "Proper cooldown and hydration", score: 6, level: "C" },
        { text: "Full recovery routine", score: 3, level: "D" },
      ],
    },
  ],
  Nutrition: [
    {
      id: 1,
      text: "How many servings of fruits/vegetables do you eat daily?",
      options: [
        { text: "0-1 servings", score: 2, level: "A" },
        { text: "2-3 servings", score: 5, level: "B" },
        { text: "4-5 servings", score: 3, level: "C" },
        { text: "5+ servings", score: 7, level: "D" },
      ],
    },
    {
      id: 2,
      text: "How often do you consume processed foods?",
      options: [
        { text: "Daily", score: 1, level: "A" },
        { text: "Several times a week", score: 4, level: "B" },
        { text: "Occasionally", score: 6, level: "C" },
        { text: "Rarely or never", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "How would you describe your portion sizes?",
      options: [
        { text: "Much larger than recommended", score: 2, level: "A" },
        { text: "Slightly larger than recommended", score: 5, level: "B" },
        { text: "Appropriate for my needs", score: 3, level: "C" },
        { text: "Carefully measured", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "How often do you eat meals mindfully?",
      options: [
        { text: "Never", score: 1, level: "A" },
        { text: "Rarely", score: 4, level: "B" },
        { text: "Sometimes", score: 6, level: "C" },
        { text: "Always", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "How do you plan your meals?",
      options: [
        { text: "I don't plan", score: 2, level: "A" },
        { text: "I plan a day ahead", score: 5, level: "B" },
        { text: "I plan weekly meals", score: 3, level: "C" },
        { text: "Structured nutrition plan", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How often do you consume sugary drinks?",
      options: [
        { text: "Daily", score: 1, level: "A" },
        { text: "Several times a week", score: 4, level: "B" },
        { text: "Occasionally", score: 6, level: "C" },
        { text: "Rarely or never", score: 3, level: "D" },
      ],
    },
  ],
  "Mental Wellbeing": [
    {
      id: 1,
      text: "How often do you practice stress-reduction techniques?",
      options: [
        { text: "Never", score: 2, level: "A" },
        { text: "Occasionally when stressed", score: 5, level: "B" },
        { text: "Regularly (1-2 times/week)", score: 3, level: "C" },
        { text: "Daily", score: 7, level: "D" },
      ],
    },
    {
      id: 2,
      text: "How would you rate your overall stress level?",
      options: [
        { text: "Extremely high", score: 1, level: "A" },
        { text: "Moderately high", score: 4, level: "B" },
        { text: "Manageable", score: 6, level: "C" },
        { text: "Very low", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "How often do you take time for self-reflection?",
      options: [
        { text: "Never", score: 2, level: "A" },
        { text: "Rarely", score: 5, level: "B" },
        { text: "Weekly", score: 3, level: "C" },
        { text: "Daily", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "How would you describe your work-life balance?",
      options: [
        { text: "Poor (work dominates)", score: 1, level: "A" },
        { text: "Fair (often unbalanced)", score: 4, level: "B" },
        { text: "Good (mostly balanced)", score: 6, level: "C" },
        { text: "Excellent (perfect balance)", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "How often do you engage in activities purely for enjoyment?",
      options: [
        { text: "Rarely or never", score: 2, level: "A" },
        { text: "Once a month", score: 5, level: "B" },
        { text: "Once a week", score: 3, level: "C" },
        { text: "Daily or almost daily", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How comfortable are you with expressing your emotions?",
      options: [
        { text: "Very uncomfortable", score: 1, level: "A" },
        { text: "Somewhat uncomfortable", score: 4, level: "B" },
        { text: "Somewhat comfortable", score: 6, level: "C" },
        { text: "Very comfortable", score: 3, level: "D" },
      ],
    },
  ],
  Productivity: [
    {
      id: 1,
      text: "How do you prioritize your daily tasks?",
      options: [
        { text: "I don't prioritize", score: 2, level: "A" },
        { text: "I make mental notes", score: 5, level: "B" },
        { text: "I write a simple to-do list", score: 3, level: "C" },
        {
          text: "I use a detailed prioritization system",
          score: 7,
          level: "D",
        },
      ],
    },
    {
      id: 2,
      text: "How often do you get distracted during work?",
      options: [
        { text: "Constantly", score: 1, level: "A" },
        { text: "Several times an hour", score: 4, level: "B" },
        { text: "A few times a day", score: 6, level: "C" },
        { text: "Rarely", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "How do you manage your time?",
      options: [
        { text: "I don't plan my time", score: 2, level: "A" },
        { text: "I have a rough schedule", score: 5, level: "B" },
        { text: "I follow a structured schedule", score: 3, level: "C" },
        { text: "I use time-blocking techniques", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "How often do you meet deadlines?",
      options: [
        { text: "Often miss deadlines", score: 1, level: "A" },
        { text: "Sometimes meet deadlines", score: 4, level: "B" },
        { text: "Usually meet deadlines", score: 6, level: "C" },
        { text: "Always meet or beat deadlines", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "How do you handle interruptions?",
      options: [
        { text: "They derail my whole day", score: 2, level: "A" },
        { text: "I struggle to refocus", score: 5, level: "B" },
        { text: "I handle them and return to work", score: 3, level: "C" },
        { text: "I have systems to minimize impact", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How often do you review and adjust your productivity systems?",
      options: [
        { text: "Never", score: 1, level: "A" },
        { text: "Rarely", score: 4, level: "B" },
        { text: "Monthly", score: 6, level: "C" },
        { text: "Weekly", score: 3, level: "D" },
      ],
    },
  ],
  Finance: [
    {
      id: 1,
      text: "How do you track your expenses?",
      options: [
        { text: "I don't track", score: 2, level: "A" },
        { text: "I check bank statements occasionally", score: 5, level: "B" },
        { text: "I use a budgeting app", score: 3, level: "C" },
        { text: "I track every expense meticulously", score: 7, level: "D" },
      ],
    },
    {
      id: 2,
      text: "How much of your income do you save?",
      options: [
        { text: "Nothing", score: 1, level: "A" },
        { text: "Less than 10%", score: 4, level: "B" },
        { text: "10-20%", score: 6, level: "C" },
        { text: "More than 20%", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "Do you have an emergency fund?",
      options: [
        { text: "No", score: 2, level: "A" },
        { text: "Less than 1 month expenses", score: 5, level: "B" },
        { text: "3-6 months expenses", score: 3, level: "C" },
        { text: "6+ months expenses", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "How do you invest your money?",
      options: [
        { text: "I don't invest", score: 1, level: "A" },
        { text: "Only in savings accounts", score: 4, level: "B" },
        { text: "In some diversified investments", score: 6, level: "C" },
        { text: "Comprehensive investment portfolio", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "How often do you review your financial goals?",
      options: [
        { text: "Never", score: 2, level: "A" },
        { text: "Yearly", score: 5, level: "B" },
        { text: "Quarterly", score: 3, level: "C" },
        { text: "Monthly", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How much debt do you have?",
      options: [
        { text: "Significant unmanageable debt", score: 1, level: "A" },
        { text: "Some debt but manageable", score: 4, level: "B" },
        { text: "Little to no debt", score: 6, level: "C" },
        { text: "No debt and assets", score: 3, level: "D" },
      ],
    },
  ],
  "Technology Awareness": [
    {
      id: 1,
      text: "How do you stay updated with technology trends?",
      options: [
        { text: "I don't follow tech news", score: 2, level: "A" },
        { text: "I occasionally read articles", score: 5, level: "B" },
        { text: "I follow specific tech news sources", score: 3, level: "C" },
        { text: "I actively research and study trends", score: 7, level: "D" },
      ],
    },
    {
      id: 2,
      text: "How comfortable are you with learning new software?",
      options: [
        { text: "Very uncomfortable", score: 1, level: "A" },
        { text: "Somewhat uncomfortable", score: 4, level: "B" },
        { text: "Fairly comfortable", score: 6, level: "C" },
        { text: "Very comfortable", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "How do you protect your online privacy?",
      options: [
        { text: "I don't take any measures", score: 2, level: "A" },
        { text: "Basic measures like passwords", score: 5, level: "B" },
        { text: "Use of VPN and 2FA", score: 3, level: "C" },
        { text: "Comprehensive security practices", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "How often do you update your devices and software?",
      options: [
        { text: "Never", score: 1, level: "A" },
        { text: "Only when forced to", score: 4, level: "B" },
        { text: "Within a month of release", score: 6, level: "C" },
        { text: "Immediately when available", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "How would you rate your digital literacy?",
      options: [
        { text: "Below average", score: 2, level: "A" },
        { text: "Average", score: 5, level: "B" },
        { text: "Above average", score: 3, level: "C" },
        { text: "Expert", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How do you approach learning new technologies?",
      options: [
        { text: "Avoid it if possible", score: 1, level: "A" },
        { text: "Learn only when necessary", score: 4, level: "B" },
        { text: "Proactively learn relevant tech", score: 6, level: "C" },
        { text: "Constantly learning new technologies", score: 3, level: "D" },
      ],
    },
  ],
  "Personal Development": [
    {
      id: 1,
      text: "How often do you set personal growth goals?",
      options: [
        { text: "Never", score: 2, level: "A" },
        { text: "Occasionally", score: 5, level: "B" },
        { text: "Yearly", score: 3, level: "C" },
        { text: "Quarterly or more often", score: 7, level: "D" },
      ],
    },
    {
      id: 2,
      text: "How do you track your personal development?",
      options: [
        { text: "I don't track it", score: 1, level: "A" },
        { text: "Mental notes", score: 4, level: "B" },
        { text: "Journal occasionally", score: 6, level: "C" },
        { text: "Regular journaling and metrics", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "How many books do you read for personal growth annually?",
      options: [
        { text: "0", score: 2, level: "A" },
        { text: "1-2", score: 5, level: "B" },
        { text: "3-5", score: 3, level: "C" },
        { text: "6+", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "How often do you step outside your comfort zone?",
      options: [
        { text: "Rarely or never", score: 1, level: "A" },
        { text: "Occasionally", score: 4, level: "B" },
        { text: "Regularly", score: 6, level: "C" },
        { text: "Constantly", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "How do you seek feedback on your personal growth?",
      options: [
        { text: "I don't seek feedback", score: 2, level: "A" },
        { text: "From close friends/family", score: 5, level: "B" },
        { text: "From mentors or coaches", score: 3, level: "C" },
        { text: "Through structured feedback systems", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How much time do you dedicate to personal development weekly?",
      options: [
        { text: "0 hours", score: 1, level: "A" },
        { text: "Less than 1 hour", score: 4, level: "B" },
        { text: "1-3 hours", score: 6, level: "C" },
        { text: "3+ hours", score: 3, level: "D" },
      ],
    },
  ],
  "Social Skills": [
    {
      id: 1,
      text: "How comfortable are you in social situations?",
      options: [
        { text: "Very uncomfortable", score: 2, level: "A" },
        { text: "Somewhat uncomfortable", score: 5, level: "B" },
        { text: "Comfortable", score: 3, level: "C" },
        { text: "Very comfortable", score: 7, level: "D" },
      ],
    },
    {
      id: 2,
      text: "How would you rate your active listening skills?",
      options: [
        { text: "Poor", score: 1, level: "A" },
        { text: "Fair", score: 4, level: "B" },
        { text: "Good", score: 6, level: "C" },
        { text: "Excellent", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "How often do you initiate social interactions?",
      options: [
        { text: "Never", score: 2, level: "A" },
        { text: "Rarely", score: 5, level: "B" },
        { text: "Sometimes", score: 3, level: "C" },
        { text: "Often", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "How do you handle conflicts in relationships?",
      options: [
        { text: "Avoid them completely", score: 1, level: "A" },
        { text: "Struggle to handle them", score: 4, level: "B" },
        { text: "Handle them reasonably well", score: 6, level: "C" },
        { text: "Resolve them constructively", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "How aware are you of social cues?",
      options: [
        { text: "Often miss them", score: 2, level: "A" },
        { text: "Sometimes notice them", score: 5, level: "B" },
        { text: "Usually notice them", score: 3, level: "C" },
        { text: "Highly attuned to them", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How would you rate your empathy towards others?",
      options: [
        { text: "Low", score: 1, level: "A" },
        { text: "Somewhat low", score: 4, level: "B" },
        { text: "Moderate", score: 6, level: "C" },
        { text: "High", score: 3, level: "D" },
      ],
    },
  ],
  "Home Management": [
    {
      id: 1,
      text: "How organized is your living space?",
      options: [
        { text: "Very disorganized", score: 2, level: "A" },
        { text: "Somewhat disorganized", score: 5, level: "B" },
        { text: "Fairly organized", score: 3, level: "C" },
        { text: "Very organized", score: 7, level: "D" },
      ],
    },
    {
      id: 2,
      text: "How often do you clean your home?",
      options: [
        { text: "Rarely or never", score: 1, level: "A" },
        { text: "Only when obviously dirty", score: 4, level: "B" },
        { text: "Weekly", score: 6, level: "C" },
        { text: "Daily or every few days", score: 3, level: "D" },
      ],
    },
    {
      id: 3,
      text: "How do you manage household chores?",
      options: [
        { text: "No system", score: 2, level: "A" },
        { text: "Do them when I notice", score: 5, level: "B" },
        { text: "Basic schedule", score: 3, level: "C" },
        { text: "Detailed schedule/system", score: 7, level: "D" },
      ],
    },
    {
      id: 4,
      text: "How would you rate your meal planning and preparation?",
      options: [
        { text: "No planning, eat out often", score: 1, level: "A" },
        { text: "Some planning but inconsistent", score: 4, level: "B" },
        { text: "Regular home cooking", score: 6, level: "C" },
        { text: "Well-planned meals weekly", score: 3, level: "D" },
      ],
    },
    {
      id: 5,
      text: "How do you handle home maintenance tasks?",
      options: [
        { text: "Ignore until they become problems", score: 2, level: "A" },
        { text: "Address when noticed", score: 5, level: "B" },
        { text: "Regular maintenance", score: 3, level: "C" },
        { text: "Preventive maintenance schedule", score: 7, level: "D" },
      ],
    },
    {
      id: 6,
      text: "How would you describe your home environment?",
      options: [
        { text: "Chaotic and stressful", score: 1, level: "A" },
        { text: "Somewhat disorganized", score: 4, level: "B" },
        { text: "Generally peaceful", score: 6, level: "C" },
        { text: "Very peaceful and welcoming", score: 3, level: "D" },
      ],
    },
  ],
};
