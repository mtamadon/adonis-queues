"use strict";
const Client = require("../Clients/Producer");

class QueueManager {
  /**
   * Creates a new instance.
   *
   * @param {Object} Config
   */
  constructor(Config, Logger) {
    this._connections = {};
    const queueConfig = Config.get("queue");
    // for (let connectionName in queueConfig.connections) {

    //   let config = queueConfig.connections[connectionName];
    //   this._connections[connectionName] = new Client(connectionName, Logger, config);
    // }
    let config = queueConfig.connections['job'];
    this._connections['job'] = new Client('job', Logger, config);

    this._defaultConnection = this._connections['jobs'];
  }

  /**
   * This method is used to get connection object.
   *
   * @param {String} [name]
   * @returns {Client}
   */
  connection(name = null) {
    const connection = !name ? this._defaultConnection : this._connections[name];
    if (!connection) {
      throw new Error("Queue connection doesn't exists");
    }
    return connection;
  }

  /**
   * This method is used to connect and monitor connections.
   *
   * @returns {Void}
   */
  createConnections() {
    console.log
    this._connections['job'].createConnection();

  }

  /**
   * This method is used to push item to queue.
   *
   * @param {String} queue
   * @param {Object} data
   * @returns {Boolean}
   */
  async push(queue, data) {
    this._defaultConnection.push(queue, data);
  }
}

module.exports = QueueManager;
