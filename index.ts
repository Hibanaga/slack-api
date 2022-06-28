const express = require("express");
const instance = require("./services/currency.service");

const app = express();

(async () => {
  await instance.init();

  // await instance.calculate({
  //   sourceAmount: 18,
  //   sourceCurrency: "USD",
  //   targetCurrency: "RUB",
  // });
  await console.log(
    `10 USD = ${instance.calculate({
      sourceAmount: 1,
      sourceCurrency: "USD",
      targetCurrency: "RUB",
    })} RUB`
  );

  await console.log(
    `53.97 RUB=${instance.calculate({
      sourceAmount: 53.97,
      sourceCurrency: "RUB",
      targetCurrency: "USD",
    })} USD`
  );
})();

app.listen(8080, () => console.log("server listen port: 8080"));
