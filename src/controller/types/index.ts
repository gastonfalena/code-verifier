/**
 * Basic JSON response for Controllers
 */

export type BasicResponse = {
  message: string
}

/**
 * Error JSON response for Controllers
 */
export type ErrorResponse = {
  error: string
  message: string
}
export type AuthResponse = {
  message: string
  token: string
}
