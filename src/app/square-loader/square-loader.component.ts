import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square-loader',
  templateUrl: './square-loader.component.html',
  styleUrls: ['./square-loader.component.scss'],
})
export class SquareLoaderComponent implements OnInit {
  @Input() width!: number;

  constructor() {}

  ngOnInit(): void {}
}
