import { NavLink } from "react-router-dom"
import { HeaderContainer } from "./styles"
import { Timer, Scroll } from 'phosphor-react'
import logo from '../../assets/logo-ignite.svg'

export const Header = () => {
    return (
        <HeaderContainer>
            <span>
                <img src={logo} alt="" />
            </span>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24} />
                </NavLink>

                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>

        </HeaderContainer>
    )
}