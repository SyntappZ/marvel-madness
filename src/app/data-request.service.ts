import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataRequestService {
  // params: {
  //   'apikey': "ef239eb34d7e33844e443bf7e932549e",
  //   'ts': '1',
  //   'hash': '736cb36fe5fc715d48ccd74649ed4a21'

  // },

  readonly URL = "http://gateway.marvel.com/v1/public/characters";
  //readonly ROOT_URL = 'http://gateway.marvel.com/v1/public/stories/544'
  readonly apiKey = "ef239eb34d7e33844e443bf7e932549e";

  public marvelData: any = [];

  constructor(private http: HttpClient) {}

  randomise(min:number, max:number) {
    if(max === null) {
      return Math.floor(Math.random() * min)
    }else{
      return Math.floor(Math.random() * (max - min) + min)
    }
   
  }

  getCharacters() {
    let params = new HttpParams()
      .set("limit", "30")
      .set("series", "9085")
      .set("apikey", this.apiKey)
      .set("ts", "1")
      .set("hash", "736cb36fe5fc715d48ccd74649ed4a21");

    this.http.get(this.URL, { params }).subscribe(data => {
      let characters = data.data.results;

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

        let powerWeakness = elements[this.randomise(elements.length, null)];
        let element:string = powerWeakness[this.randomise(2, null)];
        let weakness:string = powerWeakness.filter(x => x !== element).join();
        let elementalPower:string =
          powersArray[element][
            this.randomise(powersArray[element].length, null)
          ];
        let randomHP:number = this.randomise(800, 1200)
        let strength:number = 1000 - randomHP + 200;
        let nonElementalPower:string = nonElementalPowers[this.randomise(nonElementalPowers.length, null)]
        let special:object = specialAbilities[this.randomise(specialAbilities.length, null)]
          
        let EStrength:number = this.randomise(300, 450)
        let NEStrength:number = this.randomise(250, 550)
        let speed:number = (EStrength + NEStrength) * 5;
        let abilitySpeed:number = (EStrength + NEStrength) * 15;
       
        this.marvelData.push({
          id: x.id,
          name: x.name.replace(/[(\W+)]/gi, ""),
          image: x.thumbnail.path + "." + x.thumbnail.extension,
          comics: x.comics.items.map(x => x.name),
          series: x.series.items.map(x => x.name),
          speed: speed,
          abilitySpeed: abilitySpeed,
          hp: randomHP,
          acuracy: this.randomise(80, 100),
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
    console.log(this.marvelData)
    return this.marvelData;
  }
}
