export class Money {
  private constructor(private value: number) {}

  static from(value: number) {
    if (value < 0) {
      throw new Error("A Monetary value must be an natural number.");
    }

    return new Money(value);
  }

  private moneyOrNumberToNumber(value: Money | number) {
    if (typeof value === "number") return value;
    return value.toNumber();
  }

  add(otherMoney: Money | number) {
    return new Money(this.toNumber() + this.moneyOrNumberToNumber(otherMoney));
  }

  subtract(otherMoney: Money | number) {
    return new Money(this.toNumber() - this.moneyOrNumberToNumber(otherMoney));
  }

  multiply(otherMoney: Money | number) {
    return new Money(this.toNumber() * this.moneyOrNumberToNumber(otherMoney));
  }

  divide(otherMoney: Money | number) {
    return new Money(this.toNumber() / this.moneyOrNumberToNumber(otherMoney));
  }

  power(otherMoney: Money | number) {
    return new Money(this.toNumber() ** this.moneyOrNumberToNumber(otherMoney));
  }

  toNumber() {
    return this.value;
  }

  toString() {
    return this.value.toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
    });
  }
}
