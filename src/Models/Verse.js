const { Model } = require('@frontierjs/backend')

class Verse extends Model {
  constructor({
    id = null,
    verse_id = null,
    book_id = null,
    book_name = null,
    chapter = null,
    verse = '',
    reference = '',
    text = ''
  } = {}) {
    super()
    this.id = id
    this.verse_id = verse_id
    this.book_id = book_id
    this.book_name = book_name
    this.chapter = chapter
    this.verse = verse
    this.reference = reference
    this.text = text
    return this
  }
  static get table() {
    return 'nrsv'
  }
  static get fields() {
    return [
      {
        name: 'id',
        type: 'integer',
        opts: 'NOT NULL PRIMARY KEY AUTOINCREMENT'
      },
      { name: 'verse_id', type: 'integer' },
      { name: 'book_id', type: 'integer' },
      { name: 'chapter', type: 'integer' },
      { name: 'verse', type: 'integer' },
      { name: 'book_name', type: 'text' },
      { name: 'reference', type: 'text' },
      { name: 'text', type: 'text' }
    ]
  }
  static get indexes() {
    return ['verse_id', 'book_id', 'chapter', 'verse']
  }
  get $book() {
    return Book.get(this.book_id)
  }
}

module.exports = Verse
let Book = require('./BibleBook')
