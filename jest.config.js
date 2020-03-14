// $c = /src/Controllers
// $m = /src/Models
// $frontier = /node_modules/@frontierjs/backend
module.exports = {
  moduleNameMapper: {
    '^\\$c\/(.*)': `<rootDir>/src/Controllers/$1`,
    '^\\$m\/(.*)': `<rootDir>/src/Models/$1`,
    '^\\$frontier\/(.*)': `<rootDir>/node_modules/@frontierjs/backend/$1`,
  },
}

