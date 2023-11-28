import React, { useEffect, useState } from 'react'
import { favouritesAtom, searchHistoryAtom } from "../../store";
import { getFavourites, getHistory } from "../../lib/userData";
import { useAtom } from 'jotai';
import { useRouter } from 'next/router'
import { isAuthenticated } from '../../lib/authenticate';

const PUBLIC_PATHS = ['/register', '/', '/login', '/_error'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function updateAtoms(){
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    function authCheck(url) {
        console.log("RouteGuard.js: authChecking: authCheck(" + url +")")
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
        } else {
          setAuthorized(true);
        }
      }

      useEffect(() => {
        updateAtoms();
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);
        
        return () => {
          router.events.off('routeChangeComplete', authCheck);
        };
      }, []);

    return <>{authorized && props.children}</>
  }