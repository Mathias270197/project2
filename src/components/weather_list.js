import React from 'react';

import { PropagateLoader } from 'react-spinners';

import WeatherItem from './weather_item';

const WeatherList = (props) => {
        var paddingStyle = {
            padding: 20
        };
        if (props.items.length === 0){
            return(
                <div className='center'>
                    <div className='sweet-loading'>
                        <PropagateLoader 
                            color={'#3399ff'}
                            size='40'
                            loading="true"
                        />
                    </div>
                </div>
            )
        }

        return (
            <section style={paddingStyle}>
                <div className="row">
                    { props.items.map(item => (
                      <WeatherItem item={item} city={props.city}/>  
                    )) }
                </div>
            </section>
        );
    
}

export default WeatherList;
