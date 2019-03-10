export class Media {
    protected id: string;
    protected title: string;
    protected poster: string;
    protected description: string;
    protected date: string;
    protected typeMedia: string;
    protected rated: string;
    protected genre: string;
    protected producer: string;
    protected actors: string;
    protected awards: string;
    protected imdbRating: string;
    protected webSite: string;

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

    public Id = () =>{
        return this.id;
    }

    public Title = () =>{
        return this.title;
    }

    public Poster = () =>{
        return this.poster;
    }

    public Description = () =>{
        return this.description;
    }

    public Date = () =>{
        return this.date;
    }

    public TypeMedia = () =>{
        return this.typeMedia;
    }
}