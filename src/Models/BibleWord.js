const { Model } = require('@frontierjs/backend')

class BibleWord extends Model {
  constructor({
    id = null,
    verse_id = null,
    word = null,
    short_desc = null,
    link = '',
    strongs_tag = ''
  } = {}) {
    super()
    this.id = id
    this.verse_id = verse_id
    this.word = word
    this.short_desc = short_desc
    this.link = link
    this.strongs_tag = strongs_tag
    return this
  }
  static get table() {
    return 'bible_hub'
  }
  static get fields() {
    return [
      { name: 'id', type: 'integer' },
      { name: 'verse_id', type: 'integer' },
      { name: 'word', type: 'string' },
      { name: 'short_desc', type: 'string' },
      { name: 'link', type: 'string' },
      { name: 'strongs_tag', type: 'string' }
    ]
  }
  get _lemma() {
    return Model.raw(
      'SELECT id, word, description, count FROM strongs WHERE tag = $tag',
      {
        tag: this.strongs_tag
      }
    )
  }
}

module.exports = BibleWord

const Verse = require('./Verse')
