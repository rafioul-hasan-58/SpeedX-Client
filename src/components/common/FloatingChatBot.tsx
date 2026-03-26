import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, ChevronDown } from "lucide-react";
import { useChatBotMutation } from "@/lib/api/userApi";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hey rider! 🏍️ Welcome to SpeedX Moto. Ask me anything about bikes, scooters, pricing, or orders!",
        },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [chatBot, { isLoading }] = useChatBotMutation();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const res = await chatBot({ message: userMessage.content }).unwrap(); // 👈 call mutation
            console.log("res",res)
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: res.data.reply },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Oops! Something went wrong. Please try again or call us at 01752966422 🏍️",
                },
            ]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 flex flex-col transition-all duration-300 ease-in-out ${isOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                style={{ width: "360px", height: "500px" }}
            >
                <div className="flex flex-col h-full rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a2e]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#00b4d8] flex items-center justify-center shadow-md">
                                <Bot size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm leading-tight">SpeedX Assistant</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                                    <span className="text-green-400 text-xs">Online</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                        >
                            <ChevronDown size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.role === "assistant" && (
                                    <div className="w-7 h-7 rounded-full bg-[#00b4d8] flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                        <Bot size={14} className="text-white" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                        ? "bg-[#1a1a2e] text-white rounded-br-sm"
                                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="w-7 h-7 rounded-full bg-[#00b4d8] flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                    <Bot size={14} className="text-white" />
                                </div>
                                <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">
                                    <div className="flex gap-1 items-center">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="px-3 py-3 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about bikes, orders..."
                                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                className="w-8 h-8 rounded-lg bg-[#00b4d8] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0096b7] transition-colors flex-shrink-0"
                            >
                                <Send size={14} className="text-white" />
                            </button>
                        </div>
                        <p className="text-center text-gray-400 text-xs mt-2">Powered by SpeedX AI</p>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #00b4d8 100%)" }}
                aria-label="Open chat"
            >
                <div className={`transition-all duration-300 ${isOpen ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100"}`}>
                    <MessageCircle size={24} className="text-white" />
                </div>
                <div className={`transition-all duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"}`}>
                    <X size={24} className="text-white" />
                </div>

                {/* Pulse ring when closed */}
                {!isOpen && (
                    <span className="absolute w-14 h-14 rounded-full bg-[#00b4d8] opacity-30 animate-ping" />
                )}
            </button>
        </>
    );
};

export default FloatingChatbot;