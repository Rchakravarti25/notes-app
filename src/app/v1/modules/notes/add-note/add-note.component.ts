import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { NotesService } from "../../../services/notes/notes.service";

@Component({
    selector: 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
    //userdata: any;
    xdata: any;
    className: string;
    show: boolean;
    transForm: FormGroup;
    isSubmitted = false;
    constructor(
        private notesService:NotesService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AddNoteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.show = false;
        this.className = "";
        this.transForm = this.formBuilder.group({
            title: ["", Validators.required],
            note: ["", Validators.required],
            date: new FormControl()
        });
    }
    
    createNote() {
        this.isSubmitted = true;
        if (this.transForm.invalid) {
            return;
        } else {
            var jsn = {
                note_name : this.transForm.value.title,
                note_text : this.transForm.value.note,
                note_date : this.transForm.value.date

            }
            this.notesService.createNote(jsn).subscribe((data) => {
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
        this.dialogRef.close('Email!');
    }

}
