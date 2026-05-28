"use client";

import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { useResumeData } from "@/lib/resume-data-context";

export function ChatSection() {
  const { variantSlug } = useResumeData();

  // Recreate the transport only when the variant slug changes so the
  // request body always carries the right slug (or no slug, on the base page).
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: variantSlug ? { variantSlug } : undefined,
      }),
    [variantSlug]
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
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
          {error && (
            <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-sm text-amber-700 dark:text-amber-400">
              {error.message || "Something went wrong. Please try again."}
            </div>
          )}
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
