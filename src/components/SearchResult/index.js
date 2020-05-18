import React from 'react';

const SearchResult = ({match}) => {
    return(
        <div>
            {match.params.id}
        </div>
    )
}

export default SearchResult;