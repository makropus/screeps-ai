const creepRole = require('role');

class roleUpgrader extends creepRole {
    constructor(name, parts) {
        super(name, [WORK, CARRY, MOVE]);
        this.name = 'upgrader';
        this.body = [WORK, CARRY, MOVE];
    }

    run(creep, freeEnergy) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {            	        
            super.findFreeEnergy(creep, freeEnergy);
        }
	}
};

module.exports = new roleUpgrader;