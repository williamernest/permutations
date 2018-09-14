import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MDCList} from '@material/list';

@Component({
  selector: 'app-sandbox-sidebar',
  templateUrl: './sandbox-sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sandbox-sidebar.component.scss']
})
export class SandboxSidebarComponent implements OnInit, OnDestroy, AfterViewInit {

  list: MDCList;
  constructor(private myElement: ElementRef) { }

  ngAfterViewInit() {
    this.list = new MDCList(this.myElement.nativeElement.querySelector('.mdc-list'));
  }

  ngOnDestroy() {
    if (this.list) {
      this.list.destroy();
    }
  }

  ngOnInit() {
  }

}
