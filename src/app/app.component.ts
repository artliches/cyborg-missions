import { Component, OnInit } from '@angular/core';
import { RandomRollerService } from './services/random-roller.service';
import { COMPLICATIONS, CONTACT, GEO, JOB, LOCATION, LOCATION_FEATURES, PATRON, REWARD, SECURITY, TARGET } from './services/random-tables.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentTheme = 'void';
  themes = [
    'void',
    'dark',
    'mork',
    'terminal',
    'malfunction',
    'bi',
    'blues',
    'slasher',
  ];

  missionObj: {[key: string]: {text: string, prev: number}} = {
    contact: {
      text: '',
      prev: 0
    },
    patron: {
      text: '',
      prev: 0
    },
    reward: {
      text: '',
      prev: 0
    },
    job: {
      text: '',
      prev: 0
    },
    target: {
      text: '',
      prev: 0
    },
    location: {
      text: '',
      prev: 0
    },
    location_distinct: {
      text: '',
      prev: 0
    },
    location_hidden: {
      text: '',
      prev: 0
    },
    location_danger: {
      text: '',
      prev: 0
    },
    geo: {
      text: '',
      prev: 0
    },
    security: {
      text: '',
      prev: 0
    },
    complications: {
      text: '',
      prev: 0
    },
  };

  missionData: {[key: string]: string[]} = {
    contact: CONTACT,
    patron: PATRON,
    reward: REWARD,
    job: JOB,
    target: TARGET,
    location: LOCATION,
    location_distinct: LOCATION_FEATURES.distinct,
    location_hidden: LOCATION_FEATURES.hidden,
    location_danger: LOCATION_FEATURES.danger,
    geo: GEO,
    security: SECURITY,
    complications: COMPLICATIONS,
  };

  showThemes = false;

  constructor(
    private randomNumber: RandomRollerService
  ) {}

  ngOnInit(): void {
      this.createMission();
      const storedTheme = localStorage.getItem('theme');
      this.currentTheme = storedTheme ? storedTheme : 'void';
      localStorage.setItem('theme', this.currentTheme);
  }

  createMission(): void {
    for (const [key, value] of Object.entries(this.missionObj)) {
      this.createSingleMissionData(key);
    }
  }

  createSingleMissionData(dataToRoll: string): void {
    const dataSize = this.missionData[dataToRoll].length - 1;
    const currRoll = this.randomNumber.getRandomNumber(0, dataSize, this.missionObj[dataToRoll].prev);
    let newText = this.missionData[dataToRoll][currRoll];
    this.missionObj[dataToRoll].prev = currRoll;

    if (dataToRoll === 'reward' && this.missionObj.reward.prev > 11) {
      newText = this.randomNumber.rollRandomDie(newText);
    }
    this.missionObj[dataToRoll].text = newText;
  }

  chooseTheme(chosenTheme: string): void {
    this.currentTheme = chosenTheme;
    localStorage.setItem('theme', this.currentTheme);
  }

  print(): void {
    window.print();
  }
}
