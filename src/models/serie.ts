import { Media } from "./media";

export class Serie extends Media{
    constructor(title: string, poster:string,
        description:string, date:string, id:string){
        super(title, poster, description, date, id);
        this.typeMedia = "serie";
    }
}