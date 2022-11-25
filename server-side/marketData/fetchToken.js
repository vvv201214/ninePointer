const axios = require('axios');

const fetchData = async (getApiKey, getAccessToken) => {
  let date = new Date();
  const resp = await axios.get('http://localhost:5000/readInstrumentDetails');
  let ans = resp.data.filter((elem) => {
    return (
      elem.createdOn.includes(
        `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      ) && elem.status === 'Active'
    );
  });
  let addUrl = '';
  ans.forEach((elem, index) => {
    if (index === 0) {
      addUrl = 'i=' + elem.exchange + ':' + elem.symbol;
    } else {
      addUrl += '&i=' + elem.exchange + ':' + elem.symbol;
    }
  });

  let url = `https://api.kite.trade/quote?${addUrl}`;
  // let url = `https://api.kite.trade/quote?i=NFO:NIFTY22N1718200CE`;
  const api_key = getApiKey;
  const access_token = getAccessToken;
  let auth = 'token' + api_key + ':' + access_token;

  let authOptions = {
    headers: {
      'X-Kite-Version': '3',
      Authorization: auth,
    },
  };


  let arr = [];
    try{
      const res = await axios.get(url, authOptions);
      // console.log("its json data", JSON.stringify(res.data));
      for (instrument in res.data.data) {
        arr.push(res.data.data[instrument].instrument_token);
      }
      return arr;

    } catch (err){
      return new Error(err);
  }  
};

module.exports = fetchData;