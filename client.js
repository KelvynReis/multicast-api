const dgram = require('dgram');

const PORT = 8000;
const HOST = '127.0.0.1';
const  MCAST_ADDR = '230.185.192.108';

// const message = new Buffer.from('Ola servidor')

//creating a client socket
const client = dgram.createSocket('udp4');

client.on('listening', function () {
    var address = client.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
    client.setBroadcast(true)
    client.setMulticastTTL(128); 
    client.addMembership(MCAST_ADDR, HOST);
});

client.connect(PORT, HOST , (e) =>{
    //console.log(e);
   
})



client.on('message', function (message, remote) {   
    console.log('Multicast MSG: From: ' + remote.address + ':' + remote.port +' - ' + message);
});


    // client.send(message, PORT,HOST, (err) =>{
    //     if(err){
    //         client.close()
    //     }else{
    //         console.log('UDP message sent to ' + HOST +':'+ PORT);
    //     }
    // })