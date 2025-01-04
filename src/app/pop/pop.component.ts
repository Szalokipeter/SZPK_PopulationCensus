import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopulationModel } from '../models/population';

@Component({
  selector: 'app-pop',
  standalone: true,
  imports: [],
  templateUrl: './pop.component.html',
  styleUrl: './pop.component.css'
})
export class PopComponent {
  @Input() PopGroupData: PopulationModel | undefined = undefined;
  @Output() saved = new EventEmitter<PopulationModel>();
  @Output() cancelled = new EventEmitter<void>();

  getValue(event: any){
    return event.target.value;
  }

  save(){
    this.saved.emit(this.PopGroupData);
  }
  cancel(){
    this.cancelled.emit();
  }
}
