import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getWeather, WeatherResType } from '../axios/api'
import styles from '../styles/weather.module.css'

type Props = {
    setCondition: Dispatch<SetStateAction<string>>
}


const Weather: React.FC<Props> = ({ setCondition }) => {
    const [weatherData, setWeatherData] = useState<WeatherResType>({} as WeatherResType)
    const [cords, setCords] = useState({
        lat: 55.75,
        lon: 37.61
    })

    const successfullGeoHandler = (position: GeolocationPosition) => {
        setCords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
        })
        window.localStorage.setItem("lat", String(position.coords.latitude))
        window.localStorage.setItem("lon", String(position.coords.longitude))
    }

    const errorGeoHandler = () => {
        alert("If you want to get the weather, enable geolocation and reload the page please !")
    }


    useEffect(() => {
        if (window.localStorage.getItem("lat") && window.localStorage.getItem("lon")) {
            setCords({
                // @ts-ignore
                lat: Number(window.localStorage.getItem("lat")),
                // @ts-ignore
                lon: Number(window.localStorage.getItem("lon"))
            })
        }
        navigator.geolocation.getCurrentPosition(successfullGeoHandler, errorGeoHandler)

    }, [])

    useEffect(() => {
        getWeather(cords).then(res => {
            setWeatherData(res.data)
        })
    }, [cords])
    useEffect(() => {
        if (weatherData.weather) {
            setCondition(weatherData?.weather[0]?.main)
        }
    }, [weatherData])

    return <>
        <div className={styles.weatherWrapper}>
            <div className={styles.weatherTemp}>{weatherData?.main?.temp}℃ </div>
            <div className={styles.weatherPlace}>{weatherData?.name}</div>
            <img src={`http://openweathermap.org/img/wn/${weatherData?.weather && weatherData?.weather[0].icon || '04d'}@2x.png`} className={styles.weatherIcon} />
        </div>
    </>

}

export default Weather