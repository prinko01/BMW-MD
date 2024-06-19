const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVBBZFAwUnEvUDhWc2szdFRuc1BJTWRRQUFMQmQwNCt2Y1ZIaUNlcnlWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT3RXY1IwWXNNa0UyVThaM3JLTUxDSWtHcWNoNjdSSThFTjZjYjY4OVFoST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLR0hLcm1KS20zdTVXTU5lQWpoZkNxVkRGV0NkR0d0ZW9pVHg2eVc2ZTF3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvemlrRXkrYmJZRFZkZUx6QmpmaEV6WXV4NndETnRyY253TUdSREZCSGdZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllBakliUXR5eUMyaXdURVdURG1mM1FqNnhHNDBOMGpYV2U1R2FBVHF6bDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRQaVFIdUlydmNxUDBRSmZReU1sNmlOZlo1SGlFeHBteXNtVHlXUUZCUXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEZSditUYnBFTTJ6WWVBR2NRMHBSSnNsVExuY0tzR1Jma2VLRlFsU3BHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWg1alBwSmFkUHdYWENJcFlOQU1YTXFnalhXQi9TM1FPVk9kZytOL0VUQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRHV3FzdGN1NEVCR0FGVnVWd0Nyc2lnSmt3elNEQjZSTzZ5QnZVMmNnbDFYTjhwdzB2dWRZL0FXOVNpU01rcWRITENOZDUvRGJwdkNEOEVtbjBXR0FBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUwLCJhZHZTZWNyZXRLZXkiOiJpTGxqQW9rU21mcElCM3ZzZWFmUnE2d3EyU1JRN2p2ZlYvUnZsdElQU2Q4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3NjI4ODUzMjgxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjIyQkY1QjdBRDk3RTNFRTIwODQwNzY4NkMwNTk4Qzk2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTg4MTk4MTV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im15bVUxU1NSU0txUGJST2dqNVVrTHciLCJwaG9uZUlkIjoiYjNiMTY5ZjYtOTk1Zi00MThlLTg2MzUtZTQzNTQyN2M2MzUyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxSYkxEK05TdER6TmFaNjlGNnYrRzJoNFJYMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1ZytHUVNGTEVkdzE1SFIrMTlTVi9vYVc1RDg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNzJaTlNBRjEiLCJtZSI6eyJpZCI6IjI3NjI4ODUzMjgxOjI2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6InByaW5jZW1hc2hhbWJhMDkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08vZzlJSUhFTmEzekxNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhvczlqcENnZEJJU0hPWUZRQkFxSjlYZTlYR01JcFloRzhRalVQR3RyblU9IiwiYWNjb3VudFNpZ25hdHVyZSI6Indvc0xoNG5Cb3JGeVgyY0p3ZzVtbGcwYTlmOERPbXFYdE1TT2NZRW5sMEd6cmxhKzFSK0dOWVplYlgrN3JxYThSbXpSU1NTQThjenY5cngrbTBTckRnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJvemNVWTB3VGk3YjFIY2RFL0tMN2ZTZjFoRllUVm5IdUxURklnLzl5cXA2dXk1ZjE3QUs0RGVnaS9LUWh3QmZjOW1jN1dtZW9uNDR5R0YwOVdwWGNCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NjI4ODUzMjgxOjI2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNhTFBZNlFvSFFTRWh6bUJVQVFLaWZWM3ZWeGpDS1dJUnZFSTFEeHJhNTEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTg4MTk4MTEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQUlxIn0=',
    PREFIXE: process.env.PREFIX || "#",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "27628853281",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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

