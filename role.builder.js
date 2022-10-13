const creepRole = require('./role');

class roleBuilder extends creepRole {
    constructor(name, parts) {
        super(name, [WORK, CARRY, MOVE]);
        this.name = 'builder';
        this.body = [WORK, CARRY, MOVE];
    }
 
    run(creep, freeEnergy) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {	        
            super.findFreeEnergy(creep, freeEnergy);
	    }
	};
}

module.exports = new roleBuilder;