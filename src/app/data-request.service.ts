import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ICharacters } from './characters/characters'

@Injectable({
  providedIn: "root"
})
export class DataRequestService {
  
  readonly URL = "http://gateway.marvel.com/v1/public/characters";
  //readonly ROOT_URL = 'http://gateway.marvel.com/v1/public/stories/544'
  readonly apiKey = "ef239eb34d7e33844e443bf7e932549e";

  public marvelData:ICharacters[] = [];


  constructor(private http: HttpClient) {}

  randomise(min:number, max:number) {
    if(max === null) {
      return Math.floor(Math.random() * min)
    }else{
      return Math.floor(Math.random() * (max - min) + min)
    }
   
  }
  sendCharacters():Observable<ICharacters[]>{
    return of(this.marvelData)
  }
  

  getCharacters() {
    let params = new HttpParams()
      .set("limit", "30")
      .set("series", "9085")
      .set('offset', '4')
      .set("apikey", this.apiKey)
      .set("ts", "1")
      .set("hash", "736cb36fe5fc715d48ccd74649ed4a21");

    this.http.get<any>(this.URL, { params }).subscribe(res => {
     
      let characters = res.data.results;
      
      let earth = ["rock punch", "slab smash", "mud wipe", "scull crusher"];
      let wind = ["wind wiper", "gail weathers", "mighty blow", "fan blast"];
      let fire = ["fire storm", "burn", "fire blast", "melt", "scald"];
      let ice = ["freezer", "arctic blast", "snowy claw", "snowman"];
      let lightning = [
        "electrocute",
        "static blast",
        "thunder storm",
        "frazzle",
        "battery bomb"
      ];
      let water = [
        "torrential rain",
        "mexican wave",
        "soak",
        "flood",
        "super soaker",
        "tsunami"
      ];
      let dark = [
        "dark energy",
        "dark matter",
        "black hole",
        "soul destroyer",
        "ouija",
        "blackout"
      ];
      let light = [
        "holy spirit",
        "blinding light",
        "supernova",
        "smite",
        "flash"
      ];
      let powersArray = {
        earth,
        wind,
        fire,
        ice,
        lightning,
        water,
        dark,
        light
      };

      let elements = [
        ["fire", "ice"],
        ["lightning", "water"],
        ["light", "dark"],
        ["earth", "wind"]
      ];

      let nonElementalPowers = [
        "headbutt",
        "smash",
        "destroyer",
        "silly slap",
        "nose breaker",
        "ground pound",
        "gun blast",
        "acid attack",
        "deadeye",
        "super human",
        "dragon breath",
        "extreme madness",
        'stinky breath',
        'flying kick',
        'roundhouse',
        'monster punch',
        'major fart',
        'nuclear blast',
        'deadly force',
        'master sword',
        'happy slap',
        'hyper kick',
        'sword slash'
      ];
     
      let specialAbilities = [
        {
          ability: 'poison',
          who: 'opponent',
          type: 'health',
          action: '- 100',
          time: 'opponents turn'
        },
        {
          ability: 'blind',
          who: 'opponent',
          type: 'accuracy',
          action: '- 50',
          time: '15000'
        },
        {
          ability: 'slow',
          who: 'opponent',
          type: 'speed',
          action: '+ 1500',
          time: '15000'
        },
        {
          ability: 'haste',
          who: 'own',
          type: 'speed',
          action: '- 1500',
          time: '15000'
        },
        {
          ability: 'heal',
          who: 'own',
          type: 'hp',
          action: '+ 500',
          time: 'opponent turn'
        },
        {
          ability: 'drain',
          who: 'opponent & own',
          type: 'hp',
          action: '- 50',
          time: 'opponent turn'
        },
        {
          ability: 'attack guard',
          who: 'opponent',
          type: 'attack',
          action: '- 150',
          time: '15000'
        },
        {
          ability: 'magic boost',
          who: 'own',
          type: 'elementalStrength',
          action: '+ 200',
          time: 'once'
        },
        {
          ability: 'attack boost',
          who: 'own',
          type: 'attack',
          action: '+ 200',
          time: 'once'
        },
      ]
    
      characters.forEach(x => {
       
        //powers
        let powerWeakness = elements[this.randomise(elements.length, null)];
        let element:string = powerWeakness[this.randomise(2, null)];
        let weakness:string = powerWeakness.filter(x => x !== element).join();
        let elementalPower:string =
          powersArray[element][
            this.randomise(powersArray[element].length, null)
          ];
        let nonElementalPower:string = nonElementalPowers[this.randomise(nonElementalPowers.length, null)]
        let special:any = specialAbilities[this.randomise(specialAbilities.length, null)]


        //health
        let randomHP:number = this.randomise(1200, 1700)
        

        //strength
        let strength:number = (1700 - randomHP) + 200;
        let EStrength:number = this.randomise(500, 750)
        let NEStrength:number = this.randomise(550, 850)
        let totalStrength:number = (EStrength + NEStrength + strength)

        //speed
        let speed:number = ((EStrength + NEStrength) * 4) + (strength * 3);
        let abilitySpeed:number = (EStrength + NEStrength) * 15;
   

        // accuracy
         let accuracy:number = Math.floor((3000 - totalStrength) / 13)
     
          accuracy > 100 ? accuracy = 100 : accuracy = accuracy

        this.marvelData.push({
          id: x.id,
          name: x.name.replace(/[(\W+)]/gi, ""),
          image: x.thumbnail.path + "." + x.thumbnail.extension,
          comics: x.comics.items.map(x => x.name),
          series: x.series.items.map(x => x.name),
          totalStrength: totalStrength,
          speed: speed,
          abilitySpeed: abilitySpeed,
          hp: randomHP,
          accuracy: accuracy,
          attack: strength,
          specialPowers: [
            {
              elementalPower: elementalPower,
              elementalStrength: EStrength
            },
            {
              nonElementalPower: nonElementalPower,
              nonElementalStrength: NEStrength
            },
            {
              ...special
            }
            
            
          ],
          element: element,
          weak: weakness
        });
      });
    });
   
     
      return this.marvelData;

   
  }
}
