const Blog = require("../mongo/models/blog");
const initialBlogs = require("./test-blogs");

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJson());
};
const resetDB = async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
};

module.exports = { initialBlogs, blogsInDB,resetDB };
