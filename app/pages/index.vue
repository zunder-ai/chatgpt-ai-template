<template>
    <ZChatPage>
        <template #messages>
            <ZChatMessages :messages="chatMessages" />
        </template>
        <template #input>
            <ZChatInput @submit="handleSubmit" :loading="loading" placeholder="Type your message here..." />
        </template>
    </ZChatPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ChatMessage } from '../types/chat';

const chatMessages = ref<ChatMessage[]>([]);
const loading = ref(false);

const handleSubmit = async (text: string) => {
  // Add user message
  chatMessages.value.push({
    isUser: true,
    avatar: 'U',
    content: text,
  });

  loading.value = true;

  try {
    const aiMessage: ChatMessage = await $fetch('/api/chat', {
      method: 'POST',
      body: { message: text },
    });
    chatMessages.value.push({
        isUser: false,
        avatar: "AI",
        content: aiMessage.content,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    // Handle error (e.g., show an error message to the user)
  } finally {
    loading.value = false;
  }
};
</script>

