'use strict'

const ace = require('@adonisjs/ace')
const { ServiceProvider } = require('@adonisjs/fold')

class CommandsProvider extends ServiceProvider {
  register () {
   const commands = ["Init", "Job", "Work"];
    commands.forEach(command => {
      this.app.bind(`Adonis/Commands/Queue:${command}`, () => {
        return require(`../commands/${command}`);
      });
    })
  }

  boot () {
    ace.addCommand('Adonis/Commands/Queue:Init')
    ace.addCommand('Adonis/Commands/Queue:Job')
    ace.addCommand('Adonis/Commands/Queue:Work')
  }
}

module.exports = CommandsProvider
