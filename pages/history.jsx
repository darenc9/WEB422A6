import React from 'react'
import { searchHistoryAtom } from '../store'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { Button, Card, ListGroup} from 'react-bootstrap'
import styles from '../styles/History.module.css'
import { removeFromHistory } from '../lib/userData'
export default function History() {
    console.log("**** Inside History() *****")
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    if(!searchHistory) return null;

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);
    }

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }

    console.log("parsedHistory.length: " + parsedHistory.length)

    return (
        <>
        { parsedHistory.length == 0 
            ? (
                <Card>
                    <Card.Body>
                        <Card.Title>Nothing Here</Card.Title>
                        <Card.Text>Try searching for some artwork.</Card.Text>
                    </Card.Body>
                </Card>
            )
            : (
                <ListGroup>
                    {
                        parsedHistory.map((historyItem, index) => (
                            <ListGroup.Item onClick={e => historyClicked(e, index)} className={styles.historyListItem}>
                                {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                                <Button className="float-end" variant="danger" size="sm" 
                                onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            )
        }
        </>
    )
}