import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'

import { GET_ME } from '../queries'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
    const user = useQuery(GET_ME)
    const books = useQuery(ALL_BOOKS)
    const [ recList, setRecList ] = useState([])


   
   useEffect(() => {
       // wait for data
       // sets recList by filtering user favorite genre
       
       if (user.data && books.data) {
           const fav = user.data.me.favoriteGenre
           const recArray = []

           books.data.allBooks.map(b => {

               b.genres.map(g => {
                   if (g === fav) {
                    
                        recArray.push(b)
                   }
                   
                   return null
               })
               
               return null
           })

           setRecList(recArray)
       }
   }, [user.data, books.data]) //eslint-disable-line


    // show set in APP
   if (!show) {
       return null 
   }

   console.log(recList)
    return (
        <div>
            <h2>Recommendations</h2>
            <div>
                <p>*based in your favorite genre</p>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                        <th>Genres</th>
                    </tr>
                    {recList.map(r => {
                        return (
                            <tr key={r.title}>
                                <td>{r.title}</td>
                                <td>{r.author.name}</td>
                                <td>{r.published}</td>
                                <td>{r.genres.join(', ')}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}

export default Recommend