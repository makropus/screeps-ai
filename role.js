var partPrice = require('const');

class creepRole {
    constructor(name, parts) {
        this.name = name;
        this.body = parts;
        this.creeps = []; //TODO: ? creeps stored in here
    }

    price(){
        var price = 0;
        for(var part of this.body)
            price +=  partPrice.get(part);
        return price;
    }

    findFreeEnergy(creep, freeEnergy){
        if (creep.pickup(freeEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ||
            creep.withdraw(freeEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(freeEnergy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
    
};

module.exports = creepRole;
