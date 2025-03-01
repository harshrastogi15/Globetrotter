
export class RandomIndex{
    static getRandomIndex(limit){
        return Math.floor(Math.random()*100*Math.random()*100)%limit;
    }
}
