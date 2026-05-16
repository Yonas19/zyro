import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your key
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function parseUserIntent(userMessage: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const systemPrompt = `
You are Zyro, an AI routing assistant. Your job is to parse the user's intent and return a strict JSON object.

RULES:
1. You MUST choose a tool from this exact list ONLY: ["slack", "notion", "unknown"]
2. If the user wants to send a message, ping the team, or announce something, use "slack".
3. If the user wants to save a task, create a ticket, or remember something, use "notion".
4. If the user asks for something outside these two tools (like checking sales), use "unknown".

Your output must be raw JSON like this:
{
  "tool": "slack",
  "action": "send_message",
  "content": "the message to send"
}
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