const _ = require("lodash");
const blog = require("../mongo/models/blog");
exports.dummy = (blogs) => {
  if (blogs) return 1;
  return 0;
};

exports.totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.map((blog) => blog.likes).reduce((acc, cur) => acc + cur);
};

exports.favBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  let favBlog = blogs.find((blog) => blog.likes === Math.max(...likes));
  favBlog = {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  };
  return favBlog;
};



exports.mostBlogs = (blogs) => {
  const authors = getAuthorsArray(blogs)
  let maxBlogs = 0
 
  const mostBlogsAuthor = authors.map((author) => {
      const totalBlogs = blogs.filter((blog) => blog.author === author).length;
      if (totalBlogs > maxBlogs) maxBlogs = totalBlogs;
      return {
        author: author,
        blogs: totalBlogs,
      };
    })
    .find((author) => author.blogs === maxBlogs);
  
  return mostBlogsAuthor
};



exports.mostLikes = (blogs) => {
  let authors = getAuthorsArray(blogs);
  let maxLikes = 0

  const mostLikedAuthor = authors.map((author, i) => {
      const totalLikes = blogs
        .filter((blog) => blog.author === author)
        .map((authorBlog) => authorBlog.likes)
        .reduce((acc, cur) => acc + cur);

      if (totalLikes > maxLikes) maxLikes = totalLikes;

      return {
        author: author,
        likes: totalLikes,
      };
    })
    .find((author) => author.likes === maxLikes);

  return mostLikedAuthor;
};


function getAuthorsArray(blogs){
    const authors=[]
    blogs.forEach((blog) => {
        if (!authors.includes(blog.author)) {
            authors.push(blog.author);
          }
      })

    return authors
}