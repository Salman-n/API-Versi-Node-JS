
var activeServer = [];

//initalize express
var express = require('express');
var app = express();
//parse json
 
app.use(express.json());

//create a route /hadir that will log the current active server
app.post('/hadir', function(req, res){
    const {service_id,service_type,service_name,service_url,last_active} = req.body;
    //check activeServer array of object. if object with the same server id exist
    //update the last_active property
    //else push the object to the array
    var server = activeServer.find(server => server.service_id === service_id);
    if(server){
        server.last_active = last_active;
        //update array
        activeServer[activeServer.indexOf(server)] = server;
    } else {
        //create a new server object on activeServer array 
        activeServer.push({service_id,service_type,service_name,service_url,last_active});
        console.log('service ' + service_id + ' ' + service_name + ' is connected succesfully 😂');
          
    }
    res.json({service_id,service_type,service_name,service_url,last_active})
});

//return a list for the gate server. just return the activeServer as json
app.get('/daftar', function(req, res){
    res.json(activeServer);
})

//check for every 30 second if last active is more than 30 second timestamp
setInterval(function(){
    activeServer.forEach(server => {
        if(server.last_active > Date.now() - 30000){
            console.log('service ' + server.service_id + ' ' + server.service_name + ' is down');
            activeServer.splice(activeServer.indexOf(server),1);
        }
    });
},15000)

//run a terminal like command. have "list" command and show the activeServer array
//i mean when the server is run on cli
app.listen(1000, function(){
    console.log('eureka listening on port 1000');
    //accept terminal like command here
    process.stdin.on('data', function(data){
        if(data.toString().trim() === 'list'){
            console.log(activeServer);
        } else {
            console.log("perintah tidak fadil. daftar perintah (list)")
        }
    })
})