const {fusatEureka} = require("../constants.js")

var activeList = [];

//initalize express
var request = require('request');
var express = require('express');
var app = express();
//parse json
 
app.use(express.json());

app.get('/:a/:b/:type', function(req, res){
    const {a,b,type} = req.params;
    //find on activeList for "service_type" = "segitiga"
    const result = activeList.find(item => item.service_type === type);
    //if result is not undefined
    if(result !== undefined){
        //send request to the result.service_url + "/segitiga"
        request.get(result.service_url + 'service/'+a+'/'+b,function(err,resx,body){
            if(err) {
                console.log(err);
                res.json({error:"failed reaching service"})
            } else {
                console.log(body);
                res.json(JSON.parse(body))
            }
         
        })
    } else {
        res.json({error:"No segitiga service is running"})
    }
});



//check for every 30 second if last active is more than 30 second timestamp
setInterval(function(){
   //fetch eureka get and set the response to activeList variable array
 fetchEureka();
},5000)

function fetchEureka() {
    request.get(fusatEureka + 'daftar',function(err,res,body){
        if(err) {console.log(err)}//TODO: handle err
        if(res.statusCode === 200 ) {
            //set response data as the value of activeList array
            activeList = JSON.parse(res.body);
        } //etc
        //TODO Do something with response
      });
}

//run a terminal like command. have "list" command and show the activeServer array
//i mean when the server is run on cli
app.listen(2000, function(){
    console.log('gate listening on port 2000');
    fetchEureka();
    //accept terminal like command here
    process.stdin.on('data', function(data){
        if(data.toString().trim() === 'route'){
            console.log(activeList);
        } else {
            console.log("perintah tidak fadil. daftar perintah (list)")
        }
    })
})