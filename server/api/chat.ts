import { defineEventHandler, readBody, createError } from 'h3';
import { useChat } from '../composables/useChat';
import type { ChatCompletionRequestMessage } from 'openai/resources/chat/completions';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.message || body.message.trim().length === 0) {
    console.error("Invalid message:", body.message);
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid or missing message parameter',
    });
  }

  const chat = useChat();

  try {
    const response = await chat.sendMessage(body.message);
    return response;
  } catch (error) {
    console.error('Error in chat API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while processing your request.',
    });
  }
});