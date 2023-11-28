import React from 'react'
import { Card, Form, Alert, Button } from 'react-bootstrap'
import { useState } from 'react'
import { authenticateUser } from '../lib/authenticate';
import { useRouter } from 'next/router'
import { getFavourites, getHistory } from '../lib/userData'
import { useAtom } from 'jotai'
import { searchHistoryAtom, favouritesAtom } from '../store'

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit(e) running');
        try {
            console.log('calling authenticateUser...');
            await authenticateUser(user, password);
            console.log('authenticateUser completed, calling updateAtoms...');
            await updateAtoms();
            console.log("finished updateAtoms(), running router.push('/favourites')");
            router.push('/favourites');
            console.log('router has been pushed...');
        } catch (err) {
            setWarning(err.message);
        }
    }
    
    async function updateAtoms(){
        console.log('running updateAtoms()');
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
        console.log('updateAtoms completed');
    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <h2>Login</h2>Enter your login information below:
                </Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Label>User:</Form.Label>
                <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <br />
                <Button variant="primary" className="pull-right" type="submit">Login</Button>
            </Form>
            { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
        </>
    )
}