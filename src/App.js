import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const tokenHandler = (token) => {
    setToken(token)
    setPage('authors')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Notification errorMessage={errorMessage} />
        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
        />
        <LoginForm
          setError={notify}
          setToken={tokenHandler}
          show={page === 'login'}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>
      <Notification errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        token={token}
        show={page === 'add'}
        setError={notify}
      />

      <Recommend 
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App