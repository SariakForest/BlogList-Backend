const {totalLikes} = require("../utils/list_helper")
const blogs = require("./test-blogs")
describe("Total likes",()=>{
    test("of empty list is zero",()=>{
        const result = totalLikes([])
        expect(result).toBe(0)
    })
    test("when list has only one blog, equals the likes of that",()=>{
        const oneItemArray = [blogs[0]]
        const result = totalLikes(oneItemArray)
        expect(result).toBe(7)
    })
    test("works with bigger lists",()=>{
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })
    
})