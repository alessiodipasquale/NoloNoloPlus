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


module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    deleteGroup    
}