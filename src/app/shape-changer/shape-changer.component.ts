import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-shape-changer',
  templateUrl: './shape-changer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./shape-changer.component.scss']
})
export class ShapeChangerComponent implements OnInit {

  constructor(private httpClient: HttpClient, private ele: ElementRef, private router: Router) {
  }

  ngOnInit() {
  }

}
