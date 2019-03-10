export class Episode {

    private title: string;
    private id: string;

    constructor(episode: object){
        this.title = episode['Title'];
        this.id = episode['imdbID'];
    }
}