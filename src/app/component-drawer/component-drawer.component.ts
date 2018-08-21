import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MDCPersistentDrawer} from '@material/drawer';

@Component({
  selector: 'app-component-drawer',
  templateUrl: './component-drawer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./component-drawer.component.scss']
})
export class ComponentDrawerComponent implements OnInit, OnDestroy, AfterViewInit {

  drawer: MDCPersistentDrawer;

  constructor(private myElement: ElementRef) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.drawer = new MDCPersistentDrawer(this.myElement.nativeElement.firstChild);
  }

  ngOnDestroy(): void {
    if (this.myElement) {
      this.drawer.destroy();
    }
  }

  @Input()
  set open(open) {
    if (this.drawer) {
      this.drawer.open = open;
    }
  }

}
