import React, { useState } from 'react'
import {Container, Nav, Navbar, Form, Button, Row, Col, NavDropdown} from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../../store';
import { addToHistory } from '../../lib/userData';
import { readToken, removeToken } from '../../lib/authenticate';

export default function MainNav() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    let token = readToken();

    const logout = () => {
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    }
    const handleSearch = async (e) => {
      e.preventDefault();
      // Redirect to the /artwork page with the search query
      setIsExpanded(false);
      let searchQuery = `title=true&q=${searchField}`
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
      router.push(`/artwork/?${searchQuery}`);
    };

    return (
        <>
        <Navbar bg="primary" expand="lg" className="fixed-top" data-bs-theme="dark" expanded={isExpanded}>
            <Container fluid>
                <Navbar.Brand>Devon Chan</Navbar.Brand>
                <Navbar.Toggle onClick={e => setIsExpanded(!isExpanded)} />
                <Navbar.Collapse>
                    { token ? (
                        <>
                            <Nav className="me-auto my-2 my-lg-0">
                                <Link href="/" passHref legacyBehavior><Nav.Link onClick={e => setIsExpanded(false)} active={router.pathname==='/'}>Home</Nav.Link></Link>
                                <Link href="/search" passHref legacyBehavior><Nav.Link onClick={e => setIsExpanded(false)} active={router.pathname==='/search'}>Advanced Search</Nav.Link></Link>
                            </Nav>
                            <Form className="d-flex inline" onSubmit={handleSearch}>
                                <Form.Control type="text" placeholder="Search" className="me-2"
                                    onChange={(e) => setSearchField(e.target.value)}/>
                                <Button variant="success">Search</Button>
                            </Form>
                            <Nav className="me-2">
                                <NavDropdown title={`${token.userName}`} drop="start" alignRight={true}>
                                    <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={e => setIsExpanded(false)} active={router.pathname==='/favourites'}>Favourites</NavDropdown.Item></Link>
                                    <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={e => setIsExpanded(false)} active={router.pathname==='/history'}>Search History</NavDropdown.Item></Link>
                                    <NavDropdown.Item onClick={e => {setIsExpanded(false), logout()}}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        
                        </>
                    )
                    : (
                        <>
                        <Nav className="me-auto my-2 my-lg-0">
                            <Link href="/" passHref legacyBehavior><Nav.Link onClick={e => setIsExpanded(false)} active={router.pathname==='/'}>Home</Nav.Link></Link>
                            <Link href="/register" passHref legacyBehavior><Nav.Link onClick={e => setIsExpanded(false)} active={router.pathname==='/register'}>Register</Nav.Link></Link>
                            <Link href="/login" passHref legacyBehavior><Nav.Link onClick={e => setIsExpanded(false)} active={router.pathname==='/login'}>Login</Nav.Link></Link>
                        </Nav>

                        </>
                    )
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br />
        <br />
        </>
    )
}