const Store = require('./Store.js');
const { Collection } = require('discord.js');

class CommandStore extends Store {
    constructor(client) {
        super(client, 'commands');

        this.aliases = new Collection();
    }

    get(name) {
        return super.get(name) || this.aliases.get(name);
    }

    has(name) {
        return super.has(name) || this.aliases.has(name);
    }

    set(command) {
        super.set(command);

        if (command.aliases.length > 0) {
            for (let i = 0; i < command.aliases.length; i++) {
                this.aliases.set(command.aliases[i], command);
            }
        }

        return command;
    }

    clear() {
        super.clear();
        this.aliases.clear();
    }
}

module.exports = CommandStore;