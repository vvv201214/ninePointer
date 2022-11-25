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
io.on('connection', (socket) => {
  console.log(socket.id);
  socket1 = socket;
  socket.on('hi', (data) => {
    console.log(data);
  });
});
async function parameters() {
  let accessTokenResp = await axios.get("http://localhost:5000/readRequestToken")
  let getAccessToken = (accessTokenResp.data)[0].accessToken

  let apiKeyResp = await axios.get("http://localhost:5000/readAccountDetails")
  let getApiKey = (apiKeyResp.data)[0].apiKey

  var api_key = getApiKey;

  var options = {
    api_key: api_key,
    debug: false,
  };

  let kc = new KiteConnect(options);

  let token = await fetchData(getApiKey, getAccessToken);
  console.log(token);
  var KiteTicker = require('kiteconnect').KiteTicker;
  var ticker = new KiteTicker({
    api_key: getApiKey,
    access_token: getAccessToken,
  });
  // console.log(ticker);
  ticker.autoReconnect(true, 100, 5);
  ticker.connect();
  ticker.on('ticks', onTicks);
  ticker.on('connect', subscribe);
  ticker.on('connect', onConnect);
  ticker.on('disconnect', onDisconnect);
  ticker.on('error', onError);
  ticker.on('close', onClose);
  // ticker.on("order_update", onTrade)

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
    // console.log('random', socket1);
    // io.on('connection', (socket) => {
    //   console.log(socket.id);
    // console.log('Ticks', ticks);
    if(token.length === ticks.length){
      socket1.emit('tick', ticks);
      
    }
  }

  function subscribe() {
    var items = token;
    console.log('subscribe', ticker.subscribe(items));
    ticker.setMode(ticker.modeFull, items);
  }

  async function orderUpdateFunc() {
    // console.log("updated order", orderUpdate)
  }

  function onDisconnect(error) {
    console.log('Closed connection on disconnect', error);
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
module.exports = parameters;