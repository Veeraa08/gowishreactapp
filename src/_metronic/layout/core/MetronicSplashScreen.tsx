import React, {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState,} from 'react'
import {WithChildren} from '../../helpers'

const MetronicSplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(
  undefined
)

const MetronicSplashScreenProvider: FC<WithChildren> = ({children}) => {
  const [count, setCount] = useState(0)
  let visible = count > 0

  useEffect(() => {
    // Show SplashScreen
    if (visible) {
      console.log('remove loading')
      document.body.classList.remove('page-loading')

      return () => {
        console.log('add loading')
        document.body.classList.add('page-loading')
      }
    }

    // Hide SplashScreen
    let timeout: number
    if (!visible) {
      timeout = window.setTimeout(() => {
        console.log('add loading')
        document.body.classList.add('page-loading')
      }, 3000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [visible])

  return (
    <MetronicSplashScreenContext.Provider value={setCount}>
      {children}
    </MetronicSplashScreenContext.Provider>
  )
}

const LayoutSplashScreen: FC<{visible?: boolean}> = ({visible = true}) => {
  // Everything are ready - remove splashscreen
  const setCount = useContext(MetronicSplashScreenContext)

  useEffect(() => {
    if (!visible) {
      return
    }

    if (setCount) {
      setCount((prev) => {
        return prev + 1
      })
    }

    return () => {
      if (setCount) {
        setCount((prev) => {
          return prev - 1
        })
      }
    }
  }, [setCount, visible])

  return null
}

export {MetronicSplashScreenProvider, LayoutSplashScreen}
