const _ = require("lodash")
exports.dummy = blogs=>{
    if(blogs) return 1
    return 0
}

exports.totalLikes = blogs=>{
    if(blogs.length === 0) return 0
    return blogs.map(blog => blog.likes).reduce((acc,cur)=>acc+cur)
}

exports.favBlog = blogs=>{
    const likes = blogs.map(blog => blog.likes)
    let favBlog = blogs.find(blog=>blog.likes===Math.max(...likes))
    favBlog = {
        title:favBlog.title,
        author:favBlog.author,
        likes:favBlog.likes
    }
    return favBlog
}

exports.mostBlogs =blogs=>{
const authors = [
    {
      author: "Michael Chan",
      blogs: 0,
    },
    {
      author: "Edsger W. Dijkstra",
      blogs: 0,
    },
    {
      author: "Robert C. Martin",
      blogs: 0,
    },
  ]
const [michael, edsger, robert] = authors
blogs.forEach(blog=>{
    switch(blog.author){
        case "Michael Chan":
            michael.blogs++
            break
        case "Edsger W. Dijkstra":
            edsger.blogs++
            break
        case "Robert C. Martin":
            robert.blogs++
            break
    }
})
let maxBlogs = 0
authors.forEach((el)=>{
    if(el.blogs > maxBlogs) maxBlogs = el.blogs
})
return authors.find(el=>el.blogs===maxBlogs)
}

