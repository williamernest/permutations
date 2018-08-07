import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ChipSetType} from '../chip-set-type.enum';

@Component({
  selector: 'app-chip-set-renderer',
  templateUrl: './chip-set-renderer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chip-set-renderer.component.scss']
})
export class ChipSetRendererComponent implements OnInit {

  @Input() chipsets = Array<ChipSet>();

  public ChipSetTypes = ChipSetType;

  constructor() { }

  ngOnInit() {
    this.chipsets = this.generateChipSetTypePermutations();
  }

  initChip(): Chip[] {
    const chip = new Chip();
    chip.content = 'Hello World';
    return [chip];
  }

  generateLeadingIconPermutations(chips: Chip[]): Chip[] {
    const duplicateChips = JSON.parse(JSON.stringify(chips));

    duplicateChips.forEach((ele) => {
      ele.leadingIcon = 'directions_transit';
    });

    chips.push(... duplicateChips);
    return chips;
  }

  generateTrailingIconPermutations(chips: Chip[]): Chip[] {
    const duplicateChips = JSON.parse(JSON.stringify(chips));

    duplicateChips.forEach((ele) => {
      ele.trailingIcon = 'remove_circle';
    });

    chips.push(... duplicateChips);
    return chips;
  }

  generateSelectedPermutations(chips: Chip[]): Chip[] {
    const duplicateChips = JSON.parse(JSON.stringify(chips));

    duplicateChips.forEach((ele) => {
      ele.selected = true;
    });

    chips.push(... duplicateChips);
    return chips;
  }

  generateCheckmarkPermutations(chips: Chip[]): Chip[] {
    chips.forEach((ele) => {
      ele.checkmark = true;
    });

    return chips;
  }

  generateChipSetTypePermutations(): ChipSet[] {
    const chipsets = [];
    for (const param in ChipSetType) {
      if (!isNaN(Number(param))) {
        const set = new ChipSet();
        set.type = ChipSetType[ChipSetType[param]];
        chipsets.push(this.buildChips(set));
      }
    }

    return chipsets;
  }

  buildChips(chipset: ChipSet): ChipSet {
    let chips = this.initChip();
    chips = this.generateLeadingIconPermutations(chips);

    if (chipset.type === ChipSetType.Input) {
      chips = this.generateTrailingIconPermutations(chips);
    }

    if (chipset.type === ChipSetType.Choice) {
      chips[0].selected = true;
    }

    if (chipset.type === ChipSetType.Filter) {
      chips = this.generateSelectedPermutations(chips);
      chips = this.generateCheckmarkPermutations(chips);
    }

    chipset.chips = chips;
    return chipset;
  }

}

class Chip {
  content = '';
  leadingIcon = '';
  trailingIcon = '';
  selected = false;
  checkmark = false;
}

class ChipSet {
  chips: Array<Chip>;
  type = ChipSetType.Default;
}
