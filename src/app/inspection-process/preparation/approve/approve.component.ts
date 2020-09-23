import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InspectionProcessService } from '../../inspection-process.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent implements OnInit {
  @Input() stage: any;
  @Output() stageChange = new EventEmitter<any>();

  constructor(
    private processService: InspectionProcessService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  apporve(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef);

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.processService.approve(this.stage.id).subscribe(resp => {
          this.stage = resp;
          this.stageChange.next(resp);
        });
      }
    });
  }
}
