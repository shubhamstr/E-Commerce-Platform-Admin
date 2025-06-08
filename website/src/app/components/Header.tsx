/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
  // NavbarText
} from 'reactstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header(args: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/shop/">Shop</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/wishlist/">Wishlist</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact/">Contact</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/cart/">
                <ShoppingCartIcon />
              </NavLink>
            </NavItem>
            {isAuthenticated ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <AccountCircleIcon />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      setIsAuthenticated(false);
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem>
                <Button
                  color="info"
                  outline
                  onClick={() => {
                    setIsAuthenticated(true);
                  }}
                >
                  Login
                </Button>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
