// Authentication helper functions

export interface User {
  id: string
  username: string
  role: 'admin' | 'user'
  createdAt: string
}

// Check if user is authenticated (client-side)
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  const user = sessionStorage.getItem('adminUser')
  return user !== null
}

// Get current user (client-side)
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = sessionStorage.getItem('adminUser')
  if (!userStr) return null
  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}

// Check if user is admin
export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.role === 'admin'
}

// Logout user
export function logout(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('adminUser')
  }
}

// Set user (after login)
export function setUser(user: User): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('adminUser', JSON.stringify(user))
  }
}
