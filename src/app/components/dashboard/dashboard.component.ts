import {Component, OnDestroy, OnInit} from '@angular/core';
import {TickerPrice} from "../../common/model";
import {Subscription} from "rxjs";
import {CryptoDataProviderService} from "../../common/services/crypto-data-provider.service";
import {DecimalPipe} from "@angular/common";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [DecimalPipe]
})
export class DashboardComponent implements OnInit, OnDestroy {
    data: TickerPrice[] = [];
    private subscriptions: Subscription[] = [];

    private tickers = ['BTC-USD', 'ETH-USD', 'BNB-USD', 'SOL-USD', 'XRP-USD'];

    constructor(private cryptoService: CryptoDataProviderService,
                private decimalPipe: DecimalPipe) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData() {
        const sub = this.cryptoService.getCryptoData().subscribe(
            (cryptoData) => {
                if (cryptoData && cryptoData.product_id) {
                    console.log(`Ticker Data Received: ${cryptoData.product_id}  Price: ${cryptoData.price}`);
                    const _data: TickerPrice[] = [...this.data];
                    const index = this.data.findIndex(c => c.ticker === cryptoData.product_id);
                    const _price = this.decimalPipe.transform(cryptoData.price);
                    if (index === -1) {
                        _data.push({ticker: cryptoData.product_id, price: _price});
                    } else {
                        _data[index].price = _price;
                    }
                    this.data = _data;
                }
            },
            (error) => console.error(error)
        );
        this.subscriptions.push(sub);
        this.cryptoService.connect(this.tickers);
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }

    removeTicker(ticker: string) {
        this.data = this.data.filter(item => item.ticker !== ticker);
        this.tickers = this.tickers.filter(c => c !== ticker);
        this.cryptoService.disconnect();
        this.loadData();
    }
}
