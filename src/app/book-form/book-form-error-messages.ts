export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}
export const BookFormErrorMessages = [
    new ErrorMessage('title', 'required', 'Ein Buchtitel muss angegeben werden'),
    new ErrorMessage('isbn', 'required', 'Es muss eine ISBN angegeben werden'),
    new ErrorMessage('isbn', 'minlength', 'Die ISBN muss mindestens 10 Zeichen enthalten'),
    new ErrorMessage('isbn', 'maxlength', 'Eine ISBN darf höchstens 13 Zeichen haben'),
    new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden'),
    new ErrorMessage('authors', 'required', 'Es muss ein Autor angegeben werden'),
    new ErrorMessage('rating', 'min', 'Bewertung kann nur positive Werte annehmen'),
    new ErrorMessage('rating', 'max', 'Maximal 10 Sterne erlaubt'),
    new ErrorMessage('price', 'required', 'Es muss ein Preis angegeben werden')
];

//je nachdem welcher Validator gefeuert wurde, wird eine andere Errormessage angezeigt
//es ist wichtig, den Usern zu sagen, was genau falsch ist und nicht nur dass etwas falsch ist
