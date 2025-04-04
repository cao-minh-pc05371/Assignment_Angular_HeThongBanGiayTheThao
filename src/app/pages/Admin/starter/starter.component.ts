import { Component, ViewEncapsulation } from '@angular/core';
import { AppSalesOverviewComponent } from 'src/app/components/sales-overview/sales-overview.component';
import { AppDailyActivitiesComponent } from 'src/app/components/daily-activities/daily-activities.component';
import { AppProductPerformanceComponent } from 'src/app/components/product-performance/product-performance.component';
import { AppBlogComponent } from 'src/app/components/apps-blog/apps-blog.component';
import { MaterialModule } from 'src/app/material.module';



@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppSalesOverviewComponent,
    AppDailyActivitiesComponent,
    AppProductPerformanceComponent,
    AppBlogComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }