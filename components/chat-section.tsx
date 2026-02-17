"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

export function ChatSection() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");

  const isStreaming = status === "streaming" || status === "submitted";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSuggestedQuestion = (question: string) => {
    if (isStreaming) return;
    sendMessage({ text: question });
  };

  return (
    <section id="chat" className="section-padding">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-card-border bg-card/50 px-4 py-1.5 text-sm text-muted">
            <MessageSquare size={14} className="text-accent" />
            AI-Powered Chat
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ask me anything
          </h2>
          <p className="mt-3 text-muted">
            Chat with my AI to learn about my experience, skills, and what I
            bring to your team.
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-card-border bg-card/30 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ChatMessages messages={messages} isStreaming={isStreaming} />
          <ChatInput
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onSuggestedQuestion={handleSuggestedQuestion}
            isStreaming={isStreaming}
            hasMessages={messages.length > 0}
          />
        </motion.div>
      </div>
    </section>
  );
}
