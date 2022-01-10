const GroupModel = require("../models/GroupModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToItem } = require("./associations/AssociationManager");
const { getItemById } = require("./Item");

const getGroupById = async (id) => {
    const group = await GroupModel.findById(id)
    return group;
}

const getGroups = async () => {
    let groups =  await GroupModel.find();
    for(let group of groups){
        let items = []
        for(let itemId of group.items){
            const item = await getItemById(itemId)
            items.push(item) 
        }
        group.items = items;
    }
    return groups;
}

const deleteGroup = async (id) => {
    const functionalObj = {
        items: []
    }
    await editGroup(id, functionalObj);
    const group = await GroupModel.deleteOne({_id: id})
    if(!group)
        throw BadRequestError;
}

const createGroup = async (object) => {
    console.log(object);
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
    const group = await getGroupById(groupId);
    let secureObject = JSON.stringify(group);
    secureObject = JSON.parse(secureObject);

    if(object.name)
        secureObject.name = object.name;
    if(object.items){
        let oldAssociatedItems = secureObject.items;
        let toRemove = oldAssociatedItems.filter(x => !object.items.includes(x));
        let toAdd = object.items.filter(x => !oldAssociatedItems.includes(x));
        for(let elem of toRemove){
            deleteAssociationToItem(elem,groupId)
        }
        for(let elem of toAdd){
            associateToItem("single", "groupId", groupId, elem);
        }
        secureObject.items = object.items;
    }
    await GroupModel.updateOne({_id: groupId},secureObject);
    return null;
}


module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    deleteGroup,
    editGroup    
}