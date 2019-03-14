export class Episode {

    private title: string;
    private id: string;
    private number: number;

    constructor(episode: object){
        this.title = episode['Title'];
        this.id = episode['imdbID'];
        this.number = Number(episode['Episode'])
    }
}