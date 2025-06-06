import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons' // now we are using the backend

// return all persons
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// create new person
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

// read one person
const getPerson = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// update one person
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// delete one person
const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


export default { getAll, create, getPerson, update, deletePerson }