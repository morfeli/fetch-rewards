"use client";

import { useState, useRef, useEffect } from "react";
import { type Message, useChat } from "ai/react"; // Assuming you have this package installed
import { MessageCircle, X, Dog } from "lucide-react";
import { Button } from "../ShadcnUI/Button";
import { Input } from "../ShadcnUI/Input";
import { ScrollArea } from "../ShadcnUI/ScrollArea";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat", // Specify your chat endpoint here
    });

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-2 bg-slate-700 rounded-full right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col h-[500px] transition-all duration-300 ease-in-out">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold">Chat with Us</h2>
              <Dog className="h-8 w-8 text-blue-500" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="bg-slate-800 rounded-full"
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
          <ScrollArea ref={scrollRef} className="flex-grow p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
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
          </ScrollArea>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex">
              <Input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={handleInputChange}
                className="flex-grow"
              />
              <Button
                type="submit"
                className="ml-2 bg-blue-500 text-white"
                disabled={isLoading}
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
        >
          <MessageCircle className="h-6 w-6 text-white scale-125" />
        </Button>
      )}
    </div>
  );
}
