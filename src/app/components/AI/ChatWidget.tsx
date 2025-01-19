"use client";

import { useState, useRef, useEffect } from "react";
import { type Message, useChat } from "ai/react";
import { MessageCircle, X, Dog } from "lucide-react";
import { Button } from "../ShadcnUI/Button";
import { Input } from "../ShadcnUI/Input";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="fixed bottom-2 bg-slate-700 rounded-full right-4 z-50"
      aria-label="Chat widget toggle"
    >
      {isOpen ? (
        <div
          className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col h-[500px] transition-all duration-300 ease-in-out"
          aria-label="Chat window"
        >
          <div
            className="p-4 border-b flex justify-between items-center"
            aria-label="Chat header"
          >
            <div className="flex items-center space-x-2">
              <div>
                <h2
                  className="text-lg font-semibold flex items-center"
                  aria-label="Chat title"
                >
                  Ask Doggysearch <Dog className="h-8 w-8 text-blue-500 ml-2" />
                </h2>
                <p className="text-sm w-[250px]" aria-label="Chat description">
                  Learn more about certain breeds, proper training, anything dog
                  related!
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="bg-slate-800 rounded-full"
              aria-label="Close chat window"
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
          <div
            ref={messagesRef}
            className="flex-grow overflow-y-auto p-4"
            aria-label="Chat messages"
          >
            {messages.map((message: Message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
                aria-label={`${message.role === "user" ? "User" : "AI"} message`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t"
            aria-label="Chat input form"
          >
            <div className="flex">
              <Input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={handleInputChange}
                className="flex-grow"
                aria-label="Type your message here"
              />
              <Button
                type="submit"
                className="ml-2 bg-blue-500 text-white"
                disabled={isLoading}
                aria-label={isLoading ? "Sending message" : "Send message"}
              >
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className="rounded-full w-12 h-12 flex items-center justify-center"
          aria-label="Open chat window"
        >
          <MessageCircle className="h-6 w-6 text-white scale-125" />
        </Button>
      )}
    </div>
  );
}
