import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {

  config_: Object;
  currentComponent = 'textfield';
  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  updateCurrentComponent(event) {
    this.currentComponent = event;
  }

  @Input()
  set config(config) {
    if (config && this.config_ !== config) {
      this.config_ = config;
      this.changeRef.detectChanges();
    }
  }

  get config() {
    return this.config_;
  }

}
