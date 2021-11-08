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
    isBookBorrowed===true ? outputA.push(book) : outputB.push(book)
  })
  let outputArray = [outputA, outputB]
  return outputArray
}

function getBorrowersForBook(book, accounts) {
  let outputArray = []
  let bookBorrows = book.borrows
  for (let i = 0; (i < bookBorrows.length) && (i < 10); i++) {
    let borrow = bookBorrows[i];
    let thisId = borrow.id
    isReturned = borrow.returned
    let currentUser = accounts.find(({id}) => (id === thisId))
    let outputObject = {
      ...currentUser,
      returned: isReturned
    }
    outputArray.push(outputObject)
  }
  return outputArray
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
