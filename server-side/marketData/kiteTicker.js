const kiteTicker = require('kiteconnect').KiteTicker;
const fetchData = require('./fetchToken');
// const ticker = new kiteTicker({
//     api_key: nq0gipdzk0yexyko,
//     access_token: dRHu1ZYNP2J11JZOq4u3i0oXD7nM39vp, 
// });
let ticker;
const createNewTicker = (api_key, access_token) => {
    ticker = new kiteTicker({
        api_key,
        access_token 
    });

    ticker.connect();
    ticker.autoReconnect(true, 10000000000, 5);
    console.log('ticker is', ticker);
    return ticker;    
}

const disconnectTicker = () => {
    console.log('disconnecting ticker');
    ticker.disconnect();
}

const subscribeTokens = async() => {
    console.log(ticker);
    const tokens = await fetchData('nq0gipdzk0yexyko','3oaejV3W4O56Bwk46QNQElg3n3HlIapg');
    ticker.subscribe(tokens);
}

const getTicks = (socket) => {
    ticker.on('ticks', (ticks) => {
        console.log(ticks);
        socket.emit('tick', ticks);
    });
}

const getTicker = () => ticker;
module.exports = {createNewTicker, disconnectTicker, subscribeTokens, getTicker, getTicks};