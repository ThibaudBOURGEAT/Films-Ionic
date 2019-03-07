export class Media {
    protected id: string;
    protected title: string;
    protected poster: string;
    protected description: string;
    protected date: string;
    protected typeMedia: string; 

    constructor(title:string, poster:string, 
        description:string, date:string, id:string){
            this.id = id;
            this.title = title;
            this.poster = poster;
            this.description = description;
            this.date = date;
            this.typeMedia = "media";
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