const Microservice = require("../Microservice.js")

// Example route handler function
function customRouteHandler(req, res) {
    const a = req.params.a;
    const b = req.params.b;
    const result = a * b ; // Custom logic
    console.log({a, b, result});
    res.json({a, b, result});
}

// Example usage with custom route handler
const microserviceConfig = {
    service_id:"PP1",
    service_type:"persegi-panjang",
    service_name:"Persegi Panjang Pertama",
    service_host:"http://localhost",
    service_port:3000
};

const persegiMicroservice = new Microservice(microserviceConfig, customRouteHandler);
persegiMicroservice.start();