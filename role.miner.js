const creepRole = require('./role');

class roleMiner extends creepRole {
    constructor(name, parts) {
        super('miner', [WORK, WORK, CARRY, MOVE]);
    }

    run(creep, f) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }else {
            let containers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                filter: function(object) {
                    if (object.structureType == STRUCTURE_CONTAINER)
                        //TODO: minimun enegry limit
                        //if(object.getUsedCapacity(RESOURCE_ENERGY) > 50 ) 
                            return true;            
                    return false;
                }
            });
            if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

};

module.exports = new roleMiner;