const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0FGVkdob3I4Q1JZTkJod3NFZS9lYVhoS2llNWNJRE1iYmxVUGxOVUtFUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDhTLzJMZkJPRCtrc3N1RkxTWnlWWmtNS0V2aVh3VXlPaXl4N1k2VU5pMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRmF5WnV3bXZzMEFZZDltd2IyOEovanRUa2NuUlM0eHlZb09FSDErLzNBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUMUw1OHJLTUNuZmZYYy92WHhPQ05OTUlab2h2aXhKOWZDTEN0b3ppRUZBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklEKzF2L3dGSWlwRHpRN0xaYmR1U3Rtc0RtSDdFeWNtcHI1NmlSYmVYR3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhjaHdqY3RXSS9xQU56V2YzMkMwaE81aTFxNndEc3ZOMmtNYnBDbGtEMVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU1PVEdRY0hXWVBqbjljZ0Z2QXdKQ3hDbllndllmZ2MwdzhwVHYzc2lFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTl1cVd4b0hNcGIvTHljeW5TVno2ekRwS2loNS9DbDAvK3M5aXBLMWdnOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlRQnp3YmNuSXJ2M2FSRG0zNVdxUm9KN1N2MUYvRmZabkJiaUpWTXRuZ0hkcG9ZTmNxT2hPQXhzcFZDTDhERHVVcGdKMXRmMXFIN3orTHN5QUpXTUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYwLCJhZHZTZWNyZXRLZXkiOiJVSjc2Zi9OY2tuTUFPZTN1V3RYWEs4amEwS2h2UnM5azFjWkN2ZWpBMDRvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ0RXdyZEFzdVF6bUVVV09zWTRCcTVBIiwicGhvbmVJZCI6IjU1NjY1Zjg2LWRmNjUtNDJmZS1hMzUyLTRhNzYzZjBhYzkyYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyMnBGTmdINDV3UEVEUEE1Y0R4Tk4xZkRwOUU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM2h2ZzB5MTBUcUJCNk9sTGYySFZMTG5tOU9nPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjZHS1pGMTIxIiwibWUiOnsiaWQiOiIyMzQ4MTQ0MzE3MTUyOjYwQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKK3IvNXdDRUxybXNiWUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJDRjR5VkRVbFlwTjF3SGcrWEtobVRkU1YwWk4yYlVXaHVZQ0xKU2xtRjM0PSIsImFjY291bnRTaWduYXR1cmUiOiJrVHQ2V2QzTy9IWkhxLzZVQm5tc1VQZ0JQeTc5QmtxN1pzLzVybXBTMzFqYUllT09ZZ2RYV0xCRENaWUEvbkZSTlBIcHRIVGlPeVFJSTdQTVBGcm9CQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYkkrMVhWSldMMDdXV05ZbmRyNXZBNnZndTdzREZoS2cra0FxTGNUVDErOUhyOE5BK3F6V2Vid3JFWUJqRTYvdW5VZVNLdlRVYUpuVGJCYzNpd0k2Q2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTQ0MzE3MTUyOjYwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFoZU1sUTFKV0tUZGNCNFBseW9aazNVbGRHVGRtMUZvYm1BaXlVcFpoZCsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ2NzQ4ODcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQTcyIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Wally Jay",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348144317152", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'WALLYJAYTECH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

