import axios from "axios";

const CRYPTO_CURRENCY_URL = "https://min-api.cryptocompare.com/data/pricemulti";

export const getExchangeRate = async (tokens, currencies) => {
  const config = {
    url: CRYPTO_CURRENCY_URL,
    method: "GET",
    params: {
      fsyms: tokens.join(","),
      tsyms: currencies.join(","),
    },
  };

  try {
    const result = await axios.request(config);
    return result?.data;
  } catch (err) {
    console.log("ERROR: cannot call cryptocurrency api, please check");
    console.log("ERROR MESSAGE: " + err.message);
  }
};
