import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth)

  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setAuth(true)
    } else {
      setAuth(false)
    }

    setLoading(false)
  }, [user])

  return { auth, loading }
}

//com essa implentação se consegue ver se o usuario esta logado em diversas paginas da minha aplicação 
//componentes, hook de verificação de autenticação 