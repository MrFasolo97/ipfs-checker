const request = require('request');
const { execFile } = require('child_process');
var iter = 0
const local_url = 'http://localhost:5002'
const verbose = false

function checkDelay() {
        request.get({
          uri: (local_url + "/webui"),
          json: true,
          headers: {'User-Agent': 'request'}
        }, (err, response, data) => {
          if (err) {
            restart('ipfs')
          } else if (response != null && response.statusCode === 301) {
            console.log('Status:', response.statusCode);
            restart('ipfs')
          }
        });
      }
}

function restart(service) {
  console.log(`${service} restarting...`)
  execFile('systemctl', ['restart', service], (error, stdout, stderr) => {
    if (error) throw error
    console.log(`${service} restarted !`)
  })
}
setInterval(checkDelay, 3000)
