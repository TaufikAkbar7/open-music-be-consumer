const DTOSongsPlaylist = (data = []) => {
  const mappingResults = data.reduce((acc, item) => {
    let obj = acc
    if (!obj) {
      obj = {
        id: item.id,
        name: item.name,
        username: item.username,
        songs: []
      }
    }
    if (item.song_id && item.song_title && item.song_performer) {
      obj.songs.push({
        id: item.song_id,
        title: item.song_title,
        performer: item.song_performer
      })
    }
    return obj
  }, null)
  return mappingResults
}

module.exports = { DTOSongsPlaylist }
