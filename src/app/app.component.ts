import { Component } from '@angular/core';
import { DataRequestService } from './data-request.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marvel-madness';

  public characters = []

  constructor(private dataService: DataRequestService) { }

  ngOnInit() {
    this.dataService.getCharacters()
  }
  
}
