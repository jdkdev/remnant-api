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
  static search(term) {
    let searchField = 'asv'
    if (parseInt(term[0])) {
      searchField = 'nrsv.verse_id'
    } else if (['G', 'H'].includes(term[0])) {
      searchField = 'strongs'
    }

    let results = Model.rawAll(
      'SELECT nrsv.id, nrsv.verse_id, book_id, chapter, verse, book_name, reference, text  FROM interlinear_new, nrsv' +
        ' WHERE interlinear_new.verse_id = nrsv.verse_id AND ' +
        searchField +
        ' LIKE $term',
      {
        term: `%${term}%`
      }
    )
    // results = results.map(res => this._getWhere('verse_id', res.verse_id))
    return results
  }
  // With relations
  get $book() {
    return Book.get(this.book_id)
  }
  get _book() {
    return Book._get(this.book_id)
  }
  get $words() {
    return BibleWord.getAll('verse_id', this.verse_id)
  }
  get _words() {
    return BibleWord._getAll('verse_id', this.verse_id)
  }
  get _translation() {
    return Model.raw(
      'SELECT * from interlinear_new where verse_id = $verse_id',
      { verse_id: this.verse_id }
    )
  }
  //TODO: add references to verses
  get _references() {
    return Model.rawAll(
      'SELECT start_verse from cross_references where verse_id = $verse_id',
      { verse_id: this.verse_id }
    )
  }
}

module.exports = Verse
let Book = require('./BibleBook')
let BibleWord = require('./BibleWord')
