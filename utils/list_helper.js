
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

