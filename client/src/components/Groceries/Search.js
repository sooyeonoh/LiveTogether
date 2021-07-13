import React, {useState} from 'react';
import SearchItem from './SearchItem';
import { ListGroup, InputGroup, FormControl, Button } from "react-bootstrap";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import axiosConfig from "../../axiosConfig";

function Search(props) {
    const apiKey = process.env.REACT_APP_API_KEY;

    const numResults = 10
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    function suggest(item) {
        setSearch(item);
        const params = new URLSearchParams({
            query: search,
            number: numResults / 2,
            metaInformation: true
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
        })
    }

    function addGrocery(grocery) {
        grocery.count = 1; 
        axios.get("https://api.spoonacular.com/food/ingredients/" + grocery.id + "/information?amount=1000&unit=g&apiKey=" + apiKey)
            .then(res => {
                grocery.cost = (parseFloat(res.data.estimatedCost.value) / 100).toFixed(2);
                axios.post("http://localhost:5000/addGrocery", grocery, axiosConfig).then(res => {
                    props.showAddedGrocery(res.data);
                    console.log("Successfully added grocery")
                }).catch(err => {
                    console.log(err);
                })
        });
    }

    function showResults() {
        return (
            <ListGroup>
                {Array.from(results).map(item => {
                    return (
                        <SearchItem item={item} key={results.indexOf(item)} addGrocery={addGrocery}/>
                    )
                })}
            </ListGroup>
        );
    }

    return (
        <div style={{width: '50%'}}>
            <form onSubmit={doSearch}>
                <InputGroup className="mb-3 d-flex align-items-center" value={search} onChange={(event) => suggest(event.target.value)}>
                    
                    <InputGroup.Text>
                        <SearchIcon/>
                    </InputGroup.Text>
                    <FormControl
                        placeholder="Search for items"
                        aria-label="Search bar"
                    />
                    <Button variant="secondary" style={{backgroundColor: '#fb6c70'}} onClick={doSearch}>Search</Button>
                </InputGroup>
            </form>
            {search !== "" && results !== [] && showResults()}
        </div>
        
    );
}

export default Search;