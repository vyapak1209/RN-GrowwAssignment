import { IMAGES_FETCHED, NEXT_URL, QUERY_CHANGED, NOT_FOUND, SPELL_CHECK } from './ActionsTypes'

const CLIENT_ID = "1a2a8-0c74a-137fb-2e141-cdb3e-11751"
const CLIENT_SECRET = "e4f92-f4911-63081-8a01b-2e3a0-208fb"

const USERPWD = 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET)

export const fetchImages = (query, nextUrl, queryChanged) => {

    let urlToAppend;
    let pageCount = 1

    if (nextUrl != null) {
        urlToAppend = `https://api.shutterstock.com/v2/images/search?query=${query}&page=${pageCount}`
    } else {
        pageCount++
        urlToAppend = `https://api.shutterstock.com/v2/images/search?query=${query}&page=${pageCount}`
    }

    return (dispatch) => {

        console.log("LOL")
        console.log(USERPWD)

        // dispatch({
        //     type: IMAGES_FETCHED,
        //     payload: "HAHAHAHA"
        // })

        fetch(urlToAppend, {
            method: 'GET',
            headers: new Headers(
                {
                    'Authorization': USERPWD,
                }
            ),
        }).then((resp) => resp.json())
            .then((response) => {
                console.log("Response ", response)

                if(response.spellcheck_info != null) {
                    dispatch({
                        type: SPELL_CHECK,
                        payload: response.spellcheck_info
                    })
                }

                if (response.total_count === 0) {
                    dispatch({
                        type: NOT_FOUND,
                        payload: "Hey! We didn't get you."
                    })
                } else {
                    if (nextUrl === null) {
                        if (queryChanged === null) {
                            dispatch({
                                type: IMAGES_FETCHED,
                                payload: response.data,
                                text: null
                            })
                        } else {
                            dispatch({
                                type: IMAGES_FETCHED,
                                payload: response.data,
                                text: QUERY_CHANGED
                            })
                        }
                    } else {
                        dispatch({
                            type: IMAGES_FETCHED,
                            payload: response.data,
                            text: null
                        })
                    }
                }



            });

    }

}