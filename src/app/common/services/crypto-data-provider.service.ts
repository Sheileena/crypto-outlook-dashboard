import {Injectable, OnDestroy} from '@angular/core';
import { Subject, Subscription} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root',
})
export class CryptoDataProviderService implements OnDestroy {
    private socket$!: WebSocketSubject<any>;
    private cryptoData$: Subject<any> = new Subject();
    private subscriptions: Subscription[] = [];

    public connect(tickers: string[]): void {
        this.socket$ = webSocket('wss://ws-feed.pro.coinbase.com');

        const sub = this.socket$.subscribe(
            (message) => this.cryptoData$.next(message),
            (error) => console.error(error),
            () => console.warn('Completed!')
        );
        this.subscriptions.push(sub);

        this.subscribeToCrypto(tickers);
    }

    private subscribeToCrypto(tickers: string[]): void {
        this.socket$.next({
            type: 'subscribe',
            channels: [
                {
                    name: 'ticker',
                    product_ids: tickers,
                },
            ],
        });
    }

    public getCryptoData(): Subject<any> {
        return this.cryptoData$;
    }

    ngOnDestroy(): void {
        this.socket$?.complete();
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }

    public disconnect(): void {
        if (this.socket$) {
            this.socket$.next({type: 'unsubscribe', channels: ['ticker']});
            this.socket$.complete();
        }
    }
}
