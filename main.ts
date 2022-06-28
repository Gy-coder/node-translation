const https = require('https');

const translate = (word) => {
  const options = {
    hostname: 'api.fanyi.baidu.com/',
    port: 443,
    path: '/api/trans/vip/translate',
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.end();
};

module.exports = { translate };
