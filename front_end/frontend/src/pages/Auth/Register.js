import './Auth.css'
//components
import { Link } from 'react-router-dom'
//Hooks
import { useState, useEffect } from 'react'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmePassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword,
    }
    console.log(user)
  }

  return (
    <div id="register">
      <h2>Out View</h2>
      <p className="subtitle">Criar uma conta</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ''}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ''}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ''}
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmePassword(e.target.value)}
          value={confirmPassword || ''}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem cadastro? <Link to="/login">Clique aqui!</Link>
      </p>
    </div>
  )
}

export default Register
