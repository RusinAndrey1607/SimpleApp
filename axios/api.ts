import axios from "axios"


const API_KEY = process.env.API_KEY 

export type WeatherResType = {
    main:{
        temp:number,
        humidity:number
    },
    name:string,
    weather:Array<{
        main:string,
        description:string,
        icon:string
    }>
}
export const getWeather = async (cords:{
    lat: number, 
    lon:number
}) => {
    const res = await axios.get<WeatherResType>(`https://api.openweathermap.org/data/2.5/weather?lat=${cords.lat}&lon=${cords.lon}&appid=${API_KEY}&units=metric`).then(res => res)
    return res
}