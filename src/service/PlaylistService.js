const { Pool } = require('pg')
const NotFoundError = require('../exceptions/notFoundError')
const { DTOSongsPlaylist } = require('../dto/playlists')

class PlaylistsService {
  constructor() {
    this._pool = new Pool()
  }

  async getSongOnPlaylist(id) {
    const query = {
      name: 'get-song-on-playlist',
      text: `
        SELECT 
          tp.id as id,
          tp."name" as name,
          tu.username  as username,
          ts.title as song_title,
          ts.performer as song_performer,
          ts.id as song_id
        FROM t_playlist_songs AS tps
          INNER JOIN t_playlists AS tp ON tps.playlist_id = tp.id
          INNER JOIN t_song AS ts ON tps.song_id = ts.id
          INNER JOIN t_users AS tu ON tp.owner = tu.id
        WHERE tp.id = $1;
      `,
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Lagu berdasarkan playlist tidak ditemukan')
    }

    return DTOSongsPlaylist(result.rows)
  }
}

module.exports = PlaylistsService
