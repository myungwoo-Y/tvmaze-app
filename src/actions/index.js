import videos from'../apis/videos'
import history from '../history';
import firbase from '../firebase';
import { 
    FETCH_POPULAR,
    FETCH_SEARCH,
    SIGN_IN,
    SIGN_OUT,
    DELETE_ALL_MY_SERIES,
    FETCH_MY_SERIES,
    DELETE_SERIES,
    ADD_SERIES
} from './types';

export const fetchPopular = () => async (dispatch) => {
    dispatch({type: FETCH_POPULAR, payload: {popular : 1}});
};

export const fetchSearch = (keyword) => async (dispatch) => {
    console.log(keyword);
    console.log("in fectch")
    if(keyword === ""){
        alert("키워드를 입력해주세요")
    }else{
        history.push(`/search/${keyword}`);
        await videos.get(`/search/shows?q=${keyword}`)
            .then(response=>{
                dispatch({type: FETCH_SEARCH, payload: response.data});
            })
    }
   
}

export const fetchMySeries = () => async (dispatch) => {
    Notification.requestPermission();
    console.log("in fetch series")
    if(navigator.onLine) { // true|false
        await firbase.getAllSeries()
        .then(response=>{
            if (window.indexedDB) {
                const request = window.indexedDB.open("MySeries", 2);
                
                request.onupgradeneeded = function (event) {
                    console.log("indexedDB.onupgradeneeded");
                    event.currentTarget.result.createObjectStore('series');
                };

                request.onsuccess = (event) => {
                    const db = event.target.result;
                    const tx = db.transaction('series', "readwrite");
                    const store = tx.objectStore('series');
                    response.forEach(data => {
                        console.log("add : ", data.id)
                        store.put(data, data.id);
                    })
                    db.close();
                }
                    
            }
            dispatch({type: FETCH_MY_SERIES, payload: response});
        })
    }else{
        if (window.indexedDB) {
            const request = window.indexedDB.open("MySeries", 2);
            const response = []; 
            request.onsuccess = (event) => {
                const db = event.target.result;
                const tx = db.transaction('series', "readwrite");
                const store = tx.objectStore('series');
                const allRecords = store.getAll();
                allRecords.onsuccess = function() {
                    const allMySeries = allRecords.result; 
                    console.log(allMySeries);
                    dispatch({type: FETCH_MY_SERIES, payload: allMySeries});                    
                };
                db.close();
            }
        }
    }
    
}

export const deleteAllMySeries = () => {
    return{
        type: DELETE_ALL_MY_SERIES
    };
};

export const deleteSeries = (seriesId) => {
    if (window.indexedDB) {
        const request = window.indexedDB.open("MySeries", 2);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const tx = db.transaction('series', "readwrite");
            const store = tx.objectStore('series');
            console.log("delete : ", seriesId);
            store.delete(parseInt(seriesId))
                .onsuccess = function (event) {
                    console.log('deleted : ', event);
                }
        }
            
    }
    return{
        type: DELETE_SERIES,
        payload: seriesId
    };
};

export const addSeries = (seriesId) => {
    return{
        type: ADD_SERIES
    };
};

export const signIn = () => {
    return{
        type: SIGN_IN
    };
};

export const signOut = () => {
    if (window.indexedDB) {
        indexedDB.deleteDatabase('MySeries', 2)
    }
    return{
        type: SIGN_OUT
    };
};


