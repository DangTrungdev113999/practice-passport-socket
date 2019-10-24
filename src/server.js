import express  from  'express';
const server = express();

server.get('/', (req, res) => res.send('Hello World!'))

server.listen(process.env.APP_PORT, () => {
  console.log(`running on ${process.env.APP_PORT}: ${process.env.APP_HOST}`)
})