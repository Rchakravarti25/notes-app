import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { AddNoteComponent } from "../add-note/add-note.component";
import { NotesService } from '../../../services/notes/notes.service';
import { DeleteNoteComponent } from '../delete-note/delete-note.component';
import { UpdateNoteComponent } from '../update-note/update-note.component';


export interface Note {
    _id: string;
    note_name: string;
    note_text: string;
    note_date: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface Data {
    msg: string;
    data: Array<Note>;
}

@Component({
    selector: 'app-list-note',
    templateUrl: './list-note.component.html',
    styleUrls: ['./list-note.component.css']
})
export class ListNoteComponent implements OnInit {
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    initColumns: any[] = [
        { name: "sno", display: "SNo." },
        { name: "nn", display: "Note Name" },
        { name: "n", display: "Note" },
        { name: "d", display: "Date" },
        { name: "cat", display: "Created At" },
        { name: "uat", display: "Updated At" },
        { name: "i", display: "#" }
    ];
    displayedColumns: any[] = this.initColumns.map(col => col.name);
    dataSource: any;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private noteService: NotesService, private matDialog: MatDialog) {

    }
    ngOnInit() {
        this.noteService.getNotes(0, 100).subscribe((data: Data) => {
            console.log(data);
            this.dataSource = new MatTableDataSource<Note>(data.data);
        });

    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }, 500);
    }
    openDialogAddNote() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = "60%";
        dialogConfig.width = "60%";
        dialogConfig.data = { name: "Note" };
        dialogConfig.disableClose = true;
        let dialogRef = this.matDialog.open(AddNoteComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(value => {
            console.log(`Dialog sent: ${JSON.stringify(value)}`);
            if (value.event == "cancel") {
                console.log(value.event);
            } else {
                var data = this.dataSource.data;
                data.unshift(value.data);
                this.dataSource.data = data;
            }
        });
    }
    openDialogDeleteNote(note: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = "30%";
        dialogConfig.width = "30%";
        dialogConfig.data = note;
        dialogConfig.disableClose = true;
        let dialogRef = this.matDialog.open(DeleteNoteComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(value => {
            console.log(`Dialog sent: ${JSON.stringify(value)}`);
            if (value.event == "cancel") {
                console.log(value.event);
            } else {
                var data = this.dataSource.data;
                this.dataSource.data = data.filter((val, key) => {
                    return val._id != value.data;
                });
            }
        });
    }
    openDialogUpdateNote(note: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = "60%";
        dialogConfig.width = "60%";
        dialogConfig.data = note;
        dialogConfig.disableClose = true;
        let dialogRef = this.matDialog.open(UpdateNoteComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(value => {
            console.log(`Dialog sent: ${JSON.stringify(value)}`);
            if (value.event == "cancel") {
                console.log(value.event);
            } else {
                console.log(this.dataSource.data);
                var data = this.dataSource.data;
                this.dataSource = data.filter((val, key) => {
                    if (val._id == value.id) {
                        val.note_name = value.note_name;
                        val.note_text = value.note_text;
                    }
                    return true;
                });
            }
        });
    }
}
