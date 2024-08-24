import { Telegraf } from "telegraf";
import { message } from "telegraf/filters"
import dotenv from "dotenv";
import {ogg} from "./ogg.js"
import { speechtotext } from "./speech2text.js";

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.on(message('voice'), async (ctx) => {
    try{
        const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
        const userId = String(ctx.message.from.id);
        const oggPath = await ogg.create(link.href, userId);
        const mp3Path = await ogg.toMp3(oggPath, userId);

        const text = await speechtotext.transcription(mp3Path);

        await ctx.reply(text);
        
    }catch(e){
        console.log("Error with voice",e.message);
    }
    
});

bot.command('start', async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.message, null, 2));
})

bot.launch();

// Stop the bot when receiving SIGINT or SIGTERM signals
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));