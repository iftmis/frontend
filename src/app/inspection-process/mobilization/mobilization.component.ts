import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobilization',
  templateUrl: './mobilization.component.html',
  styleUrls: ['./mobilization.component.scss'],
})
export class MobilizationComponent implements OnInit {
  inspectionId: any;
  constructor(private route: ActivatedRoute) {
    this.inspectionId = route.snapshot.parent?.parent?.params['id'];
  }

  ngOnInit(): void {}
}
