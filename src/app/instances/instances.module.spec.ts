import { InstancesModule } from './instances.module';

describe('InstancesModule', () => {
  let instancesModule: InstancesModule;

  beforeEach(() => {
    instancesModule = new InstancesModule();
  });

  it('should create an instance', () => {
    expect(instancesModule).toBeTruthy();
  });
});
