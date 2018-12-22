import React from 'react';

const popup = (props) => {
    let languages = [];
    languages = props.country.languages;
    return (
        <div className="overlay" onClick={handleClick.bind(null, props.closePopup)}>
            <div className="popup">
                {props.country.name !== props.country.nativeName?
                     (<h2>{props.country.name} - {props.country.nativeName}</h2>)
                      : (<h2>{props.country.name}</h2>) }
                <img src= {props.country.flag} alt={props.country.name}/>
                <div className="countryData"><strong>Region: </strong>{props.country.region}</div>
                <div className="countryData"><strong>Capital: </strong>{props.country.capital}</div>
                <h4>Languages:</h4>
                <ul>
                    {languages.map((language , i) => <li key={i} className="popupLanguage">{language.name}</li>)}
                </ul>
            </div>  
        </div>
    );
};

const handleClick = (closePopup, e) => {
    if (e.target === e.currentTarget) {
      closePopup()
    }
}

export default popup;