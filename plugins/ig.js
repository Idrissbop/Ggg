import fetch from 'node-fetch';
import axios from 'axios';
import instagramGetUrl from 'instagram-url-direct';
import { instagram } from '@xct007/frieren-scraper';
import { instagramdl } from '@bochilteam/scraper';

const lenguajeGB = {
  smsAvisoMG: () => '⚠️ خطأ: الرجاء إدخال رابط صحيح.',
  smsMalError3: () => 'حدث خطأ أثناء معالجة طلبك.',
  smsMensError2: () => 'يرجى التحقق من الرابط والمحاولة مرة أخرى.'
};

const mid = {
  smsInsta: 'رابط غير صالح. يرجى إدخال رابط Instagram صالح.'
};

const handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()}${mid.smsInsta}\n*${usedPrefix + command} https://www.instagram.com/p/CCoI4DQBGVQ/?igshid=YmMyMTA2M2Y=*`;

  const { key } = await conn.sendMessage(m.chat, { text: 'يرجى الانتظار...' }, { quoted: null });
  try {
    const responseIg = await axios.get(`${apis}/download/instagram?url=${args[0]}`);
    const resultlIg = responseIg.data;
    let linkig = resultlIg.data[0].url;
    await conn.sendFile(m.chat, linkig, 'error.mp4', `العلامة المائية`, m);
  } catch (e) {
    console.error(e);
    conn.sendMessage(m.chat, { text: `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}` });
  }
};

handler.help = ['instagram <link ig>'];
handler.tags = ['downloader'];
handler.command = /^(instagram|ig(dl)?)$/i;
handler.limit = 2;
handler.register = true;

export default handler;