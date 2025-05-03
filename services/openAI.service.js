

import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


async function getProjectSummary(description) {
    const prompt = `
      You are a helpful assistant that summarizes software projects in a clear and concise way.
      
      Here is a project description:
      
      ${description}
      
      Please provide a short summary (2-3 sentences) highlighting:
      - The goal of the project
      - The technologies used
      - Any important features or functionality implemented.
      `;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'user', content: 'You are a project summarization assistant.' },
                { role: 'user', content: prompt },
            ],
            temperature: 0.5,
        });

        const summary = completion.choices[0].message.content.trim();
        return summary;
    } catch (error) {
        console.log('Error generating summary:', error.message);
        throw error;
    }
}

function generateMockSummary(description) {

    const keywords = ["ecommerce", "analytics", "cms", "crm", "iot", "devops", "dashboard", "cloud", "plugin", "deployment"];
    const techStack = ["React", "Node.js", "Express.js", "MongoDB", "Redis", "Docker", "Python", "Flask", "Vue.js", "PostgreSQL", "WebSocket", "MQTT", "PHP", "WordPress", "MySQL", "REST APIs", "Azure DevOps", "CI/CD", "Terraform"];

    const matchedKeyword = keywords.find(keyword => description.toLowerCase().includes(keyword)) || "a general topic";

    const usedTechs = techStack.filter(tech => description.includes(tech)).join(", ") || "some standard technologies";

    const summary = `Based on the description, this project likely focuses on ${matchedKeyword}. A generated summary emphasizes its potential impact on user experience using technologies like ${usedTechs}.`
    return summary;
}



export default {
    getProjectSummary,
    generateMockSummary
};