import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
class Search extends Component{
  state ={
    query:''
  }
  Search = (query)=>{
    this.setState({query:query.trim()})

  }
  Synchronize = (book)=>{
    let Find
    const shelfs = [].concat(this.props.currentlyReading,this.props.wantToRead,this.props.read)
    Find = shelfs.filter((e)=>e.id == book.id)
    // console.log(Find[0].shelf);
    if(Find[0] !==  undefined){
      return (Find[0].shelf);
    }
    return 'none'
  }
  render(){
    let showingBooks = []
    if(this.props.books !== []){
      showingBooks = this.props.books
    }
    console.log(showingBooks);
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(e)=>{this.props.SearchBook(e.target.value);this.Search(e.target.value)}}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid  ">
            { showingBooks !== [] && showingBooks.map((book)=>(
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}`}}></div>
                      <div className="book-shelf-changer">
                        <select value = {this.Synchronize(book)} onChange = {(e)=>{this.props.removeBook(book);this.props.selectTOmove(e.target.value,book)}}>
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
      </div>)
  }
}
export default Search
