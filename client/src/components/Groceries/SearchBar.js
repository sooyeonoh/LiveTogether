import React, {useState} from 'react';
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";

function SearchBar(props) {

    const numResults = 10
    const [search, setSearch] = useState("");

    function doSearch(event) {
        event.preventDefault();
        const params = new URLSearchParams({
            query: search,
            number: numResults
        });
        axios.get("https://api.spoonacular.com/food/products/search?" + params, search).then(res => {
            console.log(res.data);
        })
    }

    return (
        <form onSubmit={doSearch}>
            <InputGroup className="mb-3" value={search} onChange={(event) => setSearch(event.value)}>
                <FormControl
                    placeholder="Search for items"
                    aria-label="Search bar"
                />
                <InputGroup.Append>
                <Button variant="outline-secondary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </form>
    );
}

export default SearchBar;