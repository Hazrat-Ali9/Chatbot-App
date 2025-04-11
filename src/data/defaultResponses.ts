export const DEFAULT_RESPONSES: Record<string, string> = {
  "What can you do?": `
      <div class="bot-message">
        <h3 class="font-bold text-lg mb-2">My Capabilities</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li>Conduct assessments across 10 life essential areas</li>
          <li>Provide personalized recommendations for improvement</li>
          <li>Analyze your responses with detailed scoring</li>
          <li>Generate comprehensive reports</li>
          <li>Track your progress over time</li>
        </ul>
        <p class="mt-2">I can help with: Health, Fitness, Nutrition, Mental Wellbeing, Productivity, Finance, Technology Awareness, Personal Development, Social Skills, and Home Management.</p>
        <p class="mt-2">Would you like to start an assessment?</p>
      </div>
    `,
  "Tell me about yourself": `
      <div class="bot-message">
        <h3 class="font-bold text-lg mb-2">About Me</h3>
        <p>I'm your Daily Life Essentials Assistant, designed to help you improve all aspects of your life through:</p>
        <ul class="list-disc pl-5 mt-1 space-y-1">
          <li>Comprehensive assessments across 10 key areas</li>
          <li>Data-driven insights and scoring</li>
          <li>Personalized action plans</li>
          <li>Evidence-based recommendations</li>
        </ul>
        <p class="mt-2">My goal is to help you optimize your daily life and build better habits.</p>
      </div>
    `,
  "How does this work?": `
      <div class="bot-message">
        <h3 class="font-bold text-lg mb-2">Assessment Process</h3>
        <ol class="list-decimal pl-5 space-y-1">
          <li>Choose from our 10 life essential topics</li>
          <li>Answer 6 multiple-choice questions per topic</li>
          <li>Receive immediate scoring (1-7) with level indicators (A/B/C/D)</li>
          <li>Get personalized recommendations</li>
          <li>Track improvements over time</li>
        </ol>
        <p class="mt-2">Each assessment gives you a clear picture of your current status and actionable steps for improvement.</p>
      </div>
    `,
  "Show me some examples": `
      <div class="bot-message">
        <h3 class="font-bold text-lg mb-2">Example Questions</h3>
        <div class="bg-slate-700/30 p-3 rounded-lg">
          <p class="font-medium">1. [Health] How would you rate your sleep quality?</p>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li><strong>D:</strong> Poor (score: 1)</li>
            <li><strong>C:</strong> Good (score: 5)</li>
            <li><strong>B:</strong> Fair (score: 3)</li>
            <li><strong>A:</strong> Excellent (score: 7)</li>
          </ul>
        </div>
        <div class="bg-slate-700/30 p-3 rounded-lg mt-2">
          <p class="font-medium">2. [Finance] How much of your income do you save?</p>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li><strong>D:</strong> Less than 10% (score: 3)</li>
            <li><strong>C:</strong> 10-20% (score: 5)</li>
            <li><strong>B:</strong> More than 20% (score: 7)</li>
            <li><strong>A:</strong> Nothing (score: 1)</li>
          </ul>
        </div>
        <div class="bg-slate-700/30 p-3 rounded-lg mt-2">
          <p class="font-medium">3. [Productivity] How do you prioritize tasks?</p>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li><strong>D:</strong> I don't prioritize (score: 1)</li>
            <li><strong>C:</strong> I make mental notes (score: 3)</li>
            <li><strong>B:</strong> I write a simple to-do list (score: 5)</li>
            <li><strong>A:</strong> Detailed prioritization system (score: 7)</li>
          </ul>
        </div>
        <p class="mt-2">Would you like to try an assessment?</p>
      </div>
    `,
  "What's new?": `
      <div class="bot-message">
        <h3 class="font-bold text-lg mb-2">Recent Updates</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li>Expanded to 10 essential life areas</li>
          <li>New comprehensive scoring system (1-7 with A-D levels)</li>
          <li>More personalized recommendations</li>
          <li>Improved progress tracking</li>
          <li>Better comparison tools</li>
        </ul>
        <p class="mt-2">Try our new assessments in Finance, Technology Awareness, Social Skills, and more!</p>
      </div>
    `,
  "What topics do you cover?": `
      <div class="bot-message">
        <h3 class="font-bold text-lg mb-2">Life Essential Topics</h3>
        <div class="grid grid-cols-2 gap-2 mt-2">
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Health</h4>
            <p class="text-sm">Physical wellbeing and medical care</p>
          </div>
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Fitness</h4>
            <p class="text-sm">Exercise and physical activity</p>
          </div>
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Nutrition</h4>
            <p class="text-sm">Diet and eating habits</p>
          </div>
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Mental Wellbeing</h4>
            <p class="text-sm">Emotional and psychological health</p>
          </div>
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Productivity</h4>
            <p class="text-sm">Time management and efficiency</p>
          </div>
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Finance</h4>
            <p class="text-sm">Money management and savings</p>
          </div>
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Technology Awareness</h4>
            <p class="text-sm">Digital literacy and security</p>
          </div>
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Personal Development</h4>
            <p class="text-sm">Skills and self-improvement</p>
          </div>
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Social Skills</h4>
            <p class="text-sm">Communication and relationships</p>
          </div>
          <div class="bg-slate-700/30 p-3 rounded-lg">
            <h4 class="font-medium">Home Management</h4>
            <p class="text-sm">Organization and household tasks</p>
          </div>
        </div>
        <p class="mt-2">Which topic would you like to explore?</p>
      </div>
    `,
};
