let fs = require('fs')
let Book = require('../Models/BibleBook')
let Verse = require('../Models/Verse')

class BibleController {
  test(req, res) {
    // this will give us models of the verses
    let book = Book.get(40).with('$verses')
    //or
    // this will give us raw verses
    // let book = Book.get(40)
    // let verses = book._verses
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
  indices({ params: { book_id } }, res) {
    return res.json(Book._getAll())
  }

  verse({ params: { id } }, res) {
    // Verse Model that contains BibleWord models
    let verse = Verse.get(id).with([
      'book',
      'translation',
      'references',
      '$words'
    ])
    verse.words = verse.words.map(word => word.with('lemma'))
    verse.references = verse.references.map(ref =>
      Verse._getWhere('verse_id', ref.start_verse)
    )
    return res.json(verse)
  }

  search({ params: { searchTerm } }, res) {
    // let opts = {meta: true}
    //TODO: escape searchterms
    // let verses = Verse.rawAll(
    //   `SELECT * FROM nrsv WHERE text LIKE $searchTerm`,
    //   { searchTerm: `%${searchTerm}%` }
    // )
    let verses = Verse.search(searchTerm)
    return res.json(verses)
  }
}

module.exports = new BibleController()
