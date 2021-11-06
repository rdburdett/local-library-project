// const { books } = require('../data/books.js')
// console.log(books)

function findAuthorById(authors, searchId) {
  return authors.find(({id}) => id === searchId)
}

function findBookById(books, searchId) {
  return books.find(({id}) => id === searchId)
}

function partitionBooksByBorrowedStatus(books) {
  let outputA = []
  let outputB = []

  books.forEach(book => {
    let thisBookBorrows = (book.borrows)
    let isBookBorrowed = thisBookBorrows.some((borrow) => (borrow.returned === false))
    // console.log(`Book ${book.id} borrowed? ${isBookBorrowed}`)
    isBookBorrowed===true ? outputA.push(book) : outputB.push(book)
  })
  let outputArray = [outputA, outputB]
  console.log(outputArray)
  return outputArray
}

// console.log(partitionBooksByBorrowedStatus(books))
function getBorrowersForBook(book, accounts) {
  // console.log(book)
  let outputArray = []
  let bookBorrows = book.borrows

  // console.log(bookBorrows)
  for (let i = 0; (i < bookBorrows.length) && (i < 10); i++) {
    let borrow = bookBorrows[i];
    let thisId = borrow.id
    isReturned = borrow.returned
    // console.log(thisId)
    let currentUser = accounts.find(({id}) => (id === thisId))
    let outputObject = {
      ...currentUser,
      returned: isReturned
    }
    outputArray.push(outputObject)
  }
  console.log(outputArray)
  return outputArray
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
