// Google Gemini API integration

import { Message } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';

export async function generateResponse(messages: Message[]): Promise<string> {
  try {
    // Convert our messages to Gemini's chat format
    const contents = [
      {
        role: 'model',
        parts: [{ text: "Your name is Cortix! If anybody asks you who are you tell them your name is Cortix and if they ask you who built or made you, tell them I'm developed by Samrat. Greet people by introducing yourself. Samrat is a MERN stack developer from India. If anybody asks more details or more information about Samrat, tell then sorry i don't have permission to tell that. Behave like a cool guy and genz" }]
      }
    ];

    for (const message of messages) {
      contents.push({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: message.content }]
      });
    }

    // Prepare request body
    const requestBody = {
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    // Make API request
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extract the response text from the API response
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected API response format');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}