import React, { useContext, useState } from 'react'

const LoadingContext = React.createContext()

function LoadingProvider(props) {
  const [isLoading, setIsLoading] = useState(false)

  const providerValues = {
    isLoading,
    setLoading: () => setIsLoading(true),
    unSetLoading: () => setIsLoading(false),
  }

  return (
    <LoadingContext.Provider value={providerValues}>
      {props.children}
    </LoadingContext.Provider>
  )
}

function useLoading() {
  return useContext(LoadingContext)
}

export default LoadingContext
export { LoadingProvider, useLoading }
