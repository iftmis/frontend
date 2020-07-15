import { Component, OnInit } from '@angular/core';
import { InspectionResolver } from '../inspection/inspection.resolver';
import { Inspection } from '../inspection/inspection';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inspection-process',
  templateUrl: './inspection-process.component.html',
  styleUrls: ['./inspection-process.component.scss'],
})
export class InspectionProcessComponent implements OnInit {
  inspection: Inspection;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ inspection }) => {
      this.inspection = inspection;
      console.log(inspection);
    });
  }
}
