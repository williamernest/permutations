import {AfterViewInit, Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {MDCChipSet} from '@material/chips';
import {ChipSetType} from '../../chip-set-type.enum';

@Component({
  selector: 'app-chip-set',
  templateUrl: './chip-set.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chip-set.component.scss']
})
export class ChipSetComponent implements AfterViewInit {

  @Input() chips: Object;
  @Input() type = ChipSetType.Default;

  private _chipSet: MDCChipSet;

  constructor(private myElement: ElementRef) { }

  ngAfterViewInit() {
    this._chipSet = new MDCChipSet(this.myElement.nativeElement.firstChild);
  }

  getClasses() {
    return {
      'mdc-chip-set--filter': this.type === ChipSetType.Filter,
      'mdc-chip-set--input': this.type === ChipSetType.Input,
      'mdc-chip-set--choice': this.type === ChipSetType.Choice,
    };
  }

}
