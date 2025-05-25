- The app is available at https://aspirely-career-planner.vercel.app/home
- See our demo at https://youtu.be/SgUovyRo9GU

## Inspiration
The job market is especially challenging right now — a reality that hits hard during graduation season. Many students and new grads are struggling to find a job without understanding that there are different career paths they can follow based on their strengths and skills, and career guidance is either too generic or unavailable. Because of this issue, we were inspired to create Aspirely, an AI-powered educational tool that helps users connect their experiences to future possibilities and gives them the learning resources to move forward with confidence. Aspirely isn't just a job matcher; it's a lifelong career companion, addressing a critical need: helping people find not just any job, but one that fits their niche by identifying meaningful, achievable directions they may have never considered.

## What it does
Aspirely is an AI-powered web app that transforms your resume into an interactive career mind map. We analyze your resume to identify key skills, interests, and experience, suggest tailored career pathways based on your profile, and break each pathway into career modules to make it look approachable, including role overview, suggested skills, personalized skill progress estimation, and learning resources. By clicking into each role or skill, users get a deeper understanding of what to expect and how to upskill effectively. Aspirely doesn’t just guide users in finding a direction... we support users in confidently understanding how to excel.

## How we built it
We used Next.js for frontend development, styled with Tailwind CSS, and built the mind map UI with React Flow. To parse resumes, we used OpenResume to extract text from uploaded PDFs, which we then cleaned and passed to Google Gemini’s Structured Output API. The AI returns a JSON of potential career paths and skill insights, which powers our interactive mind map. All these components were integrated into a seamless UX, with smooth transitions and interactive visuals. Besides that, we also integrate Anteater API into our app to get the list of majors we can choose from.

## Challenges we ran into
Figuring out what to use for parsing was trickier than expected: we initially considered React-pdf, but found it didn’t provide raw text extraction. So, we tried regex-only parsing but the results varied too much between resumes. Even after we decided on OpenResume, formatting variations didn’t allow us to consistently parse the resume. The overall process of reading the PDF and turning it into text took much longer than we anticipated, but we managed to bounce back and stay on track.

## Accomplishments that we're proud of
In such a short timeframe of 36 hours, we build an accessible website for all to visit. We are immensely proud of our fully working prototype, especially our growth during a high-stress nature of a hackathon. We’re proud of accomplishing flow from resume upload, generating dynamic AI-powered content tailored to each user, and designing a clean and navigable UI.

## What we learned
We learned how to work effectively with AI in such a constrained setting, especially regarding prompt engineering for consistent, structured outputs. Parsing real-world documents, like resumes, requires resilience and careful error handling to account for formatting inconsistencies. We also found that great UX is key in wrapping these complex features into an approachable and intuitive space for users. Finally, of course, the hackathon used time to pressure us, forcing us to scope and prioritize essential tasks so we could deliver a functional product we enjoyed creating.

## What's next for Aspirely
We hope to expand this application with user accounts, long-term goal tracking, more supported file types, and more advanced AI models. Our vision is for Aspirely to grow into a comprehensive career exploration and development platform, personalized and accessible to every user who visits our application.

