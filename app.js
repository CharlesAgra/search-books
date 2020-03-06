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

const getBook = async (bookName) => {
    console.log(bookName);
    return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`);
}

const final = async () => {
    let bookName = await init();
    let book = await getBook(bookName)
    console.log(book);
}

final();