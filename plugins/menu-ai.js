import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Retrieve user information
    let name = await conn.getName(m.sender);

    // New formatted message
    let menu = `
━━━━━━━━━━━━━━━━━━━━
*Hi! ${name}* 
━━━━━━━━━━━━━━━━━━━━

*Ai Commands*

${usedPrefix}ai
${usedPrefix}bard
${usedPrefix}sticker 
${usedPrefix}hd    

`;

    // Send the message
    await conn.sendMessage(m.chat, { text: menu }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.reply('حدث خطأ أثناء تنفيذ الأمر. يرجى المحاولة لاحقًا.');
  }
};

handler.command = /^(sd|menu-ai|commands)$/i;

export default handler;