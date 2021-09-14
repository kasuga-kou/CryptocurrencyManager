import * as React from 'react';
import { Dispatch } from 'redux';
import { ILocalState } from '../../redux/reducer';

import style from './style.scss';
import ccxt from 'ccxt';
import { Ticker } from 'ccxt';

export interface IProps extends ILocalState {
  dispatch?: Dispatch<any>;
  className?: string;
}

interface IState {
  /**
   * 表示できるティッカーシンボル
   */
  tickerSymboleList: string[];

  /**
   * 検索中のティッカーシンボル
   */
  selectedTickerSymbol: string;

  /**
   * 価格データ
   *
   * {
   *'symbol':        string symbol of the market ('BTC/USD', 'ETH/BTC', ...)
   *'info':        { the original non-modified unparsed reply from exchange API },
   *'timestamp':     int (64-bit Unix Timestamp in milliseconds since Epoch 1 Jan 1970)
   *'datetime':      ISO8601 datetime string with milliseconds
   *'high':          float, // highest price
   *'low':           float, // lowest price
   *'bid':           float, // current best bid (buy) price
   *'bidVolume':     float, // current best bid (buy) amount (may be missing or undefined)
   *'ask':           float, // current best ask (sell) price
   *'askVolume':     float, // current best ask (sell) amount (may be missing or undefined)
   *'vwap':          float, // volume weighed average price
   *'open':          float, // opening price
   *'close':         float, // price of last trade (closing price for current period)
   *'last':          float, // same as `close`, duplicated for convenience
   *'previousClose': float, // closing price for the previous period
   *'change':        float, // absolute change, `last - open`
   *'percentage':    float, // relative change, `(change/open) * 100`
   *'average':       float, // average price, `(last + open) / 2`
   *'baseVolume':    float, // volume of base currency traded for last 24 hours
   *'quoteVolume':   float, // volume of quote currency traded for last 24 hours
   * }
   *
   */
  priceData: Ticker | null;
}

const bitfinex = new ccxt.bitfinex({ verbose: true });

/**
 * Root要素となるコンポーネント
 */
export default class Index extends React.Component<IProps, IState> {
  /**
   * コンストラクタ
   * @param props
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      tickerSymboleList: [],
      selectedTickerSymbol: '',
      priceData: null,
    };

    this.init = this.init.bind(this);

    this.init();
  }

  private async init() {
    const tmpTickerSymboleList = await bitfinex.loadMarkets();
    this.setState({ tickerSymboleList: Object.keys(tmpTickerSymboleList) });
  }

  /**
   * ティッカーシンボルが変更されたとき
   * @param event
   */
  private async onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedTickerSymbol = event.target.value;

    const priceData: Ticker = await bitfinex.fetchTicker(selectedTickerSymbol);

    this.setState({
      selectedTickerSymbol,
      priceData,
    });
  }

  public render() {
    return (
      <section>
        <h1>Chapter 1: Acquisition of information on crypto assets.</h1>
        <section className="input-area">
          <label>
            Symbol:
            <select
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                this.onChange(event)
              }
            >
              <option key="none" value={''}></option>
              {this.state.tickerSymboleList.map((ts) => (
                <option
                  key={ts}
                  value={ts}
                  selected={this.state.selectedTickerSymbol === ts}
                >
                  {ts}
                </option>
              ))}
            </select>
          </label>
        </section>
        <hr />
        <section className="result-area">
          <table>
            <tr>
              <th>Symbol</th>
              <td>{this.state.priceData?.symbol}</td>
            </tr>
            <tr>
              <th>DateTime</th>
              <td>{this.state.priceData?.datetime}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>
                {this.state.priceData?.close}
                {this.state.priceData?.symbol.split('/')[1]}
              </td>
            </tr>
          </table>
        </section>
      </section>
    );
  }
}
