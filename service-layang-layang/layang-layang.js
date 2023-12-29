const Microservice = require("../Microservice.js")

// Example route handler function
function customRouteHandler(req, res) {
    const a = req.params.a;
    const b = req.params.b;
    const result = a * b / 2; // Custom logic
    console.log({a, b, result});
    res.json({a, b, result});
}

// Example usage with custom route handler
const microserviceConfig = {
    service_id:"LL1",
    service_type:"layang-layang",
    service_name:"Layang Layang Pertama",
    service_host:"http://localhost",
    service_port:4003
};

const segitigaMicroservice = new Microservice(microserviceConfig, customRouteHandler);
segitigaMicroservice.start();