// Entrypoint da Serverless Function (Vercel). O app é compilado por `npm run build` em dist/.
module.exports = require('../dist/app.js').default;
