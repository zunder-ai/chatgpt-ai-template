import { useRuntimeConfig } from '#imports'
import OpenAI from 'openai'
import type { ChatCompletionRequestMessage } from 'openai/resources/chat/completions'

let _openai: OpenAI

export function useOpenAI(): OpenAI {
    if (_openai) {
        return _openai
    }

    const config = useRuntimeConfig()
    const apiKey = config.openaiApiKey

    if (!apiKey) {
        throw new Error('Missing OpenAI API key in runtime config')
    }

    _openai = new OpenAI({ apiKey })
    return _openai
}

export async function sendChatMessage(messages: ChatCompletionRequestMessage[]) {
    const openai = useOpenAI()
    const config = useRuntimeConfig()

    try {
        const completion = await openai.chat.completions.create({
            model: config.openaiModel || 'gpt-3.5-turbo',
            messages: messages,
        })

        return completion.choices[0].message
    } catch (error) {
        console.error('Error calling OpenAI API:', error)
        throw error
    }
}