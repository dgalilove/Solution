"use strict"


const ifApiBlocked = [
  {
    id: { videoId: "09R8_2nJtjg" },
    snippet: {
      title: "Maroon 5 - Sugar (Official Music Video)",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/09R8_2nJtjg/mqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "aJOTlE1K90k" },
    snippet: {
      title: "Maroon 5 - Girls Like You ft. Cardi B (Official Music Video)",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/aJOTlE1K90k/mqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "6g6g2mvItp4" },
    snippet: {
      title: "Maroon 5 - Misery (Official Music Video)",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/6g6g2mvItp4/mqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "SlPhMPnQ58k" },
    snippet: {
      title: "Maroon 5 - Memories (Official Video)",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/SlPhMPnQ58k/mqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "XPpTgCho5ZA" },
    snippet: {
      title: "Maroon 5 - This Love",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/XPpTgCho5ZA/mqdefault.jpg" },
      },
    },
  },
]

function getVideos() {
  const search = document.querySelector("[name='search-bar']").value
  getWiki(search) 
  const videoUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${"AIzaSyCoWxPRSKVgHAcPYys-BPcNR01XX_IFG3s"}&q=${search}`

  axios
    .get(videoUrl)
    .then((res) => {
      const videos = res.data.items
      renderOptions(videos)
      renderVideo(videos[0].id.videoId) 
    })
    .catch((error) => {
      error
      ApiBlocked() 
    })
}

function getWiki(search) {
  const wikiUrl = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&format=json&srsearch=${search}`

  axios.get(wikiUrl).then((res) => {
    const results = res.data.query.search
    renderWikiInfo(results)
  })
}

function renderOptions(videos) {
  const elLinks = document.querySelector(".links")
  const elVideo = document.querySelector(".video")

  let strLinks = videos
    .map((video) => {
      return `
      <div class='link' onclick="renderVideo('${video.id.videoId}')">
        <img src="${video.snippet.thumbnails.medium.url}"  alt="">
        <p>${video.snippet.title}</p>
      </div>
    `
    })
    .join("")
  elLinks.innerHTML = strLinks
  elVideo.innerHTML = ""
}

function renderVideo(videoId) {
  const elVideo = document.querySelector(".video")
  elVideo.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${videoId}"></iframe>
  `
}

function renderWikiInfo(results) {
  const elInfo = document.querySelector(".info")

  const firstResult = results[0]
  const cleanSnippet = firstResult.snippet.replace(/<[^>]+>/g, "") 

  const strWikiResult = `
    <div class="wiki-result">
      <h2>${firstResult.title}</h2>
      <p>${cleanSnippet}</p>
    </div>
  `
  elInfo.innerHTML = strWikiResult
}

function ApiBlocked() {
  renderOptions(ifApiBlocked) 
  renderVideo(ifApiBlocked[0].id.videoId) 
}




