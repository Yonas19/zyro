import { NextResponse } from 'next/server';
import { parseUserIntent } from '@/lib/ai';

export async function POST(req: Request) {
    try {
        // Parse the incoming request body
        const body = await req.json();
        const userMessage = body.message;

        if (!userMessage) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        console.log(`\n💬 Received user message: "${userMessage}"`);
        console.log(`🧠 Sending to AI Router...`);

        // Pass the message to our Gemini AI Router
        const parsedIntent = await parseUserIntent(userMessage);

        console.log(`✅ AI successfully parsed the intent:`);
        console.log(parsedIntent);

        // Return the structured JSON to the client
        return NextResponse.json({
            status: 'success',
            originalMessage: userMessage,
            intent: parsedIntent
        });

    } catch (error) {
        console.error("Webhook failed:", error);
        return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
    }
}