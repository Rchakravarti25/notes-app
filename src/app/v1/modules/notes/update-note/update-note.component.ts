import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { NotesService } from "../../../services/notes/notes.service";

@Component({
    selector: 'app-update-note',
    templateUrl: './update-note.component.html',
    styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {
    //userdata: any;
    xdata: any;
    className: string;
    show: boolean;
    transForm: FormGroup;
    isSubmitted = false;
    note : any;
    newNote : any;
    constructor(
        private notesService: NotesService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<UpdateNoteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.note = this.data;
        this.show = false;
        this.className = "";
        this.transForm = this.formBuilder.group({
            title: [this.data.note_name, Validators.required],
            note: [this.data.note_text, Validators.required]
        });
    }

    updateNote() {
        this.isSubmitted = true;
        if (this.transForm.invalid) {
            return;
        } else {
            var jsn = {
                note_name: this.transForm.value.title,
                note_text: this.transForm.value.note
            }
            this.newNote = jsn;
            this.notesService.updateNote(this.note._id,jsn).subscribe((data) => {
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
    }
    close() {
        if(this.xdata){
            this.newNote.id = this.note._id;
            this.dialogRef.close({"event":"close","data":this.newNote});
        }else{
            this.dialogRef.close({"event":"cancel"});
        } 
    }

}
