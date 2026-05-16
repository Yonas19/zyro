import { NextResponse } from 'next/server';
import { parseUserIntent } from '../../../lib/ai';
import { Client as NotionClient } from '@notionhq/client';
import { WebClient as SlackClient } from '@slack/web-api';
import twilio from 'twilio';

// ==========================================
// 1. NOTION SETUP
// ==========================================
const notion = new NotionClient({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID || "";

async function createNotionTask(content: string, priority: string = "Medium") {
    if (!databaseId) throw new Error("Missing NOTION_DATABASE_ID");
    const formattedPriority = priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();

    return await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            Name: { title: [{ text: { content: content } }] },
            Priority: { select: { name: formattedPriority } },
        },
    });
}

// ==========================================
// 2. SLACK SETUP
// ==========================================
const slack = new SlackClient(process.env.SLACK_BOT_TOKEN);
const slackChannelId = process.env.SLACK_CHANNEL_ID || "";

async function sendSlackMessage(content: string) {
    if (!slackChannelId) throw new Error("Missing SLACK_CHANNEL_ID");

    return await slack.chat.postMessage({
        channel: slackChannelId,
        text: `🤖 *Zyro Alert:*\n${content}`,
    });
}

// ==========================================
// 3. TWILIO (REPLY) SETUP
// ==========================================
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER || "";

async function sendWhatsAppReply(toPhone: string, message: string) {
    if (!toPhone || !twilioNumber) return;
    return await twilioClient.messages.create({
        from: twilioNumber,
        to: toPhone,
        body: message
    });
}

// ==========================================
// 4. THE MASTER ROUTER
// ==========================================
export async function POST(req: Request) {
    try {
        const contentType = req.headers.get('content-type') || '';
        let userMessage = '';
        let senderPhone = '';

        // The Traffic Cop
        if (contentType.includes('application/json')) {
            const body = await req.json();
            userMessage = body.message;
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
            const formData = await req.formData();
            userMessage = formData.get('Body') as string;
            senderPhone = formData.get('From') as string; // Grabs your exact WhatsApp number!
        }

        if (!userMessage) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        console.log(`\n💬 Received: "${userMessage}"`);

        // The Brain decides what to do
        const parsedIntent = await parseUserIntent(userMessage);
        console.log(`✅ AI Intent:`, parsedIntent);

        if (!parsedIntent) {
            return NextResponse.json({ error: 'AI parsing failed' }, { status: 500 });
        }

        // The Router executes & prepares the reply
        let replyText = "";

        if (parsedIntent.tool === 'notion') {
            console.log(`🚀 Routing to Notion...`);
            await createNotionTask(parsedIntent.content, parsedIntent.priority || "Medium");
            replyText = `✅ Done! I saved that to Notion for you.`;
        }
        else if (parsedIntent.tool === 'slack') {
            console.log(`🚀 Routing to Slack...`);
            await sendSlackMessage(parsedIntent.content);
            replyText = `✅ Sent! The team has been pinged in Slack.`;
        }
        else {
            replyText = `🤔 Hmm, I'm not sure how to do that yet. Try asking me to ping Slack or save a task!`;
        }

        // Send the text message back to your phone
        if (senderPhone) {
            await sendWhatsAppReply(senderPhone, replyText);
            console.log(`📱 Replied to user on WhatsApp!`);
        }

        return NextResponse.json({
            status: 'success',
            actionTaken: `Routed to ${parsedIntent.tool}`
        });

    } catch (error) {
        console.error("Webhook failed:", error);
        return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
    }
}