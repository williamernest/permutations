import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MDCDrawer, MDCModalDrawerFoundation} from '@material/drawer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-component-drawer',
  templateUrl: './component-drawer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./component-drawer.component.scss']
})
export class ComponentDrawerComponent implements OnInit, OnDestroy, AfterViewInit {

  drawer: MDCDrawer;
  @Output()
  openChange = new EventEmitter<boolean>();

  constructor(private myElement: ElementRef, private router: Router) {
    router.events.subscribe(() => this.drawer.open = false);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.drawer = new MDCDrawer(this.myElement.nativeElement.firstChild);
    this.drawer.listen(MDCModalDrawerFoundation.strings.CLOSE_EVENT, () => this.openChange.emit(false));
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
