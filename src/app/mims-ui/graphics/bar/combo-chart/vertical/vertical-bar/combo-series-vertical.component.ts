import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { formatLabel } from '@swimlane/ngx-charts';

@Component({
    selector: 'g[ngx-combo-charts-series-vertical]',
    templateUrl: 'combo-series-vertical.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('animationState', [
        transition('* => void', [
            style({
            opacity: 1,
            transform: '*',
            }),
            animate(500, style({opacity: 0, transform: 'scale(0)'}))
        ])
        ])
    ]
})
export class ComboSeriesVerticalComponent implements OnChanges {

    @Input() public dims;
    @Input() public type = 'standard';
    @Input() public series;
    @Input() public seriesLine;
    @Input() public xScale;
    @Input() public yScale;
    @Input() public colors;
    @Input() public tooltipDisabled: boolean = false;
    @Input() public gradient: boolean;
    @Input() public activeEntries: any[];
    @Input() public seriesName: string;
    @Input() public animations: boolean = true;

    @Output() public select = new EventEmitter();
    @Output() public activate = new EventEmitter();
    @Output() public deactivate = new EventEmitter();
    @Output() public bandwidth = new EventEmitter();

    public bars: any;
    public x: any;
    public y: any;

    public ngOnChanges(changes): void {
        this.update();
    }

    public update(): void {
        let width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
            this.bandwidth.emit(width);
        }

        let d0 = 0;
        let total;
        if (this.type === 'normalized') {
            total = this.series.map((d) => d.value).reduce((sum, d) => sum + d, 0);
        }

        this.bars = this.series.map((d, index) => {

        let value = d.value;
        const label = d.name;
        const formattedLabel = formatLabel(label);
        const roundEdges = this.type === 'standard';

        const bar: any = {
            value,
            label,
            roundEdges,
            data: d,
            width,
            formattedLabel,
            height: 0,
            x: 0,
            y: 0
        };

        if (this.type === 'standard') {
            bar.height = Math.abs(this.yScale(value) - this.yScale(0));
            bar.x = this.xScale(label);

            if (value < 0) {
                bar.y = this.yScale(0);
            } else {
                bar.y = this.yScale(value);
            }
        } else if (this.type === 'stacked') {
            const offset0 = d0;
            const offset1 = offset0 + value;
            d0 += value;

            bar.height = this.yScale(offset0) - this.yScale(offset1);
            bar.x = 0;
            bar.y = this.yScale(offset1);
            bar.offset0 = offset0;
            bar.offset1 = offset1;
        } else if (this.type === 'normalized') {
            let offset0 = d0;
            let offset1 = offset0 + value;
            d0 += value;

            if (total > 0) {
                offset0 = (offset0 * 100) / total;
                offset1 = (offset1 * 100) / total;
            } else {
                offset0 = 0;
                offset1 = 0;
            }

            bar.height = this.yScale(offset0) - this.yScale(offset1);
            bar.x = 0;
            bar.y = this.yScale(offset1);
            bar.offset0 = offset0;
            bar.offset1 = offset1;
            value = (offset1 - offset0).toFixed(2) + '%';
        }

        if (this.colors.scaleType === 'ordinal') {
            bar.color = this.colors.getColor(label);
        } else {
            if (this.type === 'standard') {
                bar.color = this.colors.getColor(value);
                bar.gradientStops = this.colors.getLinearGradientStops(value);
            } else {
                bar.color = this.colors.getColor(bar.offset1);
                bar.gradientStops = this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
            }
        }

        let tooltipLabel = formattedLabel;
        if (this.seriesName) {
            tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
        }

        this.getSeriesTooltips(this.seriesLine, index);
        const lineValue = this.seriesLine[0].series[index].value;
        const lineName = this.seriesLine[0].series[index].name;
        bar.tooltipText = `
            <span class="tooltip-label">${tooltipLabel }</span>
            <span class="tooltip-val"> Y1 - ${value.toLocaleString()} • Y2 - ${lineValue.toLocaleString()}%</span>
        `;

        return bar;
        });
    }

    public getSeriesTooltips(seriesLine, index) {
        return seriesLine.map((d) => {
        return d.series[index];
        });
    }

    public isActive(entry): boolean {
        if (!this.activeEntries) { return false; }
        const item = this.activeEntries.find((d) => {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    }

    public publiconClick(data): void {
        this.select.emit(data);
    }

    public trackBy(index, bar): string {
        return bar.label;
    }

}
