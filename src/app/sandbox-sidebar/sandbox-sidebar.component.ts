import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MDCList} from '@material/list';

@Component({
  selector: 'app-sandbox-sidebar',
  templateUrl: './sandbox-sidebar.component.html',
  styleUrls: ['./sandbox-sidebar.component.scss']
})
export class SandboxSidebarComponent implements OnInit, OnDestroy, AfterViewInit {

  list: MDCList;
  @Output() currentComponent: EventEmitter<string> = new EventEmitter();

  private value_: string;
  constructor(private myElement: ElementRef) { }

  ngAfterViewInit() {
    this.list = new MDCList(this.myElement.nativeElement.querySelector('.mdc-list'));
    this.list.singleSelection = true;
  }

  ngOnDestroy() {
    if (this.list) {
      this.list.destroy();
    }
  }

  ngOnInit() {}

  updateSelected(event) {
    const value = event.target.getAttribute('value');
    if (value && value !== '' && value !== this.value_) {
      this.value_ = value;
      this.currentComponent.emit(value);
    }
  }

}
