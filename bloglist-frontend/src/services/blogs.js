import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async() => {
  const res = await axios.get(baseUrl)
  return res.data
}

const addBlog = async(newBlog)=>{
  
  const config = {
    headers: {Authorization: token},
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const updateBlog = async(blog)=>{
   const res = await axios.put(`${baseUrl}/${blog.id}`, blog)
   return res.data
}

const deleteBlog = async(id)=>{
  const config = {
    headers: {Authorization: token},
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, addBlog, setToken, updateBlog, deleteBlog }