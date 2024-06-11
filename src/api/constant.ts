export const host= 'http://' + window.location.hostname + ':8080';
// export const host= 'http://chatgptych.online:8080';
export const verifyLogin= `${host}/login`;
export const register= `${host}/register`;
export const listScene = `${host}/list/scene`;
export const createScene = `${host}/create/scene`;
export const models = `${host}/models`;
export const listChatHistory = `${host}/list/history`;
export const chatcompletion = `${host}/chat/completion`;
export const chatStream = `${host}/chat/stream`;
