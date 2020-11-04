import React from 'react'
import {useQuery, useLazyQuery} from '@apollo/client'

import { ALL_BOOKS } from '../queries'
import { GEN_BOOKS } from '../queries'

const BookTable = ( props ) => {

  
  return (
    <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
          {props.booksToDisplay.allBooks.map( b => {
              return (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                  <td>{b.genres.join(', ')}</td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
  )
}

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [ getFilteredBooks, {data, loading} ] = useLazyQuery(GEN_BOOKS)

  const genreButtons = (bookList) => {

    const genres = ['All Genres']

    bookList.data.allBooks.map(b => {
      b.genres.map(genre => {
        if (genres.includes(genre)) return null

        genres.push(genre)
        return null
      })
      return null
    })

    return genres
  }


  if (!props.show) {
    return null
  }

  if (loading) return <p>Loading...</p>

  if (!data) {
    return (
      <div>
        <h2>books</h2>

        <BookTable 
          booksToDisplay={books.data} 
        />


      {genreButtons(books).map(genre => {
        return (
          <button key={genre} onClick={  () => getFilteredBooks({  variables : { genre: genre } })}>{genre}</button>
        )
      })}
      </div>
      
    )
  }
    return (
      <div>
        <h2>books</h2>

        <BookTable 
          booksToDisplay={data} 
        />


      {genreButtons(books).map(genre => {
        return (
          <button key={genre} onClick={  () => getFilteredBooks({  variables : { genre: genre } })}>{genre}</button>
        )
      })}
      </div>
    )
  
 

}

export default Books