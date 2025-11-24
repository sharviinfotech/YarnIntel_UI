import { ApexOptions } from 'apexcharts';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ApexChart, ApexResponsive } from "ng-apexcharts";
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export type ChartOptions = {
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
  imports: [CommonModule, FormsModule, NgApexchartsModule, BsDatepickerModule, NgxSpinnerModule],
})
export class InvoicefyGlobalDashboardComponent implements OnInit {
  
  // Last Updated text
  lastUpdated: string = 'Just now';

  // KPI Data - Updated to match the new design
  kpiData = {
    activeMixPlans: 12,
    rawCottonInventory: 1500,
    rawCottonAvailable: 1250,
    rawCottonQuarantine: 250,
    numberOfBales: 7500,          // NEW
    blockedStock: 35200,          // NEW
    pendingApprovals: 4,
    openQcIssues: 2
  };

  // Chart Data: Planned vs Actual - Updated labels to match image
  productionProgress = [
    { metric: 'Monday', planned: 80, actual: 85 },
    { metric: 'Tuesday', planned: 75, actual: 70 },
    { metric: 'Wednesday', planned: 90, actual: 92 },
    { metric: 'Thursday', planned: 88, actual: 90 },
    { metric: 'Friday ', planned: 65, actual: 70 },
    { metric: 'Saturday', planned: 85, actual: 88 },
    { metric: 'Sunday', planned: 66, actual: 46 }
  ];

  // Alerts - keeping the same structure
  alerts = [
    {
      type: 'red',
      message: 'High Moisture Alert: Bale #4815A',
      time: '2 min ago'
    },
    {
      type: 'amber',
      message: 'High Trash %: Lot #B2-6632',
      time: '15 min ago'
    },
    {
      type: 'red',
      message: 'Machine #3 Downtime Exceeded',
      time: '1 hour ago'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.updateTimestamp();
    // Auto-refresh timestamp every minute (optional)
    setInterval(() => {
      this.updateTimestamp();
    }, 60000);
  }

  // Refresh Last Updated label dynamically
  updateTimestamp() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.lastUpdated = `${hours}:${minutes} hrs`;
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