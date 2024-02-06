import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoaderSpinnerComponent } from './shared';
import {ChartComponent} from "./shared/chart/chart.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, LoaderSpinnerComponent, ChartComponent],
})
export class AppComponent {}
