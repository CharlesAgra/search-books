const axios = require('axios');
const inquirer = require('inquirer');

const question = ['Whats the name of the book? '];

const init = async () => {
    let prompt = await inquirer.createPromptModule();

    let config = {
        message: question,
        type: 'input',
        name: 'bookName'
    }

    let { bookName } = await prompt(config);

    return bookName;
}

const getBook = async (bookName) => await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`);

const final = async () => {
    let bookName = await init();
    let book = await getBook(bookName);

    let { title, imageLinks, description, authors, language, publishedDate, pageCount, previewLink } = book.data.items[0].volumeInfo;
    let { buyLink, listPrice } = book.data.items[0].saleInfo;

    console.log(`Title -> ${(title || 'not found')}`);
    console.log(`Description -> ${(description || 'not found')}`);
    console.log(`Published date -> ${(publishedDate) || 'not found'}`);
    console.log(`Page count -> ${(pageCount) || 'not found'}`);
    console.log(`Authors -> ${(authors || 'not found')}`);
    console.log(`Language -> ${(language || 'not found')}`);
    console.log(`Picture -> ${(imageLinks.smallThumbnail || 'not found')}`);
    console.log(`Preview -> ${(previewLink || 'not found')}`);
    console.log(`Buy Here -> ${(buyLink || 'not found')}`);
    if(listPrice) console.log(`Price -> R$ ${listPrice.amount}`);
    else console.log(`Price -> R$ not found`);
}

final();