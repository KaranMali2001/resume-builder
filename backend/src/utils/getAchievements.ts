import { ai } from '@/config/gemini';

export async function getAchievements(course: any) {
  const prompt = `
    You are a professional resume assistant.
    
    Based on the following course information:
    - Course Title: ${course.title}
    - Course Skills: ${course.skills?.join(', ') || 'Not specified'}
    - Course Modules: ${
      course.modules?.map((m: any) => m.title).join(', ') || 'Not specified'
    }
    
    Your task:
    Generate exactly 3 strong, and GIVE ME THREE RELEVENT SKILLS resume-ready bullet points that highlight the skills, tools, and practical outcomes learned in the course. Each point should reflect a clear technical or professional competency.
    
    Rules:
    - Each bullet point must start with a strong action verb (e.g., Built, Developed, Implemented, Integrated, Designed).
    - Keep the tone formal and concise — suitable for a technical resume.
    - Focus on outcomes, technologies used, and skills gained.
    - DO NOT mention "student", "course", "I", "learner", or similar terms.
    - DO NOT include introductory or explanatory text.
    - DO NOT use markdown, quotes, or any formatting outside JSON.
    
    Format strictly as:
    {
      "bulletPoints": [
        "Bullet point 1",
        "Bullet point 2",
        "Bullet point 3"
      ],
      "skills": [
        "Skill 1",
        "Skill 2",
        "Skill 3"
      ]
    }
    ONLY return valid JSON in the format above.
    `;

  const result = await ai.models.generateContent({
    contents: prompt,
    model: 'gemini-2.5-flash',
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          bulletPoints: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        required: ['bulletPoints'],
      },
    },
  });
  return result.text;
}
