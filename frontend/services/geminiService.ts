import { GoogleGenAI } from "@google/genai";
import { BodyMetric } from "../types";

export const getHealthAnalysis = async (metrics: BodyMetric[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key 缺失，无法生成分析。";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    你是一位专业的健身教练。
    请分析该会员以下近期的体测数据趋势：
    ${JSON.stringify(metrics)}
    
    数据包含日期 (date)、体重 (weight kg) 和体脂率 (bodyFat %)。
    1. 用中文简要总结(2句话以内)该会员的近期进步。
    2. 基于趋势提供3条具体的饮食或训练建议。
    3. 语气要专业且充满鼓励。
    请直接输出纯文本内容，适合在手机App卡片中展示。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "无法生成分析结果。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "抱歉，AI 教练暂时掉线了。";
  }
};