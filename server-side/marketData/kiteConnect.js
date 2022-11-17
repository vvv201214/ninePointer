var KiteConnect = require('kiteconnect').KiteConnect;
const express = require('express');
const router = express.Router();
const fetchData = require('./fetchToken');
const { Server } = require('socket.io');
const TradeData = require('../models/TradeDetails/allTradeSchema');
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
  // ticker.on('order_update', (odr, res) => {
  //   /*
  //    This will recieve all order update of user associated by access_token
  //      */
  //   console.log('order_updated', odr);

  //   const {
  //     guid,
  //     status,
  //     account_id,
  //     placed_by,
  //     exchange_order_id,
  //     order_id,
  //     order_timestamp,
  //     exchange_timestamp,
  //     exchange_update_timestamp,
  //     variety,
  //     exchange,
  //     tradingsymbol,
  //     order_type,
  //     transaction_type,
  //     validity,
  //     quantity,
  //     product,
  //     average_price,
  //   } = odr;
  //   if (status === 'COMPLETE') {
  //     if (
  //       !guid ||
  //       !status ||
  //       !account_id ||
  //       !placed_by ||
  //       !exchange_order_id ||
  //       !order_id ||
  //       !order_timestamp ||
  //       !exchange_timestamp ||
  //       !exchange_update_timestamp ||
  //       !variety ||
  //       !exchange ||
  //       !tradingsymbol ||
  //       !order_type ||
  //       !transaction_type ||
  //       !validity ||
  //       !quantity ||
  //       !product
  //     ) {
  //       console.log(Boolean(guid));
  //       console.log(Boolean(status));
  //       console.log(Boolean(account_id));
  //       console.log(Boolean(placed_by));
  //       console.log(Boolean(exchange_order_id));
  //       console.log(Boolean(order_id));
  //       console.log(Boolean(order_timestamp));
  //       console.log(Boolean(exchange_timestamp));
  //       console.log(Boolean(exchange_update_timestamp));
  //       console.log(Boolean(variety));
  //       console.log(Boolean(exchange));
  //       console.log(Boolean(tradingsymbol));
  //       console.log(Boolean(order_type));
  //       console.log(Boolean(transaction_type));
  //       console.log(Boolean(validity));
  //       console.log(Boolean(quantity));
  //       console.log(Boolean(product));
  //       console.log(Boolean(average_price));
  //       console.log('data nhi h pura');
  //       return res.status(422).json({ error: 'plz filled the field...' });
  //     }

  //     TradeData.findOne({ order_id: order_id })
  //       .then((dateExist) => {
  //         if (dateExist) {
  //           console.log('data already');
  //           return res.status(422).json({ error: 'data already exist...' });
  //         }
  //         const tradeData = new TradeData({
  //           guid,
  //           status,
  //           account_id,
  //           placed_by,
  //           exchange_order_id,
  //           order_id,
  //           order_timestamp,
  //           exchange_timestamp,
  //           exchange_update_timestamp,
  //           variety,
  //           exchange,
  //           tradingsymbol,
  //           order_type,
  //           transaction_type,
  //           validity,
  //           quantity,
  //           product,
  //         });

  //         tradeData.save();
  //         // .then(()=>{
  //         //   console.log(res);
  //         //     res.status(201).json({massage : "data enter succesfully"});
  //         //     console.log("data enter succesfully")
  //         // }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
  //       })
  //       .catch((err) => {
  //         console.log(err, 'fail');
  //       });
  //   }
  // });
  // ticker.on('order_update', orderUpdateFunc);
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
    // console.log('Ticks', ticks);
    // io.on('connection', (socket) => {
    //   console.log(socket.id);
    if(token.length === ticks.length)
    socket1.emit('tick', ticks);
    //   socket.on('hi', (data) => {
    //     console.log(data);
    //   });
    // });
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