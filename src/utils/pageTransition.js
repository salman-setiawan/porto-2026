import { createContext, useContext } from 'react'

export const PageTransitionContext = createContext({
  navigateWithTransition: () => {},
  isTransitioning: false,
})

export const usePageTransition = () => useContext(PageTransitionContext)

