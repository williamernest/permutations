import { Component, OnInit } from '@angular/core';
import {StylesService} from '../styles.service';

@Component({
  selector: 'app-download-theme-button',
  templateUrl: './download-theme-button.component.html',
  styleUrls: ['./download-theme-button.component.scss']
})
export class DownloadThemeButtonComponent implements OnInit {

  constructor(private stylesService: StylesService) { }

  ngOnInit() {
  }

  onClick() {
    let data = '';

    this.stylesService.getColors().forEach(el => {
      if (el.value !== '') {
        data = `${data}\n$mdc-theme-${el.name}: ${el.value};`;
      }
    });

    this.stylesService.getShape().forEach(el => {
      if (el.value !== '' && el.value !== el.defaultValue) {
        data = ` ${data}\n${el.name}: ${el.value}${el.value > 0 ? 'px' : ''};`;
      }
    });

    data = `${data}
      @import "material-components-web/material-components-web.scss";
    `;
    this.stylesService.compileLocalStyles(data).subscribe(res => {
      const fileName = 'material-components-web--custom.css';
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(res, fileName);
      } else {
        const link = document.createElement('a');
        link.setAttribute('type', 'hidden');
        link.download = fileName;
        link.href = window.URL.createObjectURL(new Blob([res], {type: 'text/css'}));
        document.body.appendChild(link);
        link.click();
      }
    });
  }

}
