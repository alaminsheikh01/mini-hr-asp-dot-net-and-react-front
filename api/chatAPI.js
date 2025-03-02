import { hrData } from "@/app/utils/hr_data";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export const getGeminiResponse = async (message) => {
  try {
    // Build AI prompt with HR context
    const context = `You are an AI assistant for an HR Management System. Here is some project-specific information:\n\n
      - Project Name: ${hrData.project_name}
      - Description: ${hrData.description}\n
      FAQ:
      ${hrData.faqs
        .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}\n`)
        .join("\n")}
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: `${context}\nUser Question: ${message}` }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI."
    );
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "Error: Could not get a response.";
  }
};
