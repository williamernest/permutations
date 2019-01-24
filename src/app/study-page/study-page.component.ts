import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { MDCMenuSurface } from '@material/menu-surface';

@Component({
  selector: 'app-study-page',
  templateUrl: './study-page.component.html',
  styleUrls: ['./study-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudyPageComponent implements OnInit, AfterViewInit, OnDestroy {

  type = 'Raised';
  styleOverride = {
    'border-radius': '4px',
    '--mdc-theme-primary': '#6200ee',
  };

  fontChoices = [
    '\'Roboto\', sans-serif',
    '\'Rubik\', sans-serif',
    '\'Raleway\', sans-serif',
    '\'Libre Franklin\', sans-serif',
  ];

  border_radius_value = 4;
  corners = [4, 4, 4, 4];

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
    const font = this.fontChoices[target.selectedIndex];
    this.typographyPreviewElement.style.fontFamily = font;
    this.typographyButton.style.fontFamily = font;
    this.styleOverride['font-family'] = font;
  }

}
