"use client";

import { useState } from "react";

import { MessageCircle, X, Dog } from "lucide-react";

import { Button } from "../ShadcnUI/Button";
import { Input } from "../ShadcnUI/Input";
import { ScrollArea } from "../ShadcnUI/ScrollArea";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputValue,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      // Here you would typically send the message to your backend
      // and then add the response to the messages
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now(),
          text: "Thanks for your message! Our team will get back to you soon.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

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
          <ScrollArea className="flex-grow p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex">
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" className="ml-2 bg-blue-500 text-white">
                Send
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
