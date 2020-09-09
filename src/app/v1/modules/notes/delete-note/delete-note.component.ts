import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { NotesService } from "../../../services/notes/notes.service";

@Component({
    selector: 'app-delete-note',
    templateUrl: './delete-note.component.html',
    styleUrls: ['./delete-note.component.css']
})
export class DeleteNoteComponent implements OnInit {
    xdata: any;
    className: string;
    show: boolean;
    transForm: FormGroup;
    isSubmitted = false;
    note : any;
    constructor(
        private notesService: NotesService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DeleteNoteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.note = this.data;
        this.show = false;
        this.className = "";
        this.transForm = this.formBuilder.group({
            
        });
    }

    deleteNote() {
        this.notesService.deleteNote(this.note._id).subscribe((data) => {
            console.log(data);
            this.xdata = data;
            this.className = "success";
            this.show = true;
        }, (error) => {
            console.log(error);
            this.xdata = error.error;
            this.className = "fail";
            this.show = true;
        });
    }
    close() {
        if(this.xdata){
            this.dialogRef.close({"event":"close","data":this.note._id});
        }else{
            this.dialogRef.close({"event":"cancel"});
        }  
    }
}
