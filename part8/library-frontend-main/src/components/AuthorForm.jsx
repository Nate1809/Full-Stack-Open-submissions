import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ( {setError} ) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR)

  useEffect( () => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    await editAuthor({ variables: { name, setBornTo: born } })

    setName('')
    setBorn(0)
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name <input
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        </div>
        <div>
          born <input
          value={born}
          onChange={({ target }) => setBorn(Number(target.value))}
        />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm