const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db:'mongodb://localhost/futurex',
      collection: 'logs',
      options: { useUnifiedTopology: true }
    })
  ]
});

module.exports = logger;