import { igdl } from 'ruhend-scraper';

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `⚠️ Please send the link of the Facebook video.`,
      m
    );
  }

  let res;
  try {
    await m.react('⏱️'); // React with a clock emoji to indicate processing
    res = await igdl(args[0]);
  } catch (e) {
    return conn.reply(
      m.chat,
      `❌ The link is invalid. Please verify if it is a valid Facebook video link.`,
      m
    );
    await m.react('❎️'); // React with a cross emoji for error
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(
      m.chat,
      `⚠️ No video results were found.`,
      m
    );
    await m.react('❎️');
  }

  let data;
  try {
    data =
      result.find(i => i.resolution === "720p (HD)") ||
      result.find(i => i.resolution === "360p (SD)");
  } catch (e) {
    return conn.reply(
      m.chat,
      `⚠️ No valid data found.`,
      m
    );
    await m.react('❎️');
  }

  if (!data) {
    return conn.reply(
      m.chat,
      `⚠️ No suitable video results were found.`,
      m
    );
    await m.react('❎️');
  }

  let video = data.url;
  try {
    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        caption: `✅ Here is your Facebook video.\n${wm}`,
        fileName: 'facebook_video.mp4',
        mimetype: 'video/mp4',
      },
      { quoted: m }
    );
    await m.react('✅️'); // React with a checkmark emoji for success
  } catch (e) {
    return conn.reply(
      m.chat,
      `❌ An error occurred while downloading the video.`,
      m
    );
    await m.react('❎️');
  }
};

handler.help = ['facebook', 'fb'];
handler.tags = ['downloads'];
handler.command = ['facebook', 'fb'];
handler.register = true;
handler.limit = true;

export default handler;