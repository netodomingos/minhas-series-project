import React, { useState } from 'react'

import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler

} from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }
    return (
        <div className='App container' >
            <Navbar color='white' light expand='md' >
                <NavbarBrand tag={Link} to='/' > Minhas Séries </NavbarBrand> <NavbarToggler onClick={toggle} />

                <Collapse isOpen={open} navbar >
                    <Nav className='ml-auto' navbar >
                        <NavItem >
                            <NavLink className='active' tag={Link} to='/generos' > Genêros </NavLink>
                        </NavItem >
                        <NavItem >
                            <NavLink className='active' tag={Link} to='/series' > Séries </NavLink>
                        </NavItem >

                    </Nav>
                </Collapse>
            </Navbar>
        </div>

    );
}

export default Header;