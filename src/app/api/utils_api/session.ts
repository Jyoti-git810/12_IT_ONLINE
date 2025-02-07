const sessionIdToUserMap = new Map();

export const setUserSession = (id, user) => {
  console.log("id", id, user);
  sessionIdToUserMap.set(id, user);
};
export const getUserSession = (id) => {
  console.log("sessionIdToUserMap", sessionIdToUserMap);
  return sessionIdToUserMap.get(id);
};
