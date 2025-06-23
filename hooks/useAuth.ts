import { create } from 'zustand'

type AuthStore = {
  jwt: string
  loader: boolean
  setLoader: (loader: boolean) => void
  setJwt: (jwt: string) => void
}

const useAuthStore = create<AuthStore>((set) => ({
  jwt: '',
  loader: false,
  setLoader: (loader: boolean) => set({ loader }),
  setJwt: (jwt: string) => set({ jwt }),
}))

export default useAuthStore