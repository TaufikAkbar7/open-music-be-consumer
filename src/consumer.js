require('dotenv').config()

const amqp = require('amqplib');
const PlaylistService = require('./service/PlaylistService');
const MailtrapService = require('./service/Mailtrap');
const Listener = require('./Listener');

const init = async () => {
  const playlistService = new PlaylistService();
  const mailtrapService = new MailtrapService();
  const listener = new Listener(playlistService, mailtrapService);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:playlists', listener.getMessagePlaylist, { noAck: true });
};

init();