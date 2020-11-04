import React, {useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken, show }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })
    
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user', token)

            
        }
    }, [result.data]) // eslint-disable-line

    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }

    //show is set as state on APP
    if(!show) {
        return null
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    username <input 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    password <input 
                        value={password}
                        type='password'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm