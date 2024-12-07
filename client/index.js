const axios = require('axios');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name:"Dinesh"
  });

  console.log({ gift });
}

main();