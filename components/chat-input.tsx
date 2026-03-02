"use client";

import { Send } from "lucide-react";
import { resumeData } from "@/lib/resume-data";
import { GUARDRAILS } from "@/lib/guardrails";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSuggestedQuestion: (question: string) => void;
  isStreaming: boolean;
  hasMessages: boolean;
}

export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  onSuggestedQuestion,
  isStreaming,
  hasMessages,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isStreaming) {
        const form = e.currentTarget.form;
        if (form) form.requestSubmit();
      }
    }
  };

  return (
    <div className="border-t border-card-border bg-card/50 px-4 pb-4 pt-3">
      {/* Suggested Questions */}
      {!hasMessages && (
        <div className="mb-3 flex flex-wrap gap-2">
          {resumeData.suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => onSuggestedQuestion(question)}
              disabled={isStreaming}
              className="rounded-full border border-card-border bg-background px-3 py-1.5 text-xs text-muted transition-all hover:border-accent/50 hover:text-foreground disabled:opacity-50"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={onSubmit} className="flex items-end gap-2">
        <div className="relative flex-1">
          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value.slice(0, GUARDRAILS.MAX_MESSAGE_LENGTH))}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about my experience..."
            disabled={isStreaming}
            rows={1}
            className="w-full resize-none rounded-xl border border-card-border bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder-muted outline-none transition-colors focus:border-accent/50 disabled:opacity-50"
            style={{ maxHeight: "120px" }}
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isStreaming}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-all hover:bg-accent-hover disabled:opacity-40"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
