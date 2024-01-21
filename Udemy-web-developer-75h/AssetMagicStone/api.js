const axios = require('axios');

exports.getBondData = async (formattedDate, apiKey) => {
    const apiUrl = `https://apis.data.go.kr/1160100/service/GetBondSecuritiesInfoService/getBondPriceInfo?serviceKey=${apiKey}&pageNo=1&numOfRows=30&resultType=json&beginBasDt=${formattedDate}&beginClprBnfRt=6&endClprBnfRt=12&beginTrPrc=100000000`;
    const response = await axios.get(apiUrl);
    return response.data.response.body.items.item;
}
exports.getKrwCurrencyData = async () => {
  const options = {
    method: 'GET',
    url: 'https://real-time-finance-data.p.rapidapi.com/currency-time-series',
    params: {
      from_symbol: 'USD',
      to_symbol: 'KRW',
      period: '1M',
      language: 'en'
    },
    headers: {
      'X-RapidAPI-Key': '735987fbd7mshc0c8b4d80a39ab8p19e685jsn1cb7e725f808',
      'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
    }
  };
      const response = await axios.request(options);
      return response.data;
  }
  
  exports.getJpyCurrencyData = async () => {
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        function: 'FX_WEEKLY',
        from_symbol: 'USD',
        to_symbol: 'JPY',
        datatype: 'json'
      },
      headers: {
        'X-RapidAPI-Key': '735987fbd7mshc0c8b4d80a39ab8p19e685jsn1cb7e725f808',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
    };
  
    const response = await axios.request(options);

    
// Time Series FX 데이터를 가져옵니다.
let timeSeriesFX = response.data['Time Series FX (Weekly)'];

// Time Series FX 데이터를 배열로 변환합니다.
let timeSeriesFXArray = Object.entries(timeSeriesFX);

// 최근 52개의 데이터만 가져옵니다.
timeSeriesFXArray = timeSeriesFXArray.slice(0, 52);

// 데이터를 역순으로 정렬합니다.
timeSeriesFXArray = timeSeriesFXArray.reverse();


let processedData = timeSeriesFXArray.map(entry => {
  return {
      date: entry[0],
      close: entry[1]["4. close"]
  };
});


  
    return processedData;
  }
  
  