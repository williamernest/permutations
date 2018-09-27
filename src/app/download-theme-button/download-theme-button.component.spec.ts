import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadThemeButtonComponent } from './download-theme-button.component';

describe('DownloadThemeButtonComponent', () => {
  let component: DownloadThemeButtonComponent;
  let fixture: ComponentFixture<DownloadThemeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadThemeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadThemeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
