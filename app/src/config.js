const port = 8888;
const host = 'localhost';

const messageTypes = [
    'gameCreatedEvent',
    'userJoinedGameEvent'
].reduce((accum, msg) => {
    accum[msg] = msg;
    return accum;
}, {});

module.exports = {
    messageTypes,
    uri: `http://${host}:${port}`
};