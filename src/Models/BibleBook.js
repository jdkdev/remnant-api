const { Model } = require('@frontierjs/backend')

class BibleBook extends Model {
    constructor({
        id = null,
        book_id = null,
        book = null,
        book_name = null,
        short_name = null,
        testament_sort = null,
        testament = null,
        chapter_count = null,
        verse_count = null,
        category = '',
        opts = {meta: false},
    } = {}) {
        super(opts)
            this.id = id
            this.book_id = book_id
            this.book = book
            this.book_name = book_name
            this.short_name = short_name
            this.testament_sort = testament_sort
            this.testament = testament
            this.chapter_count = chapter_count
            this.verse_count = verse_count
            this.category = category
            // this.verses
            return this
    }
    static get table() {
        return 'bible_index'
    }
    static get fields() {
        return [
            { name: 'id', type: 'integer', },
            { name: 'book_id', type: 'integer', },
            { name: 'book', type: 'string', },
            { name: 'book_name', type: 'string' },
            { name: 'short_name', type: 'string' },
            { name: 'testament_sort', type: 'string' },
            { name: 'testament', type: 'string' },
            { name: 'chapter_count', type: 'string' },
            { name: 'verse_count', type: 'string' },
            { name: 'category', type: 'string' },
        ]
    }
    get $verses() {
        return Verse.getAll('book_id', this.id)
    }
    get _verses() {
        return Verse._getAll('book_id', this.id)
    }
}

module.exports = BibleBook

const Verse = require('./Verse')
