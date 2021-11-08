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

// Helper function for getMostCommonGenres
function populateArrayFromObject (object) {
  let outputArray = []
  let namesArray = Object.keys(object)
  let countArray = Object.values(object)
  for (let i = 0; i < namesArray.length; i++) {
    outputArray.push({
      name: namesArray[i],
      count: countArray[i]
    })
  }
  outputArray.sort((itemA, itemB) => itemA.count > itemB.count ? -1 : 1)
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
  return populateArrayFromObject(countObject)
}

function getMostPopularBooks(books) {
  let sortedBooks = []
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

// Helper function for getMostPopularAuthors function
function sortBooksHelper(books, authors) {
  let outputArray = []
  let outputObject = {}
  let sortedBooks = books.sort((bookA, bookB) => bookA.authorId > bookB.authorId ? -1 : 1);
  sortedBooks.forEach((book) => {
    let thisAuthorId = book.authorId
    let currentAuthor = authors.find((author) => author.id === thisAuthorId)
    let authorName = `${currentAuthor.name.first} ${currentAuthor.name.last}`
    outputObject = {
      name: authorName,
      total: book.borrows.length
    };
    outputArray.push(outputObject)
  })
  return outputArray
}

function getMostPopularAuthors(books, authors) {
  let collectorArray = []
  let collectTotal = 0
  let finalArray = []
  let sortedBooksArray = sortBooksHelper(books, authors)
  for (let i = 0; i < sortedBooksArray.length; i++) {
    const thisElement = sortedBooksArray[i]
    if ((i === sortedBooksArray.length-1) && (sortedBooksArray[i].name !== sortedBooksArray[i-1].name)) {
      finalArray.push({
        name:thisElement.name, 
        count: thisElement.total
      })
    } else if ((i === sortedBooksArray.length-1) && (sortedBooksArray[i].name === sortedBooksArray[i-1].name)) {
      collectorArray.push(thisElement)
      collectTotal += thisElement.total
      finalArray.push({
        name:collectorArray[0].name, 
        count: collectTotal,
      })
      collectTotal = 0
      collectorArray = []
    } else if ((sortedBooksArray[i].name) === (sortedBooksArray[i+1].name)) {
      collectorArray.push(thisElement)
      collectTotal += thisElement.total
    } else {
      collectorArray.push(thisElement)
      collectTotal += thisElement.total
      finalArray.push({
        name:collectorArray[0].name, 
        count: collectTotal,
      })
      collectTotal = 0
      collectorArray = []
    }
    finalArray.sort((itemA, itemB) => itemA.count > itemB.count ? -1 : 1)
  }
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

