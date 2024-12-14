import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {
  if (!text) {
    return conn.reply(m.chat, `🌸 *Please provide the title of a YouTube video*\n\nExample: !${command} Yuki Suou`, m)
  }

  const icons = 'https://example.com/default-thumbnail.jpg' // Define a placeholder URL for icons
  const channel = 'https://www.youtube.com/channel/UCexample' // Define a placeholder URL for the channel
  const fkontak = { // Define fkontak with placeholder values
    displayname: 'YouTube Search Bot',
    number: '1234567890',
    vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:YouTube;Search Bot;;;\nTEL:1234567890\nEND:VCARD'
  }

  conn.reply(m.chat, 'Please wait...', m, {
    contextInfo: { externalAdReply: {
      mediaUrl: null,
      mediaType: 1,
      showAdAttribution: true,
      title: packname,
      body: wm,
      previewType: 0,
      thumbnail: icons,
      sourceUrl: channel // Using the defined channel URL
    }}
  })

  let results = await yts(text)
  let tes = results.all
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `🌸 *Title:* 
» ${v.title}

🔗 *Link:* 
» ${v.url}

🕝 *Duration:*
» ${v.timestamp}

🚩 *Uploaded:*
» ${v.ago}

👀 *Views:* 
» ${v.views}`
    }
  }).filter(v => v).join('\n\n••••••••••••••••••••••••••••••••••••\n\n')

  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, fkontak, m)
}

handler.help = ['ytsearch']
handler.tags = ['search']
handler.command = /^playlist|ytsearch|yts(earch)?$/i

handler.register = true
handler.stars = 1

export default handler