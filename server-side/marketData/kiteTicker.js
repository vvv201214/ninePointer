const kiteTicker = require('kiteconnect').KiteTicker;
const fetchData = require('./fetchToken');
const getKiteCred = require('./getKiteCred'); 


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
    // const tokens = await fetchData('nq0gipdzk0yexyko','3oaejV3W4O56Bwk46QNQElg3n3HlIapg');
    // console.log(tokens)
    // ticker.subscribe(tokens);


    getKiteCred.getAccess().then(async (data)=>{
        // console.log(data);
        let tokens = await fetchData(data.getApiKey, data.getAccessToken);
    
        // subscribeTokens();
        // getTicks(socket, tokens);
        // onError();
        // console.log(tokens)
        ticker.subscribe(tokens);
  
      });


}

const unSubscribeTokens = async(token) => {
    console.log("unsubscribe");
    let tokens = [];
    tokens.push(token)
   let x =  ticker.unsubscribe(tokens);
  //  console.log("unsubscribed token", x, tokens);
}

const getTicks = (socket, tokens) => {
    ticker.on('ticks', (ticks) => {
      if(ticks.length == tokens.length){
        // console.log('sending ticks', ticks);
        socket.emit('tick', ticks); 
      }
    });
}

const onError = ()=>{
    ticker.on('error', (error)=>{
      // console.log(error);
    });
}


const getTicker = () => ticker;
module.exports = {createNewTicker, disconnectTicker, subscribeTokens, getTicker, getTicks, onError, unSubscribeTokens};