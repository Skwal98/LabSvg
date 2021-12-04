import { Component, Input, OnInit } from '@angular/core';
import { Point } from './point';

@Component({
  selector: 'app-square-loader',
  templateUrl: './square-loader.component.html',
  styleUrls: ['./square-loader.component.scss'],
})
export class SquareLoaderComponent implements OnInit {
  @Input() width!: number;

  _timeout!: any;
  _time = 1000;
  _cadrInSec = 20;

  constructor() {}

  ngOnInit(): void {
    this._timeout = setInterval(() => {
      this.nextMove();
    }, this._cadrInSec);
  }

  public get radius(): number {
    return this.width / 2;
  }

  public get centerPoint(): Point {
    return new Point(this.radius);
  }

  public get startPoint(): Point {
    return this.centerPoint.moveY(-this.radius);
  }

  private _currentPoint?: Point;
  private _path?: string;

  public get polygonPoints(): string {
    return this._path!;
  }

  nextMove(): void {
    if (!this._currentPoint) {
      this._currentPoint = this.startPoint;
    } else {
      const widthForAnimate = this.width / 2;
      const step = (widthForAnimate / this._time) * this._cadrInSec;

      this._currentPoint.moveX(step);
    }

    //check end
    if (this._currentPoint.x > this.width) {
      clearInterval(this._timeout);
    }

    this._path = '';
    this._path += this.centerPoint;
    this._path += this.startPoint;
    this._path += this._currentPoint;
  }
}
