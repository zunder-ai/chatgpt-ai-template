import OpenAI from "openai";
import { defineEventHandler, readBody } from "h3";
import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai';

export default defineEventHandler(async (event) => {
  const {
    openaiApiKey,
    openaiModel,
  } = useRuntimeConfig()

  const openai = new OpenAI({ apiKey: openaiApiKey })
  const body = await readBody(event);
  console.log("Received body:", body);

  const messages: ChatCompletionRequestMessage[] = [];

  messages.push({
    role: 'system',
    content: 'You are a helpful assistant with expertise in technology and programming.'
  });
  messages.push({ role: 'user', content: body.message });

  try {
    const completion = await openai.chat.completions.create({
      model: openaiModel,
      messages: messages,
    });

    console.log("Completion:", completion.choices[0].message.content);

    return {
      content: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error processing chat request',
    });
  }
});

