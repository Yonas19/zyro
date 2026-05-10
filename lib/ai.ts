import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your key
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function parseUserIntent(userMessage: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `
      You are the core routing engine for 'Zyro', an operations automation tool.
      The user will send a natural language message. Your job is to extract the intent and return a STRICT JSON object.
      
      Determine the 'tool' (e.g., 'notion', 'slack', 'jira').
      Determine the 'action' (e.g., 'create_task', 'send_message', 'read_data').
      Extract the core 'content' or payload.
      
      Return ONLY valid JSON. No markdown formatting, no backticks, no explanations.
      
      Example Input: "Add a high priority task to Notion to review the Q3 budget"
      Example Output: {"tool": "notion", "action": "create_task", "content": "Review the Q3 budget", "priority": "high"}
    `;

        const fullPrompt = `${systemPrompt}\n\nUser Message: "${userMessage}"`;

        const result = await model.generateContent(fullPrompt);
        const responseText = result.response.text().trim();

        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "");

        return JSON.parse(cleanJson);

    } catch (error) {
        console.error("AI Routing Error:", error);
        return null;
    }
}