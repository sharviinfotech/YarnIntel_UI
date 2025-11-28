import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// ⬅️_IMPORT NG2-CHARTS MODULE FOR baseChart
import { BaseChartDirective } from 'ng2-charts';

// ⬅️_IMPORT correct type for chart.js options
import { ChartConfiguration } from 'chart.js';
export type MyChartOptions  = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  dataLabels: ApexDataLabels;
  stroke: any;
  grid: any;
  plotOptions: any;
  legend: any;
  labels: any;
  fill: any;
  tooltip: any;
  responsive: ApexResponsive[];
  colors: any;
};

@Component({
  selector: 'app-invoicefy-global-dashboard',
  templateUrl: './invoicefy-global-dashboard.component.html',
  styleUrls: ['./invoicefy-global-dashboard.component.css'],
  standalone: true,
  imports: [  CommonModule,
    FormsModule,
    NgApexchartsModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    BaseChartDirective    ],
})
export class InvoicefyGlobalDashboardComponent implements OnInit {
  lastUpdated = 'Just now';

  // KPI Data
  kpiData = {
    activeMixPlans: 12,
    rawCottonInventory: 1500,
    rawCottonAvailable: 1250,
    rawCottonQuarantine: 250,
    numberOfBales: 7500,
    blockedStock: 35200,
    pendingApprovals: 4,
    openQcIssues: 2
  };

  barChartLabels = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  alerts = [
    { type: 'Warning', message: 'High Moisture Alert: Bale #4815A', id: 'YARN-4821', time: '2 min ago' },
    { type: 'Info', message: 'High Trash %: Lot #B2-6632', id: 'YARN-4822', time: '15 min ago' },
    { type: 'Critical', message: 'Machine #3 Downtime Exceeded', id: 'YARN-4823', time: '1 hour ago' }
  ];

  // ⭐ ng2-charts dataset
  barChartData = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Planned',
        data: [80, 75, 90, 88, 65, 85, 66],
        backgroundColor: 'rgba(54,162,235,0.6)',
      },
      {
        label: 'Actual',
        data: [85, 70, 92, 90, 70, 88, 46],
        backgroundColor: 'rgba(255,99,132,0.6)',
      }
    ]
  };

  // ⭐ Correct type (NO conflict)
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.updateTimestamp();
    setInterval(() => this.updateTimestamp(), 60000);
  }

  updateTimestamp() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2,'0');
    this.lastUpdated = `${h}:${m} hrs`;
  }
  // Quick Action Methods
  createNewMixPlan() {
    console.log('New Mix Plan clicked');
    // Add your navigation or modal logic here
    // Example: this.router.navigate(['/mix-plan/new']);
  }

  receiveBales() {
    console.log('Receive Bales clicked');
    // Add your logic here
  }

  qcEntry() {
    console.log('QC Entry clicked');
    // Add your logic here
  }

  openApprovals() {
    console.log('Approvals clicked');
    // Add your logic here
  }
}