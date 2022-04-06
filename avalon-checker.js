var maxDelay = 30
const request = require('request');
const { execFile } = require('child_process');
var iter = 0
const local_url = 'http://localhost:3001'
const external_url = 'https://dtube.fso.ovh'
var last_count = 0
var same_block_counter = 0
const verbose = false

function checkDelay() {
  request.get({
      uri: (external_url + '/count'),
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        same_block_counter = same_block_counter+1
        console.log('Error:', err);
        if (same_block_counter > maxDelay) {
          same_block_counter = 0;
          console.log('\ndiff='+diff+'\nsame_block_counter='+same_block_counter+'\n Delay has been detected!!')
          restart('avalon')
        }
      } else if (res.statusCode !== 200) {
        request.get({
          uri: (local_url + '/count'),
          json: true,
          headers: {'User-Agent': 'request'}
        }, (err, response, data) => {
          if (response != null && response.statusCode === 200) {
            console.log('Status:', response.statusCode);
            restart('forward-avalon')
          }
        });
      } else {
        if (err) throw err
        var diff = data.count-last_count
        if (data.count==last_count) {
          same_block_counter = same_block_counter+1
        } else {
          same_block_counter = 0
        }
        if (same_block_counter > maxDelay) {
          console.log('\ndiff='+diff+'\nsame_block_counter='+same_block_counter+'\n Delay has been detected!!')
          restart('avalon')
          same_block_counter = 0
        } else {
          iter++
          if (verbose) {
            process.stdout.write('diff: '+diff+' ')
            process.stdout.write('Same block counter: '+same_block_counter+'\n')
            if (iter%20 == 0) process.stdout.write('\n')
          }
        }
        last_count = data.count
      }
  });
}

function restart(service) {
  console.log(`${service} restarting...`)
  execFile('systemctl', ['restart', service], (error, stdout, stderr) => {
    if (error) throw error
    console.log(`${service} restarted !`)
  })
}
setInterval(checkDelay, 3000)
