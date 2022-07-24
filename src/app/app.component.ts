import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import moment from 'moment';
import { BsDaterangepickerDirective, BsDatepickerConfig, DatepickerDateTooltipText, BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild('dp', { static: false }) datepicker?: BsDaterangepickerDirective;
  @ViewChildren(BsDaterangepickerDirective) daterangePickers?: QueryList<BsDaterangepickerDirective>;
  bsConfig?: Partial<BsDatepickerConfig> = {
    adaptivePosition: true,
    clearButtonLabel: 'Clear',
    showClearButton: true,
    rangeInputFormat: 'DD MMM YYYY',
    showTodayButton: true,
    containerClass: 'theme-dark-blue',
    showWeekNumbers: false,
    maxDate: moment().subtract(1, "day").toDate(),
    minDate: moment(new Date("01/03/2000")).toDate(),
    ranges: [{
      value: [
        moment().subtract(this.isSubtract(new Date()), 'days').subtract(1, 'day').toDate(),
        moment().subtract(this.isSubtract(new Date()), 'days').toDate(),
      ],
      label: 'Today'
    },
    {
      value: [
        moment(new Date(new Date().setDate(new Date().getDate() - 7)))
          .subtract(this.isSubtract(new Date(new Date()
            .setDate(new Date().getDate() - 7))), 'days').subtract(1, 'day').toDate(),
        moment().subtract(this.isSubtract(new Date()), 'days').toDate()
      ],
      label: 'Last 7 Days'
    },
    {
      value: [
        moment(moment().subtract(30, 'days').toDate()).subtract(this.isSubtract(moment().subtract(30, 'days').toDate()), 'days').toDate(),
        moment().subtract(this.isSubtract(new Date()), 'days').toDate()
      ],
      label: 'Last 30 Days'
    },
    {
      value: [
        moment(moment().subtract(90, 'days').toDate()).subtract(this.isSubtract(moment().subtract(90, 'days').toDate()), 'days').toDate(),
        moment().subtract(this.isSubtract(new Date()), 'days').toDate()
      ],
      label: 'Last 90 Days'
    }, {
      label: 'This Month',
      value: [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate()
      ],
    }
    ],
    daysDisabled: [0, 6],
    isAnimated: true,
    // datesDisabled: this.getDisabledDates(),
    dateTooltipTexts: this.getDisabledDatesToolTip()
  }
  calendar = [
    {
      daterangepicker: {} as BsDaterangepickerDirective,
      name: 'C Date',
      bsConfig: {
        ...this.bsConfig,
        name: 'C Date'
      },
      onValue: (event: any) => this.onValue(event),
      bsRangeValue: [
        moment().subtract(this.isSubtract(new Date()), 'days').subtract(1, 'days').toDate(),
        moment().subtract(this.isSubtract(new Date()), 'days').toDate()
      ],
      changeEvent: (event: any, item: any, i: number) => this.onValueChange(event, item, i)
    },
    {
      daterangepicker: {} as BsDaterangepickerDirective,
      name: 'R Date',
      bsConfig: {
        ...this.bsConfig,
        name: 'R Date',
      },
      onValue: (item: any) => { return; },
      bsRangeValue: [
        moment().subtract(this.isSubtract(new Date()), 'days').subtract(1, 'days').toDate(),
        moment().subtract(this.isSubtract(new Date()), 'days').toDate()
      ],
      changeEvent: (event: any, item: any, i: number) => this.onValueChange1(event, item, i)
    }
  ]
  constructor(
    private localSvc: BsLocaleService
  ) {
  }

  getDisabledDates(): Date[] {
    let dats: Date[] = []
    for (let index = 2000; index <= (new Date()).getFullYear(); index++) {
      dats.push(new Date('01/01/' + index));
    }
    return dats;
  }


  getDisabledDatesToolTip(): any[] {
    let dats: any[] = []
    for (let index = 2000; index <= (new Date()).getFullYear(); index++) {
      dats.push({ date: new Date('01/01/' + index), tooltipText: 'Happy New Year !!!' })
    }
    return dats;
  }


  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.daterangePickers?.toArray().forEach((item: BsDaterangepickerDirective, index: number) => {
      if (this.calendar[index].name === (item.bsConfig as any).name) {
        this.calendar[index].daterangepicker = item;
      }
    })
  }

  setOptions(): void {
    let [startDate, endDate]: any = this.calendar[0].bsRangeValue;
    this.calendar[0].bsRangeValue = [moment(startDate).subtract(1, "year").toDate(), moment(endDate).subtract(1, "year").toDate()];
    console.log(moment(startDate).subtract(1, "year").toDate(), moment(endDate).subtract(1, "year").toDate());
    [startDate, endDate] = this.calendar[1].bsRangeValue;
    this.calendar[1].bsRangeValue = [moment(startDate).subtract(1, "year").toDate(), moment(endDate).subtract(1, "year").toDate()];

  }

  updateEvent(event: any) {
    console.log("Event", event);
  }

  onValueChange(event: any, item: any, i: number) {
    const startDate = moment(event[0]).subtract(1, "day");
    const endDate = moment(event[1]).subtract(1, "day");
    this.calendar[1].bsRangeValue = [
      startDate.subtract(this.isSubtract(startDate.toDate()), 'days').toDate(),
      endDate.subtract(this.isSubtract(endDate.toDate()), 'days').toDate()
    ];
  }

  onValueChange1(event: any, item: any, i: number) {

    const startDate = moment(event[0]).subtract(1, "day");
    const endDate = moment(event[1]).subtract(1, "day");
    this.calendar[0].bsRangeValue = [
      startDate.subtract(this.isSubtract(startDate.toDate()), 'days').toDate(),
      endDate.subtract(this.isSubtract(endDate.toDate()), 'days').toDate()
    ];
  }

  openCDate() {
    this.calendar[0].daterangepicker.show();
  }

  onValue(event: any) {
    const startDate = event[0];
    const endDate = event[1];
    // this.calendar[0].bsRangeValue = [moment(startDate).subtract(this.isSubtract(startDate), "day").toDate(), moment(endDate).subtract(this.isSubtract(startDate), "day").toDate()];
  }

  openRDate() {
    this.calendar[1].daterangepicker.show();
  }

  isSubtract(date: Date): any {
    const day = date.getDay();
    if (day == 6) return 1;
    if (day == 0) return 2;
    return 0;
  }

}
