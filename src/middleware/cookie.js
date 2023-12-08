const sessiopnIdToUserMap = new Map();

export function setUser(sessionid, user) {
    sessiopnIdToUserMap.set(sessionid, user);
}

export function getUser(sessionid, user) {
    return sessiopnIdToUserMap.set(sessionid);
}

