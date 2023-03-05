import { api, requestConfig } from '../utils/config'

//Register an user - Registrar usuario no sistema:

const register = async (data) => {
  const config = requestConfig('POST', data)

  try {
    const res = await fetch(api + '/users/register', config)
      .then((res) => res.json())
      .catch((err) => err)

    if (res) {
      localStorage.setItem('user', JSON.stringify(res))
    }
    return res
  } catch (error) {
    console.log(error)
  }
}

// Sign in an user - Entrar um usuario
const logout = () => {
  localStorage.removeItem('user')
}

// Sign in a user
const login = async (data) => {
  const config = requestConfig('POST', data)

  try {
    const res = await fetch(api + '/users/register', config)
    .then((res) =>
      res.json()
      .catch((err) => err)
    )

    if (res._id) {
      localStorage.setItem('user', JSON.stringify(res))
    }

    return res
  } catch (error) {
    console.log(error)
  }
}

const authService = {
  register,
  logout,
  login,
}

export default authService

//.then((res) => res.json()).catch((err) => err)
