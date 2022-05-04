import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RandomRollerService {
    getRandomNumber(min: number, max: number, prev?: number): number {
        let numToReturn = Math.floor(Math.random() * (max - min + 1) ) + min;
        if (prev) {
            do {
                numToReturn = Math.floor(Math.random() * (max - min + 1) ) + min;
            } while (prev === numToReturn);
        }
        return numToReturn;
    }

    getSumOfMulipleRolls(numToRoll: number, dieSize: number): number {
        let sum = 0;
        for (let i = 0; i < numToRoll; i++) {
            const num = this.getRandomNumber(1, dieSize);
            sum += num;
        }
        return sum;
    }

    rollRandomDie(textToParse: string): string {
        // get die size
        const dLocation = textToParse.indexOf('d');
        const kLocation = textToParse.indexOf('K');
        let dieSize = textToParse.slice(dLocation + 1, kLocation);
        let multiplier = 1;

        if (dieSize.includes('x')) {
            dieSize = '10';
            multiplier = 10;
        }
        const numOfDie = textToParse.slice(0, dLocation) ? textToParse.slice(0, dLocation) : 1;
        const rolledNum = this.getSumOfMulipleRolls(Number(numOfDie), Number(dieSize)) * multiplier;

        return `${rolledNum}K¤`;
    }
}
