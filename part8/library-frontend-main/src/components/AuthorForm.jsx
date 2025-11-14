import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ( {authors, setError} ) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR)

  useEffect( () => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="">Select author...</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm