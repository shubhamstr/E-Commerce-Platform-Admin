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
  Button,
  Container
  // NavbarText
} from 'reactstrap';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header(args: any) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args}>
        <Container fluid="sm" className="d-flex justify-content-between align-ietms-center flex-wrap">
          <NavbarBrand href="/" className="text-uppercase">
            Guest Market
          </NavbarBrand>
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
            <Nav className="d-flex gap-2" navbar>
              <NavItem>
                <NavLink href="/cart/">
                  <ShoppingCartIcon /> Cart
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
                <>
                  <NavItem>
                    <Button
                      className="text-white"
                      color="info"
                      outline
                      onClick={() => {
                        router.push('/login');
                      }}
                    >
                      Login
                    </Button>
                  </NavItem>
                  <NavItem>
                    <Button
                      className="text-white"
                      color="info"
                      outline
                      onClick={() => {
                        router.push('/register');
                      }}
                    >
                      Register
                    </Button>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
