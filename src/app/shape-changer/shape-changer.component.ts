import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewEncapsulation} from '@angular/core';
import {MDCMenuSurface, MDCMenuSurfaceFoundation} from '@material/menu-surface';
import {MDCSlider, MDCSliderFoundation} from '@material/slider';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {StylesService} from '../styles.service';

@Component({
  selector: 'app-shape-changer',
  templateUrl: './shape-changer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./shape-changer.component.scss']
})
export class ShapeChangerComponent implements AfterViewInit, OnDestroy{

  shapes: Array<any> = [];
  sliderArr: Array<MDCSlider>;

  @Output() cssChange: EventEmitter<string> = new EventEmitter<string>();
  menuSurface: MDCMenuSurface;
  httpRequestDebouncer = new Subject();

  constructor(private httpClient: HttpClient, private ele: ElementRef, private router: Router, private stylesService: StylesService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.httpRequestDebouncer.subscribe(() => {
      this.stylesService.compileGlobalStyles('demo-global-colors');
    });

    this.shapes = this.stylesService.getShape();
  }

  updateShape() {
    this.stylesService.setShape(this.shapes);
    this.httpRequestDebouncer.next();
  }

  ngAfterViewInit(): void {
    this.menuSurface = new MDCMenuSurface(this.ele.nativeElement.querySelector('.mdc-menu-surface'));
    const anchorElement = this.ele.nativeElement.querySelector('.mdc-menu-surface--anchor');
    this.sliderArr = Array.from(this.ele.nativeElement.querySelectorAll('.mdc-slider')).map((element) => new MDCSlider(element));

    this.menuSurface.setMenuSurfaceAnchorElement(anchorElement);
    this.menuSurface.hoistMenuToBody();

    this.menuSurface.listen(MDCMenuSurfaceFoundation.strings.OPENED_EVENT,
      () => {
        this.shapes = this.stylesService.getShape();
        this.changeDetectorRef.detectChanges();
        this.sliderArr.forEach((slide) => slide.layout());
      });

    this.sliderArr.forEach((slider) => slider.listen(MDCSliderFoundation.strings.CHANGE_EVENT,
      (event) => {
       const sliderVariable = event.target.getAttribute('data-slider-variable');
       this.shapes.filter((shape) => shape.name === sliderVariable)
         .forEach((shape) => shape.value = event.target.getAttribute('aria-valuenow'));
      }));
  }

  toggle() {
    if (this.menuSurface) {
      this.menuSurface.open = !this.menuSurface.open;
    }
  }

  ngOnDestroy(): void {
    if (this.menuSurface) {
      this.menuSurface.destroy();
    }
  }

}
