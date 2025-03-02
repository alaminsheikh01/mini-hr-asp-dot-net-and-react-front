"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Avatar, Spin } from "antd";
import { motion } from "framer-motion";
import { getGeminiResponse } from "@/api/chatAPI";
import { IoSend, IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";
import { BiUser, BiBot } from "react-icons/bi";

const Chatbot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I assist you with HR-related queries?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle Chat Window
  const toggleChat = () => setVisible(!visible);

  // Handle Sending Messages
  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { sender: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botReply = await getGeminiResponse(input);
      const botMessage = {
        sender: "bot",
        text: botReply,
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 1000); // Simulate bot typing delay
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Error: Could not get a response.",
          timestamp: new Date(),
        },
      ]);
      setLoading(false);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!visible && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-full shadow-xl cursor-pointer"
        >
          <IoChatbubbleEllipsesOutline size={28} />
        </motion.div>
      )}

      {/* Chat Window */}
      {visible && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="fixed bottom-12 right-6 w-96 h-[500px] bg-white shadow-xl rounded-xl flex flex-col border border-gray-200"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center">
              <BiBot size={24} className="mr-2" />
              <span className="font-semibold text-lg">HR Chatbot</span>
            </div>
            <IoClose
              size={24}
              className="cursor-pointer hover:text-gray-300"
              onClick={toggleChat}
            />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-end space-x-2">
                  {msg.sender === "bot" && (
                    <Avatar size={32} icon={<BiBot />} />
                  )}
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-md relative ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-black rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                    <div className="text-xs mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  {msg.sender === "user" && (
                    <Avatar size={32} icon={<BiUser />} />
                  )}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="text-center mt-2">
                <Spin />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-gray-300 flex items-center rounded-b-xl">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onPressEnter={sendMessage}
              className="flex-1 mr-2 rounded-full px-3 shadow-sm"
            />
            <Button
              type="primary"
              icon={<IoSend size={20} />}
              onClick={sendMessage}
              loading={loading}
              className="rounded-full"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;
