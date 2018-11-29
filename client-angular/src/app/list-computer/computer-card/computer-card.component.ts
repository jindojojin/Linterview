import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-computer-card',
  templateUrl: './computer-card.component.html',
  styleUrls: ['./computer-card.component.css']
})
export class ComputerCardComponent implements OnInit {
  @Input() computer : string;
  constructor() {
    console.log(this.computer)
   }

  ngOnInit() {
  }

}
