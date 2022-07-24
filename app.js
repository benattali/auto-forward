const { App } = require('@slack/bolt');
require('dotenv').config()

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

app.message("send", async ({ message, client, logger }) => {
  try {
    await client.chat.postMessage({
      channel: "C03RF61Q1LY",
      text: `sent by <@${message.user}>
      sent from <#${message.channel}>`
    });
  }
  catch (error) {
    logger.error(error)
  }
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
