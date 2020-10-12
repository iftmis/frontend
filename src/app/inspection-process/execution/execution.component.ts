import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.scss'],
})
export class ExecutionComponent implements OnInit {
  inspectionId: any;
  constructor(private route: ActivatedRoute) {
    this.inspectionId = route.snapshot.parent?.parent?.params['id'];
    console.log('Alice', this.inspectionId);
  }

  ngOnInit(): void {}
}
