import React, {useState} from 'react'
import {useMutation, useQuery } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = () => {

    const authors = useQuery(ALL_AUTHORS)

    const [name, setName] = useState('')
    const [year, setYear] = useState('')

    const [ authorChange ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS}]
    })

    


    const submit = (event) => {
        event.preventDefault()

        authorChange({ variables: { name, setBornTo: Number(year) } })

        setYear('')
        setName('')
    }

    return(
        <div>
            <h2>Set birth year</h2>
            <form onSubmit={submit}>
                <div>
                    name <select value={name}
                        onChange={(event) => {
                            setName(event.target.value)
                        }}
                    >
                        {authors.data.allAuthors.map(a => {
                            return (
                                <option 
                                    key={a.name}
                                    value={a.name}>
                                        {a.name}
                                    </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    Year <input value={year}
                        onChange={(event) => {
                            setYear(Number(event.target.value))
                        }}
                    />
                </div>
                <button type="submit">Update Author</button>
            </form>
        </div>
    )
}

export default EditAuthor