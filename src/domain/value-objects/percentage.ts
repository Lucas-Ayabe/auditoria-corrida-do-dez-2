export class Percentage {
  constructor(private value: number) {}

  of(number: number) {
    return number * this.toNumber();
  }

  toNumber(fractionalDigits: number | undefined = undefined) {
    if (fractionalDigits !== undefined) {
      return +(this.value / 100).toFixed(fractionalDigits);
    }

    return this.value / 100;
  }

  toString() {
    return `${this.value}%`;
  }
}
