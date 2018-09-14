import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MDCTopAppBar, MDCTopAppBarFoundation} from '@material/top-app-bar';

@Component({
  selector: 'app-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./top-app-bar.component.scss']
})
export class TopAppBarComponent implements OnInit, OnDestroy, AfterViewInit {

  private topAppBar: MDCTopAppBar;

  constructor(private myElement: ElementRef) { }

  ngOnInit() {
  }

  @Output('open')
  outEvent = new EventEmitter();

  ngAfterViewInit(): void {
    this.topAppBar = new MDCTopAppBar(this.myElement.nativeElement.firstChild);
    this.topAppBar.listen(MDCTopAppBarFoundation.strings.NAVIGATION_EVENT, () => this.outEvent.emit());
  }

  ngOnDestroy(): void {
    if (this.topAppBar) {
      this.topAppBar.destroy();
    }
  }
}
