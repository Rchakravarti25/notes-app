import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AddNoteComponent } from "../add-note/add-note.component";
import { NotesService } from '../../../services/notes/notes.service';


export interface Note {
    _id: string;
    note_name: string;
    note_text : string;
    note_date : Date;
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
    openDialogAddTransaction() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = "60%";
        dialogConfig.width = "60%";
        dialogConfig.data = { name: "some name" };
        let dialogRef = this.matDialog.open(AddNoteComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(value => {
            console.log(`Dialog sent: ${value}`);
        });
    }

}
