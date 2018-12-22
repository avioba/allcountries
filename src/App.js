import React, { Component } from 'react';
import { createStore } from 'redux';
import axios from 'axios';
import Popup from './popUp';
import './App.css';

function getCountry(state = 0, { type, country }) {
  switch (type) {
    case 'COUNTRY':
      return country
    default:
      return state
  }
}

let store = createStore(getCountry);

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      countries: [] ,
      singleCountry: null ,
      search: ""
    }
    
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res =>{
      this.setState({
        countries: res.data
      })
    })

    store.subscribe(() => {
      this.setState({ singleCountry: store.getState() })
    })
    
  }

  popupCountry = (country) => {
    store.dispatch({
      type: 'COUNTRY',
      country: country
    })
  }

  closePopup = () => {
    this.setState({ singleCountry: null })
  }

  searchCountry = e => {
    this.setState({ search: e.target.value})
  }

  render() {
    const { search } = this.state;
    const { singleCountry } = this.state;
    const { countries } = this.state;
    let countryList = [];
    let countriesNum = null;
    
    const filteredCountries = countries.filter(country => {
      return country.name.toLowerCase().indexOf( search.toLocaleLowerCase()) !== -1
    })

    if(search.length > 0){
      countryList = filteredCountries.map((country ,i)=> {
        return (
          <li key={i} onClick={this.popupCountry.bind(null, country)}>
          <div><img className="circleFlag" src={country.flag} alt={country.name}/></div>
          <div>
          {country.name !== country.nativeName?
                       (<div className="countryname">{country.name} - {country.nativeName}</div>)
                        : (<div className="countryname">{country.name}</div>) }
            <div className="region">{country.region}</div>
          </div>
          </li>
        )
      })
      countriesNum = filteredCountries.length;
    }else{
      countryList = countries.map((country ,i)=> {
        return (
          <li key={i} onClick={this.popupCountry.bind(null, country)}>
          <div><img className="circleFlag" src={country.flag} alt={country.name}/></div>
          <div>
          {country.name !== country.nativeName?
                       (<div className="countryname">{country.name} - {country.nativeName}</div>)
                        : (<div className="countryname">{country.name}</div>) }
            <div className="region">{country.region}</div>
          </div>
          </li>
        )
      })
      countriesNum = countries.length;
    }
    
    return (
      <div className="App">
        <header>
       <h1>Countries<span className="countriesNum"> ({countriesNum})</span></h1>
       <input type="search" onChange={this.searchCountry} placeholder="Search By Name" />
       </header>
        <ul className="countryListUl">
          {countryList}
        </ul>
        {singleCountry && <Popup country={singleCountry} closePopup={this.closePopup}/>}
        <div className="copyright">&copy; Avi Wuve</div>
      </div>
    );
  }
}

export default App;
