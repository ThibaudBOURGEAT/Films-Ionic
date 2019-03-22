export class Media {
    public id: string;
    public title: string;
    public poster: string;
    public description: string;
    public date: string;
    public typeMedia: string;
    public rated: string;
    public genre: string;
    public producer: string;
    public actors: string;
    public awards: string;
    public imdbRating: string;
    public webSite: string;

    constructor(media: object){
            this.id = media['imdbID'];
            this.title = media['Title'];
            this.poster = media['Poster'];
            this.description = media['Plot'];
            this.date = media['Year'];
            this.typeMedia = "media";
            this.rated = media['Rated'];
            this.genre = media['Genre'];
            this.producer = media['Director'];
            this.actors = media['Actors'];
            this.awards = media['Awards'];
            this.imdbRating = media['imdbRating'];
            this.webSite = media['Website'];
    }
}