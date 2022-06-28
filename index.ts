const express = require("express");
const instance = require("./services/currency.service");

const app = express();

(async () => {
  await instance.init();
  await console.log(
    `10 USD=${instance.calculate({
      sourceAmount: 18,
      sourceCurrency: "USD",
      targetCurrency: "RUB",
    })}`
  );
})();

app.listen(8080, () => console.log("server listen port: 8080"));
