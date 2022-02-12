
exports.dummy = blogs=>{
    if(blogs) return 1
    return 0
}

exports.totalLikes = blogs=>{
    if(blogs.length === 0) return 0
    return blogs.map(blog => blog.likes).reduce((acc,cur)=>acc+cur)
}