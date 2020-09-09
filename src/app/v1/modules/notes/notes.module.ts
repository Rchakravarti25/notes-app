import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddNoteComponent } from './add-note/add-note.component';
import { ListNoteComponent } from './list-note/list-note.component';
import { DeleteNoteComponent } from './delete-note/delete-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';


@NgModule({
    declarations: [AddNoteComponent, ListNoteComponent, DeleteNoteComponent, UpdateNoteComponent],
    imports: [
        CommonModule,
        NotesRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatDialogModule, MatInputModule, MatAutocompleteModule, MatSelectModule

    ],
    entryComponents : [AddNoteComponent,DeleteNoteComponent, UpdateNoteComponent]
})
export class NotesModule { }
