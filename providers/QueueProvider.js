"use strict";
const { hooks } = use("@adonisjs/ignitor");
const QueueJob = require("../src/Queue/Job");
const ProducerQueue = require("../src/Queue/Managers/Producer");
const ConsumerQueue = require("../src/Queue/Managers/Consumer");
const { ServiceProvider } = use("@adonisjs/fold");

class QueueProvider extends ServiceProvider {
  register() {
    this.app.bind("Adonis/Src/Queue/Job", () => {
      return QueueJob;
    });
    this.app.singleton("Adonis/Src/Queue/Managers/Producer", app => {
      return new ProducerQueue(app.use("Adonis/Src/Config"), app.use("Adonis/Src/Logger"));
    });
    this.app.bind("Adonis/Src/Queue/Managers/Consumer", app => {
      return new ConsumerQueue(app.use("Adonis/Src/Config"), app.use("Adonis/Src/Logger"));
    });
   
    
    hooks.before.httpServer(() => {
      const QueueManager = use("Adonis/Src/Queue/Managers/Producer");
      QueueManager.createConnections();
    });
  }
}

module.exports = QueueProvider;
