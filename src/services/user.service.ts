interface FakeUser {
  id: number
  email: string
  password: string
  role: string
}

class UserService {
  users: FakeUser[]

  constructor() {
    this.users = [
      { id: 1, email: 'test@example.com', password: '123', role: 'user' },
      { id: 2, email: 'admin@example.com', password: '123', role: 'admin' },
    ]
  }

  login(emailField: string, password: string) {
    const user = this.users.find(u => u.email === emailField && u.password === password)

    if (!user) {
      throw new Error('Invalid credentials')
    }
    const { email, role, id } = user
    return { email, role, id }
  }

  logout() {
    return true
  }
}

export const userService = new UserService()
