import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MDCTemporaryDrawer} from '@material/drawer';

@Component({
  selector: 'app-component-drawer',
  templateUrl: './component-drawer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./component-drawer.component.scss']
})
export class ComponentDrawerComponent implements OnInit, OnDestroy, AfterViewInit {

  drawer: MDCTemporaryDrawer;
  @Output('open') outEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private myElement: ElementRef) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.drawer = new MDCTemporaryDrawer(this.myElement.nativeElement.firstChild);
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
      this.outEvent.emit(open);
    }
  }

}
