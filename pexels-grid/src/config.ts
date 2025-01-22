// import '../envConfig'

export const config = {
  API_URL:process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/',
  SSR_API_URL:process.env.SSR_API_URL || 'http://localhost:3000/'
}