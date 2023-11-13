const fs = require('fs');
const dotenv = require('dotenv');


const envFile = './apps/steps-proxy/.env.serve.production';

const envProduction = dotenv.parse(fs.readFileSync(envFile));

console.info(`Loaded env from file ${envFile}:`, envProduction);

module.exports = {
  apps: [{
    name: 'steps-proxy',
    script: './apps/steps-proxy/scripts/start-steps-proxy.sh',
    interpreter: "bash",
    env: envProduction
  }]
};
