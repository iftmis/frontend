import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.scss'],
})
export class PreparationComponent implements OnInit {
  inspectionId: number;
  constructor(private route: ActivatedRoute) {
    this.inspectionId = route.snapshot.params['id'];
  }

  ngOnInit(): void {}
}
