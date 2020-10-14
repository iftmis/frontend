import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inspection } from '../../inspection/inspection';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.scss'],
})
export class ExecutionComponent implements OnInit {
  inspectionId: any;
  constructor(private route: ActivatedRoute) {
    this.inspectionId = route.snapshot.parent?.params;
  }

  ngOnInit(): void {
    // console.log('Aliceeeee  ', this.inspectionId);
  }
}
