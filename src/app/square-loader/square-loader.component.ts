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
  _cadrInSec = 30;

  constructor() {}

  ngOnInit(): void {
    this._currentPoint = this.startPoint;
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

  private _currentPoint!: Point;
  private _path?: string;

  public get polygonPoints(): string {
    return this._path!;
  }

  public get perimeter(): number {
    return this.width * 4;
  }

  public get pointsArray(): number[] {
    return [
      this.radius,
      this.radius * 2,
      this.radius * 2,
      this.radius * 2,
      this.radius,
    ];
  }

  public get stepCount(): number {
    let val = this._time / this._cadrInSec;
    return val - (val % 8);
  }

  public get arrayStep(): number {
    let summaryPointsArray = 0;
    for (let i = 0; i < this.pointsArray.length; i++) {
      summaryPointsArray += this.pointsArray[i];
      if (this.fullStep < summaryPointsArray) {
        return i;
      }
    }
    return 0;
  }

  public initialPath() {
    this._path = '';
    this._path += this.centerPoint;
    this._path += this.startPoint;
    this.additionalPoints.forEach((point) => {
      this._path! += point;
    });
  }

  fullStep: number = 0;
  additionalPoints: Point[] = [];
  nextMove(): void {
    this.initialPath();

    let stepCount = this.stepCount;
    let step = this.pointsArray[this.arrayStep] / (stepCount / 4);

    this.pushDistinctPoint(this.arrayStep);
    if (this.arrayStep === 0) {
      step = this.pointsArray[0] / (stepCount / 8);
      this._currentPoint.moveX(step);
    }
    if (this.arrayStep === 1) {
      this._currentPoint.moveY(step);
    }
    if (this.arrayStep === 2) {
      this._currentPoint.moveX(-step);
    }
    if (this.arrayStep === 3) {
      this._currentPoint.moveY(-step);
    }
    if (this.arrayStep === 4) {
      step = this.pointsArray[4] / (stepCount / 8);
      this._currentPoint.moveX(step);
    }
    this.fullStep += step;

    if (this.fullStep > this.perimeter) {
      this.indexArrayStep++;
      this.correctLastPoint();
      this.initialPath();
      clearInterval(this._timeout);
    }
  }

  indexArrayStep = -1;
  public pushDistinctPoint(indexArrayStep: number) {
    if (this.indexArrayStep !== indexArrayStep) {
      this.indexArrayStep = indexArrayStep;
      this.correctLastPoint();
      this._currentPoint = this._currentPoint.copy();
      this.additionalPoints.push(this._currentPoint);
    }
  }

  public get lastAdditionalPoint(): Point {
    return this.additionalPoints[this.additionalPoints.length - 1];
  }

  public correctLastPoint(): void {
    if (this.indexArrayStep === 0) return;
    if (this.indexArrayStep === 1) {
      this.lastAdditionalPoint.x = this.pointsArray[this.indexArrayStep];
    }
    if (this.indexArrayStep === 2) {
      this.lastAdditionalPoint.y = this.pointsArray[this.indexArrayStep];
    }
    if (this.indexArrayStep === 5) {
      this.lastAdditionalPoint.x = this.pointsArray[this.indexArrayStep - 1];
    }
  }

  //second version
  public newTime = 1000;

  public get getWidth(): string {
    return this.width + '';
  }

  public get halfWidth(): string {
    return this.width / 2 + '';
  }

  public get halfPart(): number {
    return this.newTime / 8000;
  }

  public get fullPart(): number {
    return this.halfPart * 2;
  }
}
