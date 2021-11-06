function findAccountById(accounts, searchId) {
  return accounts.find(({id}) => id === searchId)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) => (acc1.name.last < acc2.name.last ? -1 : 1))
}

function getTotalNumberOfBorrows(account, books) {
  let thisId = account.id
  console.log("User ID: ", thisId)
  let totalBorrows = 0
  console.log("Total number of books: ", books.length)
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    console.log(book)
    for (let j = 0; j < book.borrows.length; j++) {
      const borrow = book.borrows[j];
      console.log("This borrow: ", borrow)
      if (borrow.id === thisId) {
        console.log("Plus one!")
        totalBorrows++
      }
    }
  }
  return totalBorrows
}

function getBooksPossessedByAccount(account, books, authors) {
  let thisUserId = account.id
  console.log("User ID: ", thisUserId, "\n")
  let booksPossessed = []
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    let thisBookBorrowedArray = book.borrows
    // console.log(title, thisBookBorrowedArray)
    for (let j = 0; j < thisBookBorrowedArray.length; j++) {
      const borrow = thisBookBorrowedArray[j];
      if ((borrow.id === thisUserId) && (borrow.returned === false)) {
        console.log("Title: ", book.title, " posessed ")
        let thisAuthorId = book.authorId
        let thisAuthor = authors.find((authors) => (authors.id === thisAuthorId))
        console.log("author ID: ", thisAuthorId, "\n")
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
  console.log("Books possessed: ", booksPossessed)
  return booksPossessed
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
