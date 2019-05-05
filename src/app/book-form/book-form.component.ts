import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { BookFormErrorMessages } from './book-form-error-messages';
import {BookFactory} from "../shared/book-factory";
import {BookStoreService} from "../shared/book-store.service";
import {Book, Image} from "../shared/book";

@Component({
    selector: 'bs-book-form',
    templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
    bookForm: FormGroup; // : --> vom Typ
    book = BookFactory.empty(); //neues leeres Book wird erzeugt
    errors: { [key: string]: string } = {};
    isUpdatingBook = false;
    images: FormArray;

    constructor(private fb: FormBuilder, private bs: BookStoreService,
                private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const isbn = this.route.snapshot.params['isbn'];
        if (isbn) {
            this.isUpdatingBook = true; //wenn ISBN bereits besteht, ändern wir ein bestehendes Buch und legen kein neues an
            this.bs.getSingle(isbn).subscribe(book => {
                this.book = book;
                this.initBook();
            });
        }
        this.initBook();
    }

    initBook() {
        this.buildThumbnailsArray();

        this.bookForm = this.fb.group({
            id: this.book.id,
            title: [this.book.title, Validators.required], //mit dem Validator wird title zum Pflichtfeld
            subtitle: this.book.subtitle,
            price: [this.book.bruttoPrice,
                Validators.required,
            ],
            isbn: [this.book.isbn, [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(13)
            ]],
            description: this.book.description,
            rating: [this.book.rating,[
                Validators.min(0),//min/max bezieht sich auf einen numerischen Wert
                Validators.max(10)
            ]],
            //authors: this.authors,
            images: this.images,
            published: new Date(this.book.published),
        });
        this.bookForm.statusChanges.subscribe(() => this.updateErrorMessages());
    }

    buildThumbnailsArray() {
        console.log(this.book.images);
        if(this.book.images.length == 0){ //if new book had no images -> but no in edit mode
            this.book.images.push(new Image(0,'',''))
        }
        this.images = this.fb.array( //erzeugt ein Subformular, für jedes Bild
            this.book.images.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    url: this.fb.control(t.url),
                    title: this.fb.control(t.title)
                })
            )
        );
        console.log(this.images);
    }

    addThumbnailControl() { //hier kann ich ein neues Bild hinzufügen
        this.images.push(this.fb.group({ url: null, title: null }));
    }

    submitForm() {
        // filter empty values
        this.bookForm.value.images = this.bookForm.value.images.filter(thumbnail => thumbnail.url);

        const book: Book = BookFactory.fromObject(this.bookForm.value); //generiert aus dem Formular wieder ein Book Object
//deep copy  - did not work without??
        book.images = this.bookForm.value.images; // Book images Array mit den Formular Daten mappen
        book.nettoPrice = this.book.bruttoPrice * 100/120;
        console.log(book);

        //just copy the authors
        book.authors = this.book.authors;

        if (this.isUpdatingBook) {
            this.bs.update(book).subscribe(res => {
                this.router.navigate(['../../books', book.isbn], { relativeTo: this.route });
            });
        } else {
            book.user_id = Number.parseInt(localStorage.getItem('userId'));

            console.log(book);
            this.bs.create(book).subscribe(res => { //Formular wird zurück gesetzt und wir gehen in die Buchübersicht zurück
                this.book = BookFactory.empty();
                this.bookForm.reset(BookFactory.empty());
                this.router.navigate(['../books'], { relativeTo: this.route });
            });
        }
    }

    updateErrorMessages() {
        this.errors = {};
        for (const message of BookFormErrorMessages) {
            const control = this.bookForm.get(message.forControl);
            if (control &&
                control.dirty && //veränderter Status der im Model noch nicht validiert ist, im Formular beim ändern wird was geändert zb title
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}