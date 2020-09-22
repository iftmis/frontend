import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InspectionFindingService } from '../inspection-finding/inspection-finding.service';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.scss'],
})
export class ExecutionComponent implements OnInit {
  inspectionId: number;
  filter = {};
  constructor(
    private route: ActivatedRoute,
    private findingService: InspectionFindingService
  ) {
    this.inspectionId = route.snapshot.parent?.parent?.params['id'];
  }

  ngOnInit(): void {
    this.findingService
      .query(this.inspectionId, this.filter)
      .subscribe(resp => {});
  }

  loadFindingByInspection(): void {}
}
