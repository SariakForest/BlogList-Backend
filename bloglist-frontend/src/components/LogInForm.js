import React from "react"
const LogInForm = ({username,password,onSubmit,onChange})=>(
    <form onSubmit={onSubmit}>
    <div>
      username: 
        <input
        type="text"
        value={username}
        name="username"
        onChange={onChange}
      />
    </div>
    <div>
      password: 
        <input
        type="password"
        value={password}
        name="password"
        onChange={onChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LogInForm

