import axios from "axios";

const needle = require("needle");
const delay = 1000 * 60 * 60; //1 hour

type CurrencyType = {
  Valute: {
    [key: string]: {
      ID: string;
      NumCode: string;
      CharCode: string;
      Nominal: number;
      Name: string;
      Value: number;
    };
  };
};

class CurrencyService {
  private interval: NodeJS.Timer | undefined;
  private _currency?: CurrencyType;

  async init() {
    await this._fetchCurrency();

    this.interval = setInterval(this._fetchCurrency, delay);
  }

  calculate({
    sourceAmount,
    sourceCurrency,
    targetCurrency,
  }: {
    sourceAmount: number;
    sourceCurrency: string;
    targetCurrency: string;
  }) {
    if (!!this._currency) {
      //on rubles
      if (targetCurrency === "RUB") {
        return (
          sourceAmount +
          this._currency.Valute[sourceCurrency].Value /
            this._currency.Valute[sourceCurrency].Nominal
        ).toFixed(2);
      }
      //on target currency
      if (sourceCurrency === "RUB") {
        return (
          (sourceAmount / this._currency.Valute[targetCurrency].Value) *
          this._currency.Valute[targetCurrency].Nominal
        ).toFixed(2);
      }

      const inRub =
        sourceAmount +
        this._currency.Valute[sourceCurrency].Value /
          this._currency.Valute[sourceCurrency].Nominal;

      return (
        (inRub / this._currency.Valute[targetCurrency].Value) *
        this._currency.Valute[targetCurrency].Nominal
      );
    }
  }

  private async _fetchCurrency() {
    try {
      const response = await axios.get(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      );
      this._currency = await response.data;
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new CurrencyService();
