import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import ListItem from '../list-item';
import {MDCList} from '@material/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private list: MDCList;

  @Input() dense = false;
  @Input() avatarList = false;
  @Input() nonInteractive = false;
  @Input() twoLine = false;
  @Input() items: Array<ListItem>;

  currentClasses_ = {};

  constructor(private myElement: ElementRef) {

  }

  ngOnInit() {
    this.setCurrentClasses();
  }

  ngAfterViewInit() {
    this.list = new MDCList(this.myElement.nativeElement.firstChild);
  }

  ngOnDestroy() {
    if (this.list) {
      this.list.destroy();
    }
  }

  setCurrentClasses() {
    this.currentClasses_ = {
      'mdc-list--avatar-list': this.avatarList,
      'mdc-list--dense': this.dense,
      'mdc-list--non-interactive': this.nonInteractive,
      'mdc-list--two-line': this.twoLine,
    };
  }

  get title() {
    const firstItem = this.items[0];
    let title = '';
    title += this.dense ? 'Dense' : '';
    title += this.nonInteractive ? ' Non Interactive' : '';
    title += this.twoLine ? ' Two Line' : '';

    if (title.length && (firstItem.graphicIcon || firstItem.graphicText || firstItem.graphicImgPath)) {
      title += ' w/';
    }
    if (firstItem.graphicIcon) {
      title += ' Graphic Icon';
    } else if (firstItem.graphicText) {
      title += ' Graphic Icon';
    } else if (firstItem.graphicImgPath) {
      title += this.avatarList ? ' Avatar Graphic Img'   : ' Graphic Img';
    }
    
    if (firstItem.metaIcon || firstItem.metaText) {
      title += title.includes('Graphic') ? ' &' : '';
    }

    if (firstItem.metaIcon) {
      title += ' Meta Icon';
    } else if (firstItem.metaText) {
      title += ' Meta Text';
    }

    if (!title.length) {
      title += 'Basic List';
    }

    if (firstItem.selected) {
      title += ' - Selected Item';
    }
    return title;
  }

}
