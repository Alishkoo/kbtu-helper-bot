import { Client } from "@gradio/client";
import { createReadStream } from "fs";

class SpeechToText{
    constructor(){}

    async transcription(filepath){
        try{
            const audio = createReadStream(filepath);
            const app = new Client("https://xianbao-whisper-v3-zero.hf.space/--replicas/jz1ie/");

            const result = await app.predict("/predict", [
                audio,  // blob в 'parameter_1' Audio компонент
                "transcribe",  // строка в 'Task' Radio компонент
            ]);

            return result.data;
        }catch(e){
            console.log("Error with transcription",e.message);
        }
    }
} 

export const speechtotext = new SpeechToText();