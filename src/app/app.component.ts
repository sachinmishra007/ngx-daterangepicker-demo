import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import moment from 'moment';
import {
  BsDaterangepickerDirective,
  BsDatepickerConfig,
  DatepickerDateTooltipText,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild('dp', { static: false }) datepicker?: BsDaterangepickerDirective;
  @ViewChildren(BsDaterangepickerDirective)
  daterangePickers?: QueryList<BsDaterangepickerDirective>;
  bsConfig?: Partial<BsDatepickerConfig> = {
    adaptivePosition: true,
    clearButtonLabel: 'Clear',
    showClearButton: true,
    rangeInputFormat: 'DD MMM YYYY',
    showTodayButton: true,
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
    ranges: [
      {
        value: [
          new Date(new Date().setDate(new Date().getDate() - 7)),
          new Date(),
        ],
        label: 'Last 7 Days',
      },
      {
        value: [
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 7)),
        ],
        label: 'Next 7 Days',
      },
    ],
    daysDisabled: [0, 6],
    isAnimated: true,
  };
  calendar = [
    {
      daterangepicker: {} as BsDaterangepickerDirective,
      name: 'C Date',
      bsConfig: {
        ...this.bsConfig,
        name: 'C Date',
      },
      bsRangeValue: [moment().subtract(1, 'day').toDate(), moment().toDate()],
      changeEvent: (event: any, item: any, i: number) =>
        this.onValueChange(event, item, i),
    },
    {
      daterangepicker: {} as BsDaterangepickerDirective,
      name: 'R Date',
      bsConfig: {
        ...this.bsConfig,
        name: 'R Date',
      },
      bsRangeValue: [moment().subtract(1, 'day').toDate(), moment().toDate()],
      changeEvent: (event: any, item: any, i: number) =>
        this.onValueChange1(event, item, i),
    },
  ];
  constructor(private localSvc: BsLocaleService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.daterangePickers
      ?.toArray()
      .forEach((item: BsDaterangepickerDirective, index: number) => {
        if (this.calendar[index].name === (item.bsConfig as any).name) {
          this.calendar[index].daterangepicker = item;
        }
      });
  }

  setOptions(): void {
    let [startDate, endDate]: any = this.calendar[0].bsRangeValue;
    this.calendar[0].bsRangeValue = [
      moment(startDate).subtract(1, 'year').toDate(),
      moment(endDate).subtract(1, 'year').toDate(),
    ];
    console.log(
      moment(startDate).subtract(1, 'year').toDate(),
      moment(endDate).subtract(1, 'year').toDate()
    );
    [startDate, endDate] = this.calendar[1].bsRangeValue;
    this.calendar[1].bsRangeValue = [
      moment(startDate).subtract(1, 'year').toDate(),
      moment(endDate).subtract(1, 'year').toDate(),
    ];
  }

  onValueChange(event: any, item: any, i: number) {
    const startDate = event[0];
    const endDate = event[1];
    this.calendar[1].bsRangeValue = [
      moment(startDate).subtract(1, 'day').toDate(),
      moment(endDate).subtract(1, 'day').toDate(),
    ];
  }

  onValueChange1(event: any, item: any, i: number) {
    console.log(event, item, i);
    const startDate = event[0];
    const endDate = event[1];
    this.calendar[0].bsRangeValue = [
      moment(startDate).subtract(1, 'day').toDate(),
      moment(endDate).subtract(1, 'day').toDate(),
    ];
  }

  openCDate() {
    this.calendar[0].daterangepicker.show();
  }

  openRDate() {
    this.calendar[1].daterangepicker.show();
  }
}
