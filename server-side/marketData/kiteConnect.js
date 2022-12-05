var KiteConnect = require('kiteconnect').KiteConnect;
const express = require('express');
const router = express.Router();
const fetchData = require('./fetchToken');
const { Server } = require('socket.io');
const axios = require('axios');

const io = new Server(9000, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH'],
  },
});
let socket1 = '';
io.on("connection", (socket) => {
  console.log(socket.id);
  socket1 = socket;
  socket.on('hi', (data) => {
    console.log(data);
  });
});

async function parameters() {
  console.log("inside function");
  let getAccessToken;
  let getApiKey;

  try{
    console.log("inside try 1");
    let accessTokenResp = await axios.get("http://localhost:5000/readRequestToken")
    let apiKeyResp = await axios.get("http://localhost:5000/readAccountDetails")

    for(let elem of accessTokenResp.data){
      for(let subElem of apiKeyResp.data){
        console.log("inside 2");
          if(elem.accountId === subElem.accountId && elem.status === "Active" && subElem.status === "Active"){
              getAccessToken = elem.accessToken;
              getApiKey = subElem.apiKey
          }
      }
    }

  } catch(err) {
    return new Error(err);
  }

  try{
    console.log("inside try 2");
    if(getApiKey !== undefined && getAccessToken !== undefined){
      var api_key = getApiKey;

      var options = {
        api_key: api_key,
        debug: false,
      };
    
      let kc = new KiteConnect(options);
      console.log("key token", getApiKey, getAccessToken);
      let token = await fetchData(getApiKey, getAccessToken);
      console.log(token);
      var KiteTicker = require('kiteconnect').KiteTicker;
      var ticker = new KiteTicker({
        api_key: getApiKey,
        access_token: getAccessToken,
      });
      // console.log(ticker);
   
      ticker.autoReconnect(true, 3, 5);
      ticker.connect();
      ticker.on('ticks', onTicks);
      ticker.on('connect', subscribe);
      ticker.on('connect', onConnect);
      ticker.on('disconnect', onDisconnect);
      ticker.on('error', onError);
      ticker.on('close', onClose);
      // ticker.on("order_update", onTrade)
      ticker.on("noreconnect", function () {
        ticker.disconnect();
        console.log("noreconnect");
      });
    
      ticker.on('reconnecting', function (reconnect_interval, reconnections) {
        console.log(
          'Reconnecting: attempt - ',
           reconnections,
          ' innterval - ',
          reconnect_interval
        );
      });
    
      function onConnect() {
        console.log('connected');
      }
    
      function onTicks(ticks) {
        // console.log('Ticks', ticks);
        if(token.length === ticks.length){
          socket1.emit('tick', ticks);
        }
      }
  
      function onDisconnect(error) {
        console.log('Closed connection on disconnect');
      }
    
      function subscribe() {
        var items = token;
        console.log('subscribe', ticker.subscribe(items));
        ticker.setMode(ticker.modeFull, items);
      }
    
      async function orderUpdateFunc() {
        // console.log("updated order", orderUpdate)
      }
 
      function onError(error) {
        console.log('Closed connection on error', error);
      }
    
      function onClose(reason) {
        console.log('Closed connection on close', reason);
      }
    
      let orderUpdate3 = {};
      async function onTrade(order) {
        console.log('Order update', order);
        const order2 = order;
    
        orderUpdate3 = await order2;
        await executerr(orderUpdate3);
      }    

    }
    else{
      console.log("no token");
      const data = "Please enter a valid access token or api key";
      socket1.emit('noToken', data);
    }

  } catch (err){
    throw new Error(err);
  }

}
module.exports = parameters;