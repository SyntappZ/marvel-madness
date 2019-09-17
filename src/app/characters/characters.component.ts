import { Component, OnInit } from '@angular/core';
import { DataRequestService } from '../data-request.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})

export class CharactersComponent implements OnInit {

  public characters = []

  constructor(private dataService: DataRequestService) { }

  ngOnInit() {
   this.dataService.sendCharacters().subscribe(data => console.log(data))
  }

}
