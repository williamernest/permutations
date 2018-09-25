interface CodeGenerator {
  getAndroid(config: any): string;
  getJSX(config: any): string;
  getWebComponents(config: any): string;
  getIOS(config: any): string;
  getFlutter(config: any): string;
}
