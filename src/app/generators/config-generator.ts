interface ConfigGenerator<T> {
  filters: Object;

  generate(): Array<T>;
}
