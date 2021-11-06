// const books = require('../data/books.js')


function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let total = 0
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    let filtered = book.borrows.filter((borrow) => borrow.returned===false)
    let borrows = filtered.length
    total += borrows
    }
  return total
}

function mapGenresToArrays (books) {
  let returnArray = []
  let outputArray = []
  let mappedBooksArray = books.map((books) => books.genre)
  mappedBooksArray.sort()
  for (let i = 0; i < mappedBooksArray.length; i++) {
    const itemCurrent = mappedBooksArray[i];
    const itemNext = mappedBooksArray[i+1]
    if (itemCurrent===itemNext) {
      returnArray.push(itemCurrent)
    } else {
      returnArray.push(itemCurrent)
      outputArray.push(returnArray)
      returnArray = []
    }
  }
  return outputArray
}
function populateArrayFromObject (object) {
  let outputArray = []
  let namesArray = Object.keys(object)
  // console.log(namesArray)
  let countArray = Object.values(object)
  // console.log(countArray)
  //////
  for (let i = 0; i < namesArray.length; i++) {
    outputArray.push({
      name: namesArray[i],
      count: countArray[i]
    })
  }
  //////
  outputArray.sort((itemA, itemB) => itemA.count > itemB.count ? -1 : 1)
  // console.log(outputArray.slice(0,5))
  return outputArray.slice(0,5)
}

function getMostCommonGenres(books) {
  const countObject = books.reduce((acc, { genre }) => { 
    if (acc[genre]) { 
      acc[genre] += 1; 
    } else {
      acc[genre] = 1; 
    }
  return acc;
  }, {})
  // console.log(countObject)
  return populateArrayFromObject(countObject)

}

function getMostPopularBooks(books) {
  let sortedBooks = []
  //////
  sortedBooks = books.sort((bookA, bookB) => bookA.borrows.length > bookB.borrows.length? -1 : 1)
  let mappedBooksArray = sortedBooks.map((inBook) => {
    let outBook = {}
    outBook = {
      name: inBook.title,
      count: inBook.borrows.length,
    }
    return outBook
  })
  return mappedBooksArray.slice(0,5)
}

function getMostPopularAuthors(books, authors) {
  let outputArray = []
  let outputObject = {}
  let collectorArray = []
  let collectTotal = 0
  let finalArray = []
  let sortedBooks =  books.sort((bookA, bookB) => bookA.authorId > bookB.authorId ? -1 : 1)
  // console.log(sortedBooks)
  sortedBooks.forEach((book) => {
    let thisAuthorId = book.authorId
    let currentAuthor = authors.find((author) => author.id === thisAuthorId)
    let authorName = `${currentAuthor.name.first} ${currentAuthor.name.last}`
    outputObject = {
      name: authorName,
      total: book.borrows.length
    }
    outputArray.push(outputObject)
  });
  // console.log(outputArray)
  for (let i = 0; i < outputArray.length; i++) {
    const thisElement = outputArray[i]
    if ((i === outputArray.length-1) && (outputArray[i].name !== outputArray[i-1].name)) {
      finalArray.push({
        name:thisElement.name, 
        count: thisElement.total
      })
      // console.log(finalArray)
    } else if ((i === outputArray.length-1) && (outputArray[i].name === outputArray[i-1].name)) {
      // push to collector
      collectorArray.push(thisElement)
      collectTotal += thisElement.total
      // push to final
      finalArray.push({
        name:collectorArray[0].name, 
        count: collectTotal,
      })
      // clear collectors
      collectTotal = 0
      collectorArray = []
    } else if ((outputArray[i].name) === (outputArray[i+1].name)) {
      // push to collector array
      collectorArray.push(thisElement)
      collectTotal += thisElement.total
      // console.log(collectorArray)
    } else {
      // push to collector
      collectorArray.push(thisElement)
      collectTotal += thisElement.total
      // push to final
      finalArray.push({
        name:collectorArray[0].name, 
        count: collectTotal,
      })
      // clear collectors
      collectTotal = 0
      collectorArray = []
    }
    // sort array by total
    finalArray.sort((itemA, itemB) => itemA.count > itemB.count ? -1 : 1)
  }
  console.log(finalArray.slice(0,5))
  return finalArray.slice(0,5)
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

