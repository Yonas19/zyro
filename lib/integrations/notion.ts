import { Client } from "@notionhq/client";

// Initialize the Notion Client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID || "";

export async function createNotionTask(content: string, priority: string = "Medium") {
  if (!databaseId) {
    throw new Error("Missing NOTION_DATABASE_ID in environment variables");
  }

  // Capitalize the first letter of priority to match Notion's default Select options (High, Medium, Low)
  const formattedPriority = priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        // This targets the default "Name" title column in Notion
        Name: {
          title: [
            {
              text: {
                content: content,
              },
            },
          ],
        },
        // This targets the "Priority" select column you created
        Priority: {
          select: {
            name: formattedPriority,
          },
        },
      },
    });

    console.log("✅ Successfully added to Notion!");
    return response;
  } catch (error) {
    console.error("❌ Failed to create Notion task:", error);
    throw error;
  }
}