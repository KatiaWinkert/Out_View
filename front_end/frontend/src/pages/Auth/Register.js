import './Auth.css'
//components
import { Link } from 'react-router-dom'
//Hooks
import { useState, useEffect } from 'react'

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <h2>Out View</h2>
      <p className="subtitle">Criar uma conta</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirme a senha" />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem cadastrado? <Link to="/login">Clique aqui!</Link>
      </p>
    </div>
  )
}

export default Register
