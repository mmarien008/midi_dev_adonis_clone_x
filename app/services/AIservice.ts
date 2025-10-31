import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export default class AIService {
  static async suggestHashtags(tweet: string) {
    const prompt = `Analyse ce tweet et propose 5 hashtags pertinents et tendance sans explication : "${tweet}"`;
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [{ role: "user", content: prompt }],
    });
    return response;
  }

  static async enrichTweet(tweet: string) {
    const prompt = `Améliore ce tweet pour le rendre plus engageant, tout en gardant son sens : "${tweet}"`;
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [{ role: "user", content: prompt }],
    });
    return response; 
  }

  static async analyzeTweet(tweet: string) {
    const prompt = `Analyse le ton, l'émotion et la clarté du tweet suivant, et donne une note de 1 à 10 sur son impact potentiel : "${tweet}"`;
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [{ role: "user", content: prompt }],
    });
    return response; 
  }
}
