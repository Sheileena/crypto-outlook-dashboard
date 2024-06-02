import {
    AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges,
    OnDestroy, Output, SimpleChanges, ViewChild, ViewEncapsulation
} from "@angular/core";
import * as React from "react";
import Datatable from "./datatable.react.component";
import {TickerPrice} from "../../common/model";
import {createRoot} from "react-dom/client";

const containerElementRef = "customReactComponentContainer";

@Component({
    selector: "app-datatable",
    styleUrls: ["datatable.component.scss"],
    template: `<span #${containerElementRef}></span>`,
    encapsulation: ViewEncapsulation.None,
})
export class DatatableWrapperComponent implements OnChanges, OnDestroy, AfterViewInit {
    @ViewChild(containerElementRef, {static: true}) containerRef!: ElementRef;

    @Input() data: TickerPrice[] = [];
    @Output() removeTicker = new EventEmitter<string>();

    reactRoot: any;

    constructor() {
        this.handleRemoveTicker = this.handleRemoveTicker.bind(this);
    }

    public handleRemoveTicker(ticker: string) {
        if (this.removeTicker) {
            this.removeTicker.emit(ticker);
            this.render();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.render();
    }

    ngAfterViewInit() {
        this.reactRoot = createRoot(this.containerRef.nativeElement);
        this.render();
    }

    ngOnDestroy() {
        this.reactRoot.unmount();
    }

    private render() {
        this.reactRoot?.render(<React.StrictMode>
            <div>
                <Datatable
                    data={this.data}
                    removeTicker={(ticker) => this.handleRemoveTicker(ticker)}
                />
            </div>
        </React.StrictMode>);
    }
}