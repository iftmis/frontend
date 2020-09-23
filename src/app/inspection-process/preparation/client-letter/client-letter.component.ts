import { Component, Input, OnInit } from '@angular/core';
import { ClientLetterService } from './client-letter.service';

@Component({
  selector: 'app-client-letter',
  templateUrl: './client-letter.component.html',
  styleUrls: ['./client-letter.component.scss'],
})
export class ClientLetterComponent implements OnInit {
  letter: any = {};
  @Input() inspectionId: number;
  @Input() stage: any;

  constructor(private letterService: ClientLetterService) {}

  ngOnInit(): void {
    this.letterService.getById(this.inspectionId).subscribe(resp => {
      console.log(resp);
      this.letter = resp;
    });
  }

  update() {
    this.letterService.update(this.letter).subscribe(resp => {
      this.letter = resp;
    });
  }
}
