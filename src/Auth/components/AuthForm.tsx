import { useState } from "react"
import { UserRequest } from "../types"
import { useAppSelector } from "../../store"

type AuthFormProps = {
  onSubmit: (args: UserRequest) => void
}

export const AuthForm = (props: AuthFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const userState = useAppSelector((state) => state.user)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors: { email?: string; password?: string } = {}

    // Validate password
    if (password.length < 8 || password.length > 32) {
      validationErrors.password = "Password must be between 8 and 32 characters"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      props.onSubmit({ email, password })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {userState.error && <p>{userState.error}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
