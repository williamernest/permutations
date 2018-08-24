import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldRendererComponent } from './text-field-renderer.component';

describe('TextFieldRendererComponent', () => {
  let component: TextFieldRendererComponent;
  let fixture: ComponentFixture<TextFieldRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFieldRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
