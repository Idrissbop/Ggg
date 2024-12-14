import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import fg from 'api-dylux';

const mg = '⚠️ خطأ: ';
const mid = {
  smsMalused4: 'يرجى إدخال نص صالح.',
  smsVid: 'جاري تنزيل الفيديو...',
  smsAud: 'جاري تنزيل الصوت...'
};
const lenguajeGB = {
  smsAvisoEG: () => '⏳ جاري التنفيذ... ',
  smsMalError3: () => '❌ حدث خطأ أثناء المعالجة.',
  smsMensError2: () => 'يرجى المحاولة مرة أخرى لاحقًا.'
};
const wm = '𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗';
const gataImg = 'https://example.com/default-thumbnail.jpg';
const accountsgb = 'https://github.com/your-repo';

const ytPlayVid = async (query) => {
  const result = await yts(query);
  return {
    result: result.videos[0].url,
    thumb: result.videos[0].thumbnail
  };
};

const handler = async (m, { command, usedPrefix, conn, text }) => {
    if (!text) throw `${mg}${mid.smsMalused4}\n*${usedPrefix + command} Billie Eilish - Bellyache*`;

    try {
        if (command === 'play.1') {
            conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + mid.smsAud, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: wm,
                        body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝗦𝗔𝗽𝗽',
                        previewType: 0,
                        thumbnail: gataImg,
                        sourceUrl: accountsgb
                    }
                }
            });

            try {
                const res = await fetch(`https://skizo.tech/api/y2mate?apikey=GataDios&url=${encodeURIComponent(text)}`);
                const json = await res.json();
                if (json.convert) {
                    await conn.sendMessage(m.chat, {
                        audio: { url: json.convert },
                        fileName: `audio.mp3`,
                        mimetype: 'audio/mp4'
                    }, { quoted: m });
                } else {
                    throw new Error('No se pudo obtener el enlace de conversión.');
                }
            } catch (e) {
                console.error('Error al obtener el audio:', e);
                await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m);
            }
        }

        if (command === 'play.2') {
            conn.reply(m.chat, lenguajeGB['smsAvisoEG']() + mid.smsVid, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: wm,
                        body: '😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝗦𝗔𝗽𝗽',
                        previewType: 0,
                        thumbnail: gataImg,
                        sourceUrl: accountsgb
                    }
                }
            });

            try {
                const mediaa = await ytPlayVid(text);
                await conn.sendMessage(m.chat, {
                    video: { url: mediaa.result },
                    fileName: `error.mp4`,
                    caption: `${wm}`,
                    thumbnail: mediaa.thumb,
                    mimetype: 'video/mp4'
                }, { quoted: m });
            } catch {
                try {
                    let res0 = await yts(text);
                    res0 = res0.videos[0];
                    let yt0 = await fg.ytv(res0.url, '360p');
                    await conn.sendFile(m.chat, yt0.dl_url, 'error.mp4', `${wm}`, m);
                } catch {
                    const res = await fetch(`https://skizo.tech/api/y2mate?apikey=GataDios&url=${encodeURIComponent(text)}`);
                    const json = await res.json();
                    await conn.sendFile(m.chat, json.result.video, 'error.mp4', `${wm}`, m);
                }
            }
        }
    } catch (e) {
        await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m);
        console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`);
        console.log(e);
    }
};

handler.help = ['play.1', 'play.2'].map(v => v + ' <texto>');
handler.tags = ['downloader'];
handler.command = ['play.1', 'play.2'];
handler.limit = 1;

export default handler;