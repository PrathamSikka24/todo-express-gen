import {HTTP} from '@cerbos/http';


// The Cerbos PDP instance
const cerbos = new HTTP("http://localhost:3592");

const SHOW_PDP_REQUEST_LOG = false;


module.exports = async (principalId, action, resourceAtrr = {}) => {
    const user = users.find((item) => item.id === Number(principalId));
    
    const cerbosObject = {
        resource: {
        kind: "todos",
        policyVersion: "default",
        id: resourceAtrr.id + "" || "new",
        attributes: resourceAtrr,
        },
        principal: {
        id: principalId + "" || "0",
        policyVersion: "default",
        roles: ["admin"],
        attributes: {},
        },
        actions: [action],
    };
    
    SHOW_PDP_REQUEST_LOG &&
        console.log("cerbosObject \n", JSON.stringify(cerbosObject, null, 4));
    
    const cerbosCheck = await cerbos.checkResource(cerbosObject);
    
    const isAuthorized = cerbosCheck.isAllowed(action);
    
    if (!isAuthorized)
        throw new Error("You are not authorized to visit this resource");
    return true;
    }

    export default isAuthorized;