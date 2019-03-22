export class Episode {

    public title: string;
    public id: string;
    public number: number;
    public rating: string;
    public released: string;
    public runtime: string;
    public description: string;
    public votes: string;

    constructor(episode: object){
        this.title = episode['Title'];
        this.id = episode['imdbID'];
        this.number = Number(episode['Episode']);
        this.rating = episode['imdbRating'];
        this.released = episode['Released'];
        this.runtime = episode['Runtime'];
        this.description = episode['Plot'];
        this.votes = episode['imdbVotes'];
    }
}