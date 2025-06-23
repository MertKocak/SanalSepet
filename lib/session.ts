export const startSession = (user: unknown, jwt: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('jwt', jwt)
}