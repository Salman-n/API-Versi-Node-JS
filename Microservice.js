const express = require('express');
const request = require('request');
const {fusatEureka} = require("./constants.js")

class Microservice {
    constructor(config, routeHandler) {
        this.app = express();
        this.app.use(express.json());

        this.serverInfo = {
            service_id: config.service_id ,
            service_type: config.service_type ,
            service_name: config.service_name || "Untitled Microservice" ,
            service_host: config.service_host ,
            service_port: config.service_port
        };

        this.setupRoutes(routeHandler);
        this.setupEurekaPing();
        this.setupServer();
    }

    setupRoutes(routeHandler) {
        // Use the provided route handler or a default one
        this.app.get('/service/:a/:b', routeHandler);
    }

    setupEurekaPing() {
        setInterval(() => {
            const json = {
                service_id: this.serverInfo.service_id,
                service_type: this.serverInfo.service_type,
                service_name: this.serverInfo.service_name,
                service_url: this.serverInfo.service_host + ":" + this.serverInfo.service_port + "/",
                last_active: Math.floor(Date.now() / 1000)
            };

            request.post({url: fusatEureka + 'hadir', json}, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    console.log("pinged eureka successfully");
                } else {
                    console.log("failed pinging eureka ", error, response?.statusCode, response?.data);
                }
            });
        }, 5000);
    }

    setupServer() {
        // Customize your server setup here
        // this.app.listen(config.service_port, () => {
        //     console.log('service ' + config.service_type + ' listening on port ' + config.service_port);
        // });
    }
    start() {
         this.app.listen(this.serverInfo.service_port, () => {
            console.log('service ' + this.serverInfo.service_type + ' listening on port ' + this.serverInfo.service_port);
        });
    }
}
module.exports = Microservice;