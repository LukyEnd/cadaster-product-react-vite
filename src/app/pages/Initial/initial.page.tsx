import React from 'react'
import { useNavigate } from 'react-router-dom'
import './initial.page.css'
import SidebarComponent from '../../components/side-bar/side-bar.component.tsx'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const handleNavigateToProductForm = (): void => {
    navigate('/product-list')
  }

  return (
    <div>
      <SidebarComponent />
      <div className="home-page">
        <div className="hero-section">
          <h1>Seja Bem-vindo ao Meu Projeto</h1>
          <p>Descubra as funcionalidades incríveis que temos a oferecer.</p>
          <button className="cta-button" onClick={handleNavigateToProductForm}>
            Listar Produtos
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
