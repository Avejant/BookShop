export class Query {
    public Author: string;
    public Title: string;
    public Id: number;
    constructor(
        Author: string,
        Title: string,
        Id: number
    ) 
    { 
        this.Id = Id;
        this.Author = Author;
        this.Title = Title;
    }
}