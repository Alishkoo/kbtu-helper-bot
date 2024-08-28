import "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import { FaissStore } from "langchain/vectorstores/faiss";
import { RecursiveCharacterTextSplitter} from "langchain/text_splitter"
import dotenv from "dotenv";

dotenv.config();

class GeminiAI {
    constructor(){}

    async emdedding(text){
        try{    
            const loader = new PDFLoader("../pdf/pdf_example.pdf");
            const docs = await loader.load();
            console.log("docs loaded")

            const textSplitter = new RecursiveCharacterTextSplitter({
                chuckSize: 1000,
                chunkOverlap: 200,
            });

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

            const embeddings = genAI.getGenerativeModel({ model: "text-embedding-004"});

            const docsOutput = await textSplitter.splitDocuments(docs);
            let vectorStore = new FaissStore.fromDocuments(
                docsOutput, 
                embeddings, 
            );
            console.log("vector store created")
            await vectorStore.save("../faiss_store");

            // const result = await model.embedContent(text);
            // const embedding = result.embedding;
            // return embedding.values;

        }catch(e){
            console.log("Error with embedding",e.message);
        }
    }

}

export const gemini = new GeminiAI();