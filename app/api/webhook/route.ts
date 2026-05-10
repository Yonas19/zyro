import { NextResponse } from 'next/server';
import { parseUserIntent } from '../../../lib/ai';
import { Client as NotionClient } from '@notionhq/client';
import { WebClient as SlackClient } from '@slack/web-api';

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
// 3. THE MASTER ROUTER
// ==========================================
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userMessage = body.message;

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

        // The Router executes the action
        if (parsedIntent.tool === 'notion') {
            console.log(`🚀 Routing to Notion...`);
            await createNotionTask(parsedIntent.content, parsedIntent.priority || "Medium");
            console.log(`✅ Task added to Notion!`);
        }
        else if (parsedIntent.tool === 'slack') {
            console.log(`🚀 Routing to Slack...`);
            await sendSlackMessage(parsedIntent.content);
            console.log(`✅ Message sent to Slack!`);
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