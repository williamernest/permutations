import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MDCMenuSurface} from '@material/menu-surface';
import {TextfieldType} from '../textfield.enum';

@Component({
  selector: 'app-study-page-tf',
  templateUrl: './study-page-tf.component.html',
  styleUrls: ['./study-page-tf.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudyPageTfComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly TfTypes = TextfieldType;

  type = TextfieldType.Default;
  styleOverride = {
    'border-radius': '4px',
    '--mdc-theme-primary': '#6200ee',
    'font-family': '\'Roboto\', sans-serif',
  };

  border_radius_value = 4;
  panelOpen = false;
  corners = [4, 4, 0, 0];

  menuComponent: MDCMenuSurface = null;
  typographyPreviewElement: HTMLElement = null;
  typographyButton: HTMLElement = null;
  typographyButtonText = 'Rr';
  maintainSymmetry = true;

  constructor(private myElement: ElementRef) {
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.menuComponent = new MDCMenuSurface(this.myElement.nativeElement.querySelector('.mdc-menu-surface'));
    this.typographyPreviewElement = this.myElement.nativeElement.querySelector('.font-family-preview');
    this.typographyButton = this.myElement.nativeElement.querySelector('.typography-button');

    const anchorElement = this.myElement.nativeElement.querySelector('.mdc-menu-surface--anchor');

    this.menuComponent.setMenuSurfaceAnchorElement(anchorElement);
    this.menuComponent.setAnchorMargin({ top: 4, right: 16});
  }

  ngOnDestroy() {
    if (this.menuComponent) {
      this.menuComponent.destroy();
    }
  }

  setBorderRadius(value: string) {
    this.border_radius_value = parseInt(value, 10);
    this.styleOverride['border-radius'] = value + 'px';
  }

  setCornerRadius(value: string, corner: number) {
    this.corners[corner] = parseInt(value, 10);
    this.styleOverride['border-radius'] = this.corners.join('px ') + 'px';
  }

  togglePanel(event) {
    event.target.classList[event.target.classList.contains('opened') ? 'remove' : 'add']('opened');
  }

  toggleSymmetry(newValue) {
    this.maintainSymmetry = newValue;
    if (this.maintainSymmetry) {
      this.setBorderRadius(this.border_radius_value + '');
    } else {
      this.corners = this.corners.map(() => this.border_radius_value);
      this.setCornerRadius(this.corners[0] + '', 0);
    }
  }

  toggleTypographyMenu() {
    if (!this.menuComponent) {
      return;
    }

    this.menuComponent.open = !this.menuComponent.open;
  }

  selectChange({target}) {
    if (target.options[target.selectedIndex].value === 'Roboto') {
      this.typographyPreviewElement.classList.remove('font-rubik');
      this.typographyButton.classList.remove('font-rubik');
      this.styleOverride['font-family'] = '\'Roboto\', sans-serif';
    } else {
      this.typographyPreviewElement.classList.add('font-rubik');
      this.typographyButton.classList.add('font-rubik');
      this.styleOverride['font-family'] = '\'Rubik\', sans-serif';
    }
  }

}
