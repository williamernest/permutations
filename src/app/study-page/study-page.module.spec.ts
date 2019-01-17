import { StudyPageModule } from './study-page.module';

describe('StudyPageModule', () => {
  let studyPageModule: StudyPageModule;

  beforeEach(() => {
    studyPageModule = new StudyPageModule();
  });

  it('should create an instance', () => {
    expect(studyPageModule).toBeTruthy();
  });
});
