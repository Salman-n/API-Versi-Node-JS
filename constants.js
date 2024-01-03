//create a const list and then export it
const eurekaPort = 1000;
const eurekaHost = "http://localhost"
const fusatEureka = eurekaHost + ":" + eurekaPort + "/";
//export all const
module.exports = {eurekaPort, eurekaHost, fusatEureka};