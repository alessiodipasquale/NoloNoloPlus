const GroupModel = require("../models/GroupModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToItem } = require("./associations/AssociationManager");

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

    const group = await GroupModel.create(object);
    for(let itId of object.items){
        await associateToItem("single", "groupId", group._id, itId )
    }
    return group;
}

const editGroup = async (groupId, object) => {
    if(object.name)
        await GroupModel.updateOne({_id: groupId},{ $set: { "name": object.name} });
    if(object.items){
        const group = await getGroupById(groupId);
        let elem = JSON.stringify(group);
        elem = JSON.parse(elem);
        let oldAssociatedItems = elem.items;
        let toRemove = oldAssociatedItems.filter(x => !object.items.includes(x));
        let toAdd = object.items.filter(x => !oldAssociatedItems.includes(x));
        for(let elem of toRemove){
            deleteAssociationToItem(elem,groupId)
        }
        for(let elem of toAdd){
            associateToItem("single", "groupId", groupId, elem);
        }
        await GroupModel.updateOne({_id: groupId},{ $set: { "items": object.items} });
    }
    return null;
}


module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    deleteGroup,
    editGroup    
}