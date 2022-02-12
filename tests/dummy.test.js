const {dummy,totalLikes} = require("../utils/list_helper")

test("Dummy returns one",()=>{
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
})

