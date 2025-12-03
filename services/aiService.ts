import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ResumeData } from "../types";

// Schema definition matching the ResumeData interface
const resumeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    title: { type: Type.STRING },
    summary: { type: Type.STRING },
    contact: {
      type: Type.OBJECT,
      properties: {
        phone: { type: Type.STRING },
        email: { type: Type.STRING },
        location: { type: Type.STRING },
      },
      required: ["phone", "email", "location"],
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          role: { type: Type.STRING },
          period: { type: Type.STRING },
          location: { type: Type.STRING },
          description: { type: Type.STRING },
          achievements: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                items: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
            },
          },
        },
        required: ["company", "role", "period", "achievements"],
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING },
          school: { type: Type.STRING },
          period: { type: Type.STRING },
        },
        required: ["degree", "school", "period"],
      },
    },
    certifications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          status: { type: Type.STRING },
        },
        required: ["name"],
      },
    },
    competencies: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          skills: { type: Type.STRING },
        },
        required: ["category", "skills"],
      },
    },
  },
  required: ["name", "title", "contact", "summary", "experience", "education"],
};

export const parseResumeWithGemini = async (text: string): Promise<ResumeData> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Extract professional resume data from the following text. 
      Format the output strictly as JSON. 
      If some fields are missing (like phone or email), try to infer them or leave them as empty strings. 
      Summarize long descriptions into punchy achievement bullet points.
      
      Input Text:
      ${text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as ResumeData;
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (error) {
    console.error("AI Parsing Error:", error);
    throw error;
  }
};
