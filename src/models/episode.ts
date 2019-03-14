export class Episode {

    private title: string;
    private id: string;
    private number: number;
    private rating: string;
    private released: string;
    private runtime: string;
    private description: string;
    private votes: string;

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