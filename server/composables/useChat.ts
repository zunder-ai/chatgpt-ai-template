import { sendChatMessage } from '../utils/openai';
import type { ChatCompletionRequestMessage } from 'openai/resources/chat/completions';

export const useChat = () => {
    let messages: ChatCompletionRequestMessage[] = [];

    const sendMessage = async (message: string) => {
        messages.push({ role: 'user', content: message });

        try {
            const response = await sendChatMessage(messages);
            if (response) {
                messages.push(response);
            }
            return response;
        } catch (error) {
            console.error('Error in sendMessage:', error);
            throw error;
        }
    };

    const getMessages = () => messages;

    const clearMessages = () => {
        messages = [];
    };

    return {
        sendMessage,
        getMessages,
        clearMessages,
    };
};