import React, { useState } from 'react'
import api from '../../axios';
import './Search.css'
import { useNavigate } from "react-router-dom";



const Search = () => {
    const [query, setQuery] = useState('');
    // const history = useHistory();

    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault();
        const { data } = await api.get(`/post/search?q=${query}`);
        console.log(data)
        navigate(`/search?q=${query}`, { state: { results: data } });

        // history.push(`/search?q=${query}`, { results: data });
    };


    return (
        // <div className="glassomorphism main_search">
        <form onSubmit={handleSubmit} className="glassomorphism main_search">
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                type="search"
                placeholder='Search here' />
            {/* <span>&#128269;</span> */}

            <button type="submit" className='search_button'>
                <span
                    className="material-icons">
                    search
                </span>
            </button>

        </form>
        // </div>
    )
}


export default Search