import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit, OnDestroy {
  loggedinUser: string;
  loggedinUserfirstName: string;
  loggedinUserlastName: string;

  date: Date = new Date();
  time = new Date();
  rxTime = new Date();
  intervalId;
  subscription: Subscription;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  ChartType: [];

  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    //  Back to Login Page if user not found.
    this.loggedinUser = localStorage.getItem('token');
    if (this.loggedinUser) {
      console.log('Current User Is Available');
    } else {
      this.openSnackBar('No user details found...', 'Cancel'),
        {
          duration: 3000,
        };

      // alert('No user details found...');
      this.router.navigate(['./login']);
    }

    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loggedin() {
    this.loggedinUserfirstName = localStorage.getItem('token1');
    this.loggedinUserlastName = localStorage.getItem('token2');
    // console.log(this.loggedinUser);
    return this.loggedinUser;
  }

  // Time Display Code
  dayDisplay() {
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      return 'Good Morning';
    } else if (curHr < 16) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  // Notification Code
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  // this.chartDisplay

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  public chartType: ChartType = 'bar';
  public barChartType: ChartType = this.chartType;
  // public barChartType: ChartType = 'radar';   //
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
  // Here End Chart Code
}
