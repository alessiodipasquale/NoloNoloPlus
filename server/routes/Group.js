const GroupModel = require("../models/GroupModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToItem, getItemById } = require("./Item");

const getGroupById = async (id) => {
    const group = await GroupModel.findById(id)
    return group;
}

const getGroups = async () => {
    const groups =  await GroupModel.find();
    return groups;
}

const deleteGroup = async () => {
    const group = await GroupModel.deleteOne({_id: id})
    if(!group)
        throw BadRequestError;
}

const createGroup = async (object) => {
    if(!object.items || !object.name)
        throw BadRequestError;

    for(let itId of object.items){
        const item = await getItemById(itId);
        if(item.groupId)
            throw BadRequestError;
    }

    const group = await RentalModel.create(object);
    for(let itId of object.items){
        await associateToItem("single", "groupId", group._id, itId )
    }
    return group;
}

const deleteAssociationToGroup = async (groupId, toDelete) => {
    const group = await getGroupById(groupId);
    let elem = JSON.stringify(group);
    elem = JSON.parse(elem);
    
    let items = elem.items.filter(e => e != toDelete)
    await GroupModel.updateOne({_id: groupId},{ $set: { "items": items} });
}

module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    deleteGroup,
    deleteAssociationToGroup
    
}