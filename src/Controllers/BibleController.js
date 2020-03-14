let fs = require('fs')
let Book = require('../Models/BibleBook')
let Verse = require('../Models/Verse')

class BibleController {
  test(req, res) {
    let book = Book.get(40).with('$verses')
    // this will give us models of the verses
    //or
    // let book = Book.get(40)
    // let verses = book._verses
    // this will give us raw verses
    return res.json({ data: book._verses })
  }
  test2(req, res) {
    // let book = Book.get(40).with('$verses')
    //raw
    let result = {
      books: Book._getAll(),
      books2: Book._getAll('id', 2),
      book: Book._getWhere('id', 1),
      book2: Book._get(40),
      // //instances
      booksModel: Book.getAll(),
      booksModel2: Book.getAll('id', 1),
      bookModel: Book.getWhere('id', 1),
      bookModel2: Book.get(40)
    }
    // working with instances
    // create, save, update,
    // bookModel.testament = 'NT'
    // bookModel.save()
    // console.log(bookModel._.table)

    // console.log({book})
    // book.save()
    // let table = book.$_.table
    // let book = Book.$.table
    // console.log({table})

    console.log(result)
    return res.json({
      result
    })
  }

  index(req, res) {
    return res.json(Book.get(47).with('verses'))
  }

  show({ params: { book_id } }, res) {
    return res.json(Book.get(book_id).with('verses'))
  }

  verse({ params: { id } }, res) {
    return res.json(Verse.get(id).with('$book'))
  }

  search({ params: { searchTerm } }, res) {
    // let opts = {meta: true}
    //TODO: escape searchterms
    let verses = Verse.rawAll(
      `SELECT * FROM nrsv WHERE text LIKE $searchTerm`,
      { searchTerm: `%${searchTerm}%` }
    )
    return res.json(verses)
  }
}

module.exports = new BibleController()
