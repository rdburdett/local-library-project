function findAccountById(accounts, searchId) {
  return accounts.find(({id}) => id === searchId)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) => (acc1.name.last < acc2.name.last ? -1 : 1))
}

function getTotalNumberOfBorrows(account, books) {
  let thisId = account.id
  let totalBorrows = 0
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    for (let j = 0; j < book.borrows.length; j++) {
      const borrow = book.borrows[j];
      if (borrow.id === thisId) {
        totalBorrows++
      }
    }
  }
  return totalBorrows
}

function getBooksPossessedByAccount(account, books, authors) {
  let thisUserId = account.id
  let booksPossessed = []
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    let thisBookBorrowedArray = book.borrows
    for (let j = 0; j < thisBookBorrowedArray.length; j++) {
      const borrow = thisBookBorrowedArray[j];
      if ((borrow.id === thisUserId) && (borrow.returned === false)) {
        let thisAuthorId = book.authorId
        let thisAuthor = authors.find((authors) => (authors.id === thisAuthorId))
        let returnObject = {
          id: book.id,
          title: book.title,
          genre: book.genre,
          authorId: thisAuthorId,
          author: thisAuthor,
          borrows: book.borrows,
        }
        booksPossessed.push(returnObject)
      }
    }
  }
  return booksPossessed
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
