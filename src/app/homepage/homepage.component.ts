import { Component, OnInit } from '@angular/core';
import { fadeAnimation, pageLeftToRight } from '../animations/animation';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [pageLeftToRight]
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
