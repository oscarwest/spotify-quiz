const port = 8888;
const host = 'localhost';

const messageTypes = [
    'WS_GAME_CREATED',
    'WS_USER_JOINED_GAME',
    'WS_GAME_STARTED',
    'WS_NEXT_QUESTION_RESPONSE',
    'WS_CLIENT_ANSWER',
    'WS_CLIENT_ANSWER_RESPONSE'
].reduce((accum, msg) => {
    accum[msg] = msg;
    return accum;
}, {});

module.exports = {
    messageTypes,
    uri: `http://${host}:${port}`
};