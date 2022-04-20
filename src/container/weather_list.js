import React, { Component } from 'react';

import WeatherList from '../components/weather_list';

import WeatherApi from '../apis/Weatherapi';

class WeatherListContainer extends Component {
    constructor(props) {
        super();

        this.state = {
            items: [ ],
            city: "Geel"
        };
    }

    componentDidMount() {
        let api = new WeatherApi();

        var promise = api.getWeather(this.state.city);

        promise.then(function(result){
                this.setState({ items: result.data.list });
            }.bind(this),
            function (error){
                console.log('Something went wrong with the weather api.')
            }
        );
    }

    render() {
        return (
            <WeatherList items={this.state.items}
                         city={this.state.city} />
        );
    }
}

export default WeatherListContainer;
