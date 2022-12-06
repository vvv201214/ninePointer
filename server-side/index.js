const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const kiteConnect = require('./marketData/kiteConnect');
const fetch = require('./marketData/placeOrder');
app.use(require("cookie-parser")());

dotenv.config({ path: './config.env' });

console.log(kiteConnect);
app.get('/api/v1/ws', kiteConnect);
app.get('/api/v1/data', fetch);

// app.get('/ws', kiteConnect);
// app.get('/data', fetch);
app.use(cors({
  credentials:true,
  origin: "http://localhost:3000"
}));

app.use(express.json());
// app.use(require("./marketData/livePrice"));
// app.use(require("./routes/user/userLogin"));
// app.use(require('./routes/TradeData/getUserTrade'));
// app.use(require('./routes/TradeData/getCompanyTrade'));
// app.use(require('./routes/AlgoBox/exchangeMappingAuth'));
// app.use(require('./routes/AlgoBox/instrumentAlgoAuth'));
// app.use(require('./routes/AlgoBox/productMappingAuth'));
// app.use(require('./routes/AlgoBox/tradingAlgoAuth'));
// app.use(require("./marketData/getRetrieveOrder"));
// app.use(require('./marketData/placeOrder'));
// app.use(require('./routes/instrument/instrumentAuth'));
// app.use(require('./routes/TradingAccountAuth/accountAuth'));
// app.use(require('./routes/TradingAccountAuth/brokerageAuth'));
// app.use(require('./routes/TradingAccountAuth/parameterAuth'));
// app.use(require('./routes/TradingAccountAuth/requestTokenAuth'));
// app.use(require('./routes/user/userDetailAuth'));
// app.use(require("./routes/user/everyoneRoleAuth"));
// app.use(require("./marketData/mockTrade"));




app.use('/api/v1', require("./marketData/livePrice"));
app.use('/api/v1', require("./routes/user/userLogin"));
app.use('/api/v1', require('./routes/TradeData/getUserTrade'));
app.use('/api/v1', require('./routes/TradeData/getCompanyTrade'));
app.use('/api/v1', require('./routes/AlgoBox/exchangeMappingAuth'));
app.use('/api/v1', require('./routes/AlgoBox/instrumentAlgoAuth'));
app.use('/api/v1', require('./routes/AlgoBox/productMappingAuth'));
app.use('/api/v1', require('./routes/AlgoBox/tradingAlgoAuth'));
app.use('/api/v1', require("./marketData/getRetrieveOrder"));
app.use('/api/v1', require('./marketData/placeOrder'));
app.use('/api/v1', require('./routes/instrument/instrumentAuth'));
app.use('/api/v1', require('./routes/TradingAccountAuth/accountAuth'));
app.use('/api/v1', require('./routes/TradingAccountAuth/brokerageAuth'));
app.use('/api/v1', require('./routes/TradingAccountAuth/parameterAuth'));
app.use('/api/v1', require('./routes/TradingAccountAuth/requestTokenAuth'));
app.use('/api/v1', require('./routes/user/userDetailAuth'));
app.use('/api/v1', require("./routes/user/everyoneRoleAuth"));
app.use('/api/v1', require("./marketData/mockTrade"));
require('./db/conn');

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});

const PORT = 5000;

// router.get("/dashboard", authentication, (req, res)=>{
//   console.log("hello my about");
//   res.send(req.user);
// })
app.listen(PORT);