import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// async function run() {
// // For embeddings, use the Text Embeddings model
// const model = genAI.getGenerativeModel({ model: "text-embedding-004"});

// const text = "The quick brown fox jumps over the lazy dog."

// const result = await model.embedContent(text);
// const embedding = result.embedding;
// console.log(embedding.values);
// }

// run();

class GeminiAI {
    constructor(){}

    async emdedding(text){
        try{    
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

            const model = genAI.getGenerativeModel({ model: "text-embedding-004"});

            const result = await model.embedContent(text);
            const embedding = result.embedding;
            return embedding.values;

        }catch(e){
            console.log("Error with embedding",e.message);
        }
    }
}

export const gemini = new GeminiAI();