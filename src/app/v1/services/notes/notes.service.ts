import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    apiURL: string = environment.apiURL;

    constructor(private httpClient: HttpClient) { }

    //get notes
    public getNotes(offset: number, limit: number) {
        return this.httpClient.get(`${this.apiURL}/list-notes/`+offset+"/"+limit);
    }
    //create note
    public createNote(obj: any) {
        return this.httpClient.post(`${this.apiURL}/create-note`, obj);
    }
}
