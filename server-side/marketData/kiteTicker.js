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

const disconnectTicker = (ticker) => {
    ticker.disconnect();
}

const subscribeTokens = async() => {
    console.log(ticker);
    const tokens = await fetchData('nq0gipdzk0yexyko','DKW7CYJN50QSnjgzahQ9UjJqPFrChzOh');
    ticker.subscribe(tokens);
}
module.exports = {createNewTicker, disconnectTicker, subscribeTokens};