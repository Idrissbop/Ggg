import fg from 'api-dylux';
import fetch from 'node-fetch';
import { savefrom, facebookdl, facebookdlv2 } from '@bochilteam/scraper';
import fbDownloader from 'fb-downloader-scrapper';
import { facebook } from '@xct007/frieren-scraper';
import axios from 'axios';

// تعريف المتغير lenguajeGB
const lenguajeGB = {
  smsAvisoMG: () => 'Please enter a valid Facebook link.',
  smsMalused5: 'The URL format is incorrect.',
  smsAvisoEG: () => 'Please wait, we are processing your request.',
  smsfb2: 'Downloading Facebook video...',
  smsMalError3: 'Error processing your request.',
  smsMensError2: 'Please try again later.',
  // يمكن إضافة المزيد من الرسائل حسب الحاجة
};

const handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}${lenguajeGB.smsMalused5}\n${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`, fkontak, m);
  if (!args[0].match(/www.facebook.com|fb.watch/g)) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}${lenguajeGB.smsMalused5}\n${usedPrefix + command} https://www.facebook.com/watch?v=636541475139*`, fkontak, m);

  try {
    await conn.reply(m.chat, `${lenguajeGB['smsAvisoEG']()}${lenguajeGB.smsfb2}`, fkontak, m);
    const d2ata = await facebook.v1(args[0]);
    let r2es = '';
    if (d2ata.urls && d2ata.urls.length > 0) {
      r2es = `${d2ata.urls[0]?.hd || d2ata.urls[1]?.sd || ''}`;
    }
    conn.sendFile(m.chat, r2es, 'error.mp4', `✅ ${lenguajeGB.smsfb}\n${wm}`, m);
  } catch (err1) {
    try {
      const req = await igeh(args[0]);
      conn.sendMessage(m.chat, { video: { url: req.url_list } }, m);
    } catch (err1_2) {
      try {
        const Rres = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=${lolkeysapi}&url=${args[0]}`);
        const Jjson = await Rres.json();
        let VIDEO = Jjson.result[0];
        if (VIDEO == '' || !VIDEO || VIDEO == null) VIDEO = Jjson.result[1];
        conn.sendFile(m.chat, VIDEO, 'error.mp4', `✅ ${lenguajeGB.smsfb}\n${wm}`, m);
      } catch (err2) {
        try {
          const ress = await fg.fbdl(args[0]);
          const urll = await ress.data[0].url;
          await conn.sendFile(m.chat, urll, 'error.mp4', `✅ ${lenguajeGB.smsfb}\n${wm}`, m);
          handler.limit = 3;
        } catch (err3) {
          try {
            const res = await fbDownloader(args[0]);
            for (const result of res.download) {
              const ur = result.url;
              await conn.sendFile(m.chat, ur, 'error.mp4', `✅ ${lenguajeGB.smsfb}\n${wm}`, m);
              handler.limit = 3;
            }
          } catch (err4) {
            try {
              const res3 = await fetch(`https://latam-api.vercel.app/api/facebookdl?apikey=nekosmic&q=${args[0]}`);
              const json = await res3.json();
              const url3 = await json.video;
              await conn.sendFile(m.chat, url3, 'error.mp4', `✅ ${lenguajeGB.smsfb}\n${wm}`, m);
              handler.limit = 3;
            } catch (err5) {
              try {
                const { result } = await facebookdl(args[0]).catch(async (_) => await facebookdlv2(args[0])).catch(async (_) => await savefrom(args[0]));
                for (const { url, isVideo } of result.reverse()) await conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `✅ ${lenguajeGB.smsfb}\n${wm}`, m);
                handler.limit = 3;
              } catch (err6) {
                await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m);
                console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`);
                console.log(err6);
                handler.limit = false;
              }
            }
          }
        }
      }
    }
  }
};

export default handler;

async function igeh(url_media) {
  return new Promise(async (resolve, reject) => {
    const BASE_URL = 'https://instasupersave.com/';
    try {
      const resp = await axios(BASE_URL);
      const cookie = resp.headers['set-cookie']; // get cookie from request
      const session = cookie[0].split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '');
      const config = { method: 'post', url: `${BASE_URL}api/convert`, headers: { 'origin': 'https://instasupersave.com', 'referer': 'https://instasupersave.com/pt/', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'same-origin', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52', 'x-xsrf-token': session, 'Content-Type': 'application/json', 'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}` }, data: { url: url_media } };
      axios(config).then(function (response) {
        const ig = [];
        if (Array.isArray(response.data)) {
          response.data.forEach((post) => {
            ig.push(post.sd === undefined ? post.thumb : post.sd.url);
          });
        } else {
          ig.push(response.data.url[0].url);
        }
        resolve({ results_number: ig.length, url_list: ig });
      }).catch(function (error) {
        reject(error.message);
      });
    } catch (e) {
      reject(e.message);
    }
  });
}