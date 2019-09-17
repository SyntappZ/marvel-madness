import { Component, OnInit } from '@angular/core';
import { DataRequestService } from '../data-request.service'
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private dataService: DataRequestService) { }

  ngOnInit() {
    this.dataService.sendCharacters().subscribe(data => console.log(data))
  }

}
