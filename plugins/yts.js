import ytSearch from "yt-search";

const handler = async (m, { conn, usedPrefix, args, command }) => {
  try {
    const text = args.length >= 1 
      ? args.slice(0).join(" ") 
      : (m.quoted && (m.quoted?.text || m.quoted?.caption || m.quoted?.description)) || null;

    if (!text) {
      return conn.reply(
        m.chat,
        `🔍 Please provide the name of a YouTube video or channel.\n\nExample: ${usedPrefix}${command} Despacito`,
        null,
        m
      );
    }

    const { all: [bestItem, ...moreItems] } = await ytSearch(text);
    const videoItems = moreItems.filter(item => item.type === "video");

    const formattedData = {
      title: `📄 *Search Results*\n\n`,
      rows: [
        {
          title: "⭐ *Top Result*",
          rows: [
            {
              header: bestItem.title,
              id: `${usedPrefix}yta ${bestItem.url}`,
              title: bestItem.description || "No description",
              description: ""
            }
          ]
        },
        {
          title: "📋 *More Results*",
          rows: videoItems.map(({ title, url, description }, index) => ({
            header: `🎥 ${index + 1}) ${title}`,
            id: `${usedPrefix}yta ${url}`,
            title: description || "No description",
            description: ""
          }))
        }
      ]
    };

    const emojiMap = {
      type: "🎥",
      videoId: "🆔",
      url: "🔗",
      title: "📺",
      description: "📝",
      image: "🖼️",
      thumbnail: "🖼️",
      seconds: "⏱️",
      timestamp: "⏰",
      ago: "⌚",
      views: "👀",
      author: "👤"
    };

    const caption = Object.entries(bestItem)
      .map(([key, value]) => {
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        const valueToDisplay =
          key === "views"
            ? new Intl.NumberFormat("en", { notation: "compact" }).format(value)
            : key === "author"
            ? `Name: ${value.name || "Unknown"}\n🔗 URL: ${value.url || "Unknown"}`
            : value || "Unknown";

        return `${emojiMap[key] || "🔹"} *${formattedKey}:* ${valueToDisplay}`;
      })
      .join("\n");

    await conn.sendButtonMessages(
      m.chat,
      [
        [
          formattedData.title + caption,
          "Watermark",
          bestItem.image || bestItem.thumbnail || "default_logo.png",
          [["🔄 Back to Menu", usedPrefix + "menu"]],
          null,
          [["💚 Official Channel", "https://youtube.com/"]]
        ],
        [["🔎 Search Again", formattedData.rows]]
      ],
      m
    );
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❗ An error occurred.`, m);
  }
};

handler.command = /^y(outubesearch|ts(earch)?)$/i;
export default handler;