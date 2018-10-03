import { IMAGES_FETCHED, NEXT_URL, QUERY_CHANGED, NOT_FOUND, SPELL_CHECK } from './ActionsTypes'

const USERPWD = "Basic MWEyYTgtMGM3NGEtMTM3ZmItMmUxNDEtY2RiM2UtMTE3NTE6ZTRmOTItZjQ5MTEtNjMwODEtOGEwMWItMmUzYTAtMjA4ZmI="    // Base64 encoded access_token

export const fetchImages = (query, nextUrl, queryChanged) => {

    console.log("alpha query ", query)
    console.log("alpha nextUrl ", nextUrl)
    console.log("alpha queryChanged ", queryChanged)
    

    let urlToAppend;
    let pageCount = 1

    if (nextUrl === null) {
        urlToAppend = `https://api.shutterstock.com/v2/images/search?query=${query}&page=1`  // load first page if nextUrl is null
    } else {
        pageCount = pageCount + 1  // incremnet page number if nextUrl is not null
        urlToAppend = `https://api.shutterstock.com/v2/images/search?query=${query}&page=${pageCount}`  // update url to be appended with new page count
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

                if(response.spellcheck_info != null) {     // Spellcheck action if spellcheck_info is not null
                    dispatch({
                        type: SPELL_CHECK,
                        payload: response.spellcheck_info
                    })
                }

                if (response.total_count === 0) {   // if total_count = 0 ==> query is not understood
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
