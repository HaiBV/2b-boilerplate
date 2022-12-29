import fs from "fs";
import { parse } from "csv-parse";

import { getExchangeRate } from "./utils.js";

const TRANSACTION_TYPES = {
  DEPOSIT: 1,
  WITHDRAWAL: -1,
};

const CURRENCIES = ["USD"];

export default class Portfolio {
  getTransactions(file) {
    const transactions = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
          transactions.push(row);
        })
        .on("end", async function () {
          resolve(transactions);
        })
        .on("error", function (error) {
          console.log(error.message);
        });
    });
  }

  calcPortfolio(transactions) {
    const transactionsCount = transactions.length;
    const portfolios = {};

    for (let i = transactionsCount - 1; i >= 0; i--) {
      const [, transactionType, token, amount] = transactions[i];
      portfolios[token] = (portfolios[token] | 0) + parseFloat(amount) * (TRANSACTION_TYPES[transactionType] | 0);
    }

    return portfolios;
  }

  async convertPortfolioToCurrency(portfolios) {
    const exchangeRates = await getExchangeRate(Object.keys(portfolios), CURRENCIES);
    const converts = {};

    for (const _token of Object.keys(portfolios)) {
      converts[_token] = {};
      for (const _currency of CURRENCIES) {
        converts[_token][_currency] = portfolios[_token] * exchangeRates[_token][_currency];
      }
    }

    return converts;
  }

  async calcPortfolioFromLog(pathFile) {
    try {
      const transactions = await this.getTransactions(pathFile);

			if (transactions.length === 0) {
				console.error('No token transactions on the logs');
				return;
			}

      const portfolios = this.calcPortfolio(transactions);

      const converts = await this.convertPortfolioToCurrency(portfolios);

      for (const _currency of CURRENCIES) {
        console.log(`Portfolio in ${_currency}:`);
        for (const _token of Object.keys(converts)) {
          console.log(`${_token}: ${converts[_token][_currency]}`);
        }
      }
    } catch (error) {
      console.error("An error occurred: ", error.message);
    }
  }
}
