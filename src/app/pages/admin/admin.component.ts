import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import {DashboardService} from "../../../shared/services/dashboard.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userCount: number = 0;
  courseCount: number = 0;
  blogCount: number = 0;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Users', 'Courses', 'Blogs'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration['data']['datasets'] = [
    { data: [0, 0, 0], label: 'Count' }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getUserCount().subscribe(count => {
      this.userCount = count;
      this.updateChart();
    });

    this.dashboardService.getCourseCount().subscribe(count => {
      this.courseCount = count;
      this.updateChart();
    });

    this.dashboardService.getBlogCount().subscribe(count => {
      this.blogCount = count;
      this.updateChart();
    });
  }

  updateChart() {
    this.barChartData[0].data = [this.userCount, this.courseCount, this.blogCount];
  }
}
