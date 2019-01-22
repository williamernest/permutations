import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPageTfComponent } from './study-page-tf.component';

describe('StudyPageTfComponent', () => {
  let component: StudyPageTfComponent;
  let fixture: ComponentFixture<StudyPageTfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyPageTfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPageTfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
