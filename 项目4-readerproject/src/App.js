import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelves from './BookShelves'
import Search from './SearchPage'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     currentlyReading:[],
     wantToRead:[],
     read:[],
     books:[]
  }
  // componentDidMount(){
  //   BooksAPI.getAll().then((books)=>{
  //     this.setState({currentlyReading:books.filter((e)=> e.shelf === 'currentlyReading'),
  //                   wantToRead:books.filter((e)=> e.shelf === 'wantToRead'),
  //                   read:books.filter((e)=> e.shelf === 'read')})
  //   })
  // }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({currentlyReading:books.filter((e)=> e.shelf === 'currentlyReading'),
                    wantToRead:books.filter((e)=> e.shelf === 'wantToRead'),
                    read:books.filter((e)=> e.shelf === 'read')})
    })
  }
  moveTOcurrentlyReading = (book)=>{
    book.shelf = 'currentlyReading'
    console.log(book.shelf);
    BooksAPI.update(book,'currentlyReading')
    this.setState((state)=>({
      currentlyReading:state.currentlyReading.concat([book])
    }))
  }
  moveTOwantToRead = (book)=>{
    book.shelf = 'wantToRead'
    console.log(book.shelf);
    BooksAPI.update(book,'wantToRead')
    this.setState((state)=>({
      wantToRead:state.wantToRead.concat([book])
    }))
  }
  moveTOread = (book)=>{
    book.shelf = 'read'
    console.log(book.shelf);
    BooksAPI.update(book,'read')
    this.setState((state)=>({
      read:state.read.concat([book])
    }))
  }
  removeBook = (book)=>{
    const shelf = book.shelf
    if(shelf !== undefined && 'none'){
      console.log(shelf);
      const newShelf = this.state[shelf].filter((e)=>e.id !== book.id)
      switch(shelf){
        case 'currentlyReading':this.setState({currentlyReading:newShelf});break;
        case 'wantToRead':this.setState({wantToRead:newShelf});break;
        case 'read':this.setState({read:newShelf});break;
        case 'none':console.log('none');break;
        default:break;
      }
    }else{console.log('none');}
  }
  selectTOmove = (shelf,book)=>{
    switch(shelf) {
      case 'currentlyReading':this.moveTOcurrentlyReading(book);break;
      case 'wantToRead':this.moveTOwantToRead(book);break;
      case 'read':this.moveTOread(book);break;
      case 'none':console.log('none');break;
      default:break;
    }
  }
  SearchBook = (query) =>{
    if(query !==''){
      BooksAPI.search(query).then((books)=>{
        if(Array.isArray(books)){
          this.setState({books:books})
        }
      })
    }else{
      this.setState({books:[]})
    }

    console.log(this.state.books);
  }
  render() {
    console.log(this.state);
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelves currentlyReading={this.state.currentlyReading}
                              wantToRead={this.state.wantToRead}
                              read = {this.state.read}
                              selectTOmove = {this.selectTOmove}
                              removeBook = {this.removeBook}
                              />
              </div>
              <Link to='/search'>
                <div className="open-search">
                  <button>Add a book</button>
                </div>
              </Link>
            </div>
          )}/>
        <Route path='/search' render={()=>(<Search
            books={this.state.books}
            SearchBook = {this.SearchBook}
            selectTOmove = {this.selectTOmove}
            removeBook = {this.removeBook}
             />)}/>
    </div>
    )
  }
}

export default BooksApp
