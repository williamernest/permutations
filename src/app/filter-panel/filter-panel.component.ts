import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { MDCMenuSurface } from '@material/menu-surface';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit, OnDestroy, AfterViewInit {

  private menuSurface: MDCMenuSurface;
  @Output() open: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private myElement: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const menuEl = this.myElement.nativeElement.querySelector('.mdc-menu-surface');
    this.menuSurface = new MDCMenuSurface(menuEl);
    const anchorElement = this.myElement.nativeElement.querySelector('.mdc-menu-surface--anchor');

    this.menuSurface.setMenuSurfaceAnchorElement(anchorElement);
    anchorElement.addEventListener('click', () => {
      this.menuSurface.open = !this.menuSurface.open;
    });
  }

  ngOnDestroy(): void {
    if (this.menuSurface) {
      this.menuSurface.destroy();
    }
  }

}
