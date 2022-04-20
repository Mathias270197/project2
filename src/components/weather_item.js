import React from 'react';

const WeatherItem = (props) => {
    var cardStyle = {
        textAlign: 'center',
        padding: 20,
        height: 280,
        backgroundColor: "#3399ff",
        filter: "drop-shadow(0px 0px 5px #888)"
    };

    var textStyle = {
        height: 50,
        color: "#FFFFFF"
    };

    var imageStyle = {
        width: 120
    };

    return (
        <div className="card" style={cardStyle}>
            <div style={textStyle}>
                {props.item.main.temp} °C - {props.item.weather[0].description}
            </div>
            <img style={imageStyle}
                 alt="tile"
                 src={`https://koenvangeel.pythonanywhere.com/static/${props.item.weather[0].icon}.png`} />
            <div className="card-section" style={textStyle}>
                <p>{props.city} - {props.item.dt_txt}</p>
            </div>
        </div>
    );

};

export default WeatherItem;
