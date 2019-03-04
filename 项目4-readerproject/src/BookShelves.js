import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import {Link} from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'

// import * as BooksAPI from './BooksAPI'
class BookShelves extends Component{

  render(){
    const ShelvesTitle = ['Currently Reading','Want to Read','Read']
    const BooksOnshelf = [this.props.currentlyReading,this.props.wantToRead,this.props.read]
    console.log(this.props.currentlyReading);
    console.log(this.props.wantToRead);
    console.log(this.props.read);
    return(
      <div>
        {BooksOnshelf.map((shelf,index)=>(
          <div key={index}className="bookshelf">
            <h2 className="bookshelf-title">{ShelvesTitle[`${index}`]}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {shelf.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}`}}></div>
                        <div className="book-shelf-changer">
                          <select value = {book.shelf} onChange={(e)=>{this.props.removeBook(book);this.props.selectTOmove(e.target.value,book)}}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          ))}
      </div>
    )
  }
}
export default BookShelves
