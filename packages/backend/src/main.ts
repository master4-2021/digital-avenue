import app from './app';

const host = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || 3000;

const main = async () => {
  try {
    app.listen(Number(port), host, () => {
      console.log(`Listening on port ${port} ....`);
    });
  } catch (err) {
    console.log(`Unable to start the server: ${err}`);
  }
};

main();
