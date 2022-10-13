const creepRole = require('./role');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');

var creepMother = require('creepMother');


var roles = [roleHarvester, roleUpgrader, roleBuilder, roleMiner];

var roleLimit = new Map([
    [roleUpgrader.name, 1],
    [roleHarvester.name, 0],
    [roleBuilder.name, 1],
    [roleMiner.name, 1],
]);


function getEnegrySourceStructures(){
    let targets = Game.spawns['Spawn1'].room.find(FIND_DROPPED_RESOURCES);
    let containers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: function(object) {
            if (object.structureType == STRUCTURE_CONTAINER)
                //TODO: minimun enegry limit
                //if(object.getUsedCapacity(RESOURCE_ENERGY) > 50 ) 
                    return true;            
            return false;
        }
    });
    targets = targets.concat(containers)
    return targets;    
};


module.exports.loop = function () {
    creepMother.bestFofPrice();

    var freeEnergy = getEnegrySourceStructures();
    //Delete dead creeps memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
    }
    for(var role of roles){
        var byRole = _.filter(Game.creeps, (creep) => creep.memory.role == role.name);
        if(byRole.length < roleLimit.get(role.name) &&  Game.spawns['Spawn1'].energy >= role.price()) {
            var newName = role.name + Game.time;
            console.log('Spawning new ' + role.name + ': ' + newName);
            console.log(Game.spawns['Spawn1'].spawnCreep(role.body, newName,
                {memory: {role: role.name,}}));
        }   
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        for (var role of roles)
            if (creep.memory.role == role.name)
                role.run(creep, freeEnergy);
    }
}