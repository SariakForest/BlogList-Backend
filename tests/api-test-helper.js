const Blog = require("../mongo/models/blog")
const User = require("../mongo/models/user")
const initialBlogs = require("./test-blogs")
const initialUsers = require("./test-users")

const testBlog={
  title:"Test title",
  author:"Edsger W. Dijkstra",
  url:"https//TotallyRealUrl.test",
  likes:5
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}
const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
const resetDB = async (collection) => {
  const Item = require(`../mongo/models/${collection}`)
  let initials
  switch(collection){
    case "blog":
      initials = initialBlogs
      break
    case "user":
      initials = initialUsers
      break
  }
  await Item.deleteMany({});

  const ItemObjects = initials.map((item) => new Item(item));
  const promiseArray = ItemObjects.map((item) => item.save());
  await Promise.all(promiseArray);
};

module.exports = { initialBlogs, initialUsers,testBlog, blogsInDB,usersInDB,resetDB };
