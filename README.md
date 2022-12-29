## Usage

Please clone the git repo, then runs the 2 following command sequentially.

> Copy the `transactions.csv` in `data` folder.

```
npm i
npm start
```
---

## Approach

First, I read the csv file the get the transaction of tokens. Here I am using a library [csv-parse](https://www.npmjs.com/package/csv-parse) to parse the transaction.

Because the timestamp order by DESC to I read the transactions from the end. For each transaction, I get transactionType, token and amount and accumulate their amount to the tokens variable.

Finally, I call an API to obtain the exchange rates compared from token to USD, then do the multiplication to convert the final amounts to USD.

---
## Design decisions
### 1. Setting Configuration variables

CRYPTO_CURRENCY_URL = "https://min-api.cryptocompare.com/data/pricemulti"

These are used to get exchange rates from multiple tokens to multiple currencies.

### 2. Error Handling
#### If there are no transactions on log file
We console the error

`No token transactions on the logs`.

---

## Structure of the source code
<pre>
├── LICENSE
├── package.json
├── README.md
├── data
│  └── transactions.csv
├── src
│  ├── portfolio.js
│  └── utils.js
└── index.js
</pre>

### portfolio.js
This is where we implement functionalities in commands.

### utils.js
This file contains the utilization functions.

getExchangeRate: Get the current exchange rate of any cryptocurrency in any other currency that you need.

---
## Question 1 - Programming
_We're looking at your programming ability. It must not only work, it should be maintainable._

Let us assume you are a crypto investor. You have made transactions over a period of time which is logged in a CSV file at the [data directory](https://raw.githubusercontent.com/Propine/2b-boilerplate/master/data/transactions.csv). Write a command line program that returns the latest portfolio value per token in USD

The program should be ran like this

```
npm run start
```

On running, it should return the latest portfolio value per token in USD

The CSV file has the following columns
 - timestamp: Integer number of seconds since the Epoch
 - transaction_type: Either a DEPOSIT or a WITHDRAWAL
 - token: The token symbol
 - amount: The amount transacted

Portfolio means the balance of the token where you need to add deposits and subtract withdrawals. You may obtain the exchange rates from [cryptocompare](https://min-api.cryptocompare.com/documentation) where the API is free. You should write it in Node.js as our main stack is in Javascript/Typescript and we need to assess your proficiency.


## Submission

Please take no more than 2 hours to finish. We do not track time, hence you can start and end at your own time. Your answers should comprise of the following

  - Source code that you used for deriving the results
  - README that explains various design decisions that you took.

Commit your answers in a private Github repository(it's free), please do not fork as other candidates will see your answers. Add Zan(liangzan), Ben(BenPropine) as collaborators then inform us that it is done at zan@propine.com, ben.nguyen@propine.com.
