export class Point {
  public x: number;
  public y: number;

  constructor(x: number);
  constructor(x: number, y: number);
  constructor(...coords: number[]) {
    this.x = coords[0];
    this.y = coords.length === 2 ? coords[1] : this.x;
  }

  public toString = (): string => {
    return `${this.x}, ${this.y} `;
  };

  public moveX(value: number): Point {
    this.x += value;
    return this;
  }

  public moveY(value: number): Point {
    this.y += value;
    return this;
  }
}
