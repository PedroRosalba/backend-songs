export class Validations {
    constructor(){

    }
    isValidDate(date: Date): boolean {
        return !isNaN(date.getTime());
    }

    isValidTime(time: Date): boolean {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
    }    
}

