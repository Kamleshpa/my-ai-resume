"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { User, Bot } from "lucide-react";
import { resumeData } from "@/lib/resume-data";

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is Extract<typeof part, { type: "text" }> => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Bot size={16} />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-ai-bubble px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
          <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
          <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}

interface ChatMessagesProps {
  messages: UIMessage[];
  isStreaming: boolean;
}

export function ChatMessages({ messages, isStreaming }: ChatMessagesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isStreaming]);

  if (messages.length === 0 && !isStreaming) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <Bot size={28} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Hi, I&apos;m {resumeData.personal.name.split(" ")[0]}&apos;s AI
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Ask me anything about my experience, skills, projects, or what
          I&apos;m looking for in my next role. I&apos;m here to help you learn
          if I&apos;d be a good fit for your team.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className="custom-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-4"
    >
      {messages.map((message) => {
        const text = getMessageText(message);

        return (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                message.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-accent/10 text-accent"
              }`}
            >
              {message.role === "user" ? (
                <User size={16} />
              ) : (
                <Bot size={16} />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "rounded-tr-sm bg-user-bubble text-user-bubble-text"
                  : "rounded-tl-sm bg-ai-bubble text-ai-bubble-text"
              }`}
            >
              {message.role === "user" ? (
                <p>{text}</p>
              ) : (
                <div className="chat-prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {isStreaming && messages[messages.length - 1]?.role === "user" && (
        <TypingIndicator />
      )}
    </div>
  );
}
