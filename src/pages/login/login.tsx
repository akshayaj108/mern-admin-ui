
const LoginPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <label>
        <input type="checkbox" /> Remember me
      </label>
      <a href="#">Forgot password?</a>
    </div>
  )
}

export default LoginPage;