import React, {useState} from 'react';
import SearchItem from './SearchItem';
import { ListGroup, InputGroup, FormControl, Button } from "react-bootstrap";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

function Search(props) {
    const apiKey = process.env.REACT_APP_API_KEY;

    const numResults = 10
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    function suggest(item) {
        setSearch(item);
        const params = new URLSearchParams({
            query: search,
            number: numResults / 2
        });
        axios.get("https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=" + apiKey + '&' + params).then(res => {
            setResults(res.data);
        })
    }

    function doSearch(event) {
        event.preventDefault();
        const params = new URLSearchParams({
            query: search,
            number: numResults
        });
        axios.get("https://api.spoonacular.com/food/ingredients/search?apiKey=" + apiKey + '&' + params).then(res => {
            setResults(res.data.results);
            console.log(res.data.results);
        })
    }

    function showResults() {
        console.log(results);
        return (
            <ListGroup>
                {Array.from(results).map(item => {
                    return (
                        <SearchItem item={item} key={results.indexOf(item)}/>
                    )
                })}
            </ListGroup>
        );
    }

    return (
        <div>
            <form onSubmit={doSearch} style={{ width: '50vw' }}>
                <InputGroup className="mb-3 d-flex align-items-center" value={search} onChange={(event) => suggest(event.target.value)}>
                    
                    <InputGroup.Text>
                        <SearchIcon/>
                    </InputGroup.Text>
                    <FormControl
                        placeholder="Search for items"
                        aria-label="Search bar"
                    />
                    <Button variant="outline-secondary" onClick={doSearch}>Search</Button>
                </InputGroup>
            </form>
            {results !== [] && showResults()}
        </div>
        
    );
}

export default Search;