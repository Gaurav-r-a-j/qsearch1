import React, { } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import './SearchResult.css'
import SearchResultCard from './SearchResultCard';
const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation()
    const { results } = location.state;
    console.log("state", results)
    const q = searchParams.get('q')
    console.log(q)

    return (
        <div className="search_result_body">
            <div className='search_result_container'>
                <h1>Search Results for "{q}"</h1>
                {results.length > 0 ? (
                    <div className="search_card_container">

                        {results.map(item => (
                            <SearchResultCard
                                key={item?._id}
                                postId={item?._id}
                                postImg={item?.postImg}
                                title={item?.title}
                                desc={item?.desc}
                                cat={item?.category}
                                author={item?.name ?? "unknown" }
                                slug={item?.url}
                            />

                        ))}
                    </div>

                ) : (
                    <p>No results found for "{q}"</p>
                )}
            </div>
        </div>

    );
}


export default SearchResults