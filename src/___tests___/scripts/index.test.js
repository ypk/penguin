import { enableFetchMocks } from 'jest-fetch-mock';
import { generateAltText, getData, sanitizeData } from "../../scripts/utils";

describe('testing generateAltText function', () => {
  
    let booksList = {};

    beforeEach(() => {
        booksList = {
            "To Kill a Mockingbird" : "Harper Lee",
            "1984" : "George Orwell",
            "The Lord of the Rings" : "J.R.R. Tolkien",
            "The Catcher in the Rye" : "J.D. Salinger",
            "The Great Gatsby" : "F. Scott Fitzgerald",
            "Chronicles of Narnia: The Lion, the Witch and the Wardrobe" : "C.S. Lewis",
            "Lord of the Flies" : "William Golding",
            "Animal Farm" : "George Orwell",
            "Catch-22" : "Joseph Heller",
            "The Grapes of Wrath" : "John Steinbeck"
        };
    });
  
  
    test('it generates an Alt Text by passing in book name and its author to generateAltText() function', () => {
        return Object.keys(booksList).forEach((book) => {
            let title = book
            let author = booksList[book];
            expect(`${title} by ${author}`).toBe(generateAltText(title, author));
        });
    });


    test('it generates a mismatched Alt Text by passing in just a book name to generateAltText() function', () => {
        return Object.keys(booksList).forEach((book) => {
            let title = book
            let author = booksList[book];
            expect(`${title} by ${author}`).not.toBe(generateAltText(title));
        });
    });
 
});


describe('testing sanitizeData function', () => {
  
    let booksList = [];

    beforeEach(() => {
        booksList = [
            "Catch-22",
            1984,
            "The Catcher in the Rye",
            "The Great Gatsby",
            "Lord of the Flies",
        ];
    });
  
    test("Second book from the list \"1984\" is not a string", () => {
        expect.assertions(typeof booksList[1] === "number");
    })

    test("Second book from the list \"1984\" is a string after sanitizing", () => {
        expect.assertions(typeof sanitizeData(booksList[1]) !== "number");
    })
  });


describe('testing getData function', () => {
    test('getData is called successfully', async () => {
        beforeEach(() => {
            fetch.resetMocks()
        })

        fetch.mockResponseOnce(JSON.stringify({
                "title": "Beloved",
                "author": "Toni Morrison<script>alert(123)</script>",
                "url": "https://www.penguin.co.uk/books/1032964/beloved/9780099760115.html",
                "image": "img/two.jpg"
        },{
                "title": "Macbeth",
                "url": "https://www.penguin.co.uk/books/54666/macbeth/9780141396316.html",
                "image": "img/six.jpg"
        }));

       await getData().then(res => res.json()).catch(err=>console.error(err))
        
        expect(fetch).toBeCalled()
    });

    test('response\'s author property is undefined', async () => {
        beforeEach(() => {
            fetch.resetMocks()
        })

        fetch.mockResponseOnce(JSON.stringify([{
            "title": "Beloved",
            "author": "Toni Morrison<script>alert(123)</script>",
            "url": "https://www.penguin.co.uk/books/1032964/beloved/9780099760115.html",
            "image": "img/two.jpg"
    },{
            "title": "Macbeth",
            "url": "https://www.penguin.co.uk/books/54666/macbeth/9780141396316.html",
            "image": "img/six.jpg"
    }]));

        getData().then(res => res.json()).then((data)=>{
            expect(data[1].author).toBeUndefined();
        }).catch(err=>console.error(err))
        
    });
});