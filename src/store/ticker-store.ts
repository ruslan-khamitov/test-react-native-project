import {flow, makeAutoObservable} from 'mobx';
import {
  CorrectResponse,
  ErrorResponse,
  HandledTicker,
  ServerResponse,
} from './ticker';

export enum TickerStoreState {
  INITIAL,
  LOADING,
  LOADED,
  ERROR,
}

export default class TickerStore {
  private _state = TickerStoreState.INITIAL;
  tickers: CorrectResponse = {};
  private interval: number = 0;

  constructor() {
    makeAutoObservable(this, {
      // @ts-ignore
      interval: false,
    });

    this.interval = setInterval(() => {
      this.fetch();
    }, 1000 * 5);

    this.fetch();
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  get state() {
    return this._state;
  }

  get isLoading() {
    return this._state === TickerStoreState.LOADING;
  }

  get isError() {
    return this._state === TickerStoreState.ERROR;
  }

  get isInitial() {
    return this._state === TickerStoreState.INITIAL;
  }

  get tickersArray(): HandledTicker[] {
    return Object.keys(this.tickers).map(ticker => {
      const change = parseFloat(this.tickers[ticker].percentChange);

      return {
        ...this.tickers[ticker],
        ticker,
        isAsc: change > 0,
        isDesc: change < 0,
      };
    });
  }

  private setState(state: TickerStoreState) {
    this._state = state;
  }

  fetch = flow(function* (this: TickerStore) {
    try {
      this.setState(TickerStoreState.LOADING);
      const response: ServerResponse = yield fetch(
        'https://poloniex.com/public?command=returnTicker',
      ).then(res => {
        if (!res.ok) {
          throw new Error('Ошибка при выполнении запроса');
        }
        return res.json();
      });

      if ('error' in response) {
        this.setState(TickerStoreState.ERROR);
        throw new Error((response as ErrorResponse).error);
      }

      this.tickers = response;
      this.setState(TickerStoreState.LOADED);
    } catch (err) {
      this.setState(TickerStoreState.ERROR);
    }
  });
}
