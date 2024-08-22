import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import installer from "@ffmpeg-installer/ffmpeg";
import {createWriteStream} from "fs";
import {dirname, resolve} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

class OggConverter {
    constructor() {
        ffmpeg.setFfmpegPath(installer.path);
    }

    toMp3(input, output){
        try{
            const outputPath = resolve(dirname(input), `${output}.mp3`);
            return new Promise((resolve, reject) => {
                ffmpeg(input)
                    .inputOption('-t 30')
                    .output(outputPath)
                    .on('end', () => resolve(outputPath))
                    .on('error', (err) => reject(err.message))
                    .run();
            })
        }catch(e){
            console.log("Error with converting ogg to mp3",e.message);
        }
    }

    async create(url, filename){
        try{
            const oggPath = resolve(__dirname, '../voices', `${filename}.ogg`);

            const response = await axios({
                method: "GET",
                url: url,
                responseType: "stream"
            });

            return new Promise(resolve => {
                const stream = createWriteStream(oggPath);
                response.data.pipe(stream);
                stream.on('finish',() => resolve(oggPath));
            })

            const stream = createWriteStream(filename);
        }catch(e){
            console.log("Error with creating ogg file",e.message);
        }
    }
}

export const ogg = new OggConverter();