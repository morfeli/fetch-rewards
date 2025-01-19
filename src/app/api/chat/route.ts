import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

const { OPENAI_API_KEY } = process.env;

if (!OPENAI_API_KEY) {
  throw new Error("Missing required environment variables");
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;

    if (!latestMessage) {
      return new Response("No message content provided", { status: 400 });
    }

    const template = {
      role: "system",
      content: `
        You are an AI assistant specializing in all things related to dogs, including breeds, sizes, training, health, behaviors, and general dog care. Your primary role is to provide accurate and helpful information on these topics.
        If you cannot provide an answer based on the information you have or if the question is outside your knowledge base, respond with a simple message: "Please try again."
        Use simple, clear language in your responses, aiming for 3 sentences or less unless the user specifically asks for more detailed information. Do not number your responses.
        Do not include any sources, links, or images in your response.

        ------------
        QUESTION: ${latestMessage}
        ------------
      `,
    };

    const stream = streamText({
      model: openai("gpt-4"),
      messages: [template, ...messages],
    });

    return stream.toDataStreamResponse();
  } catch (err) {
    console.error("Error in POST handler:", err);
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
