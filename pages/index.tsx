import type { NextPage } from 'next'
import Head from 'next/head'
import Clock from '../components/Clock'
import Greetings from '../components/Greetings'
import Todo from '../components/Todo'
import Weather from '../components/Weather'
import { useState, useEffect } from 'react';


const randomBg = Math.floor(Math.random() * 5) + 1

const conditions = ["Clear", "Clouds", "Mist", "Rain"]
const dayNamesList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const monthNamesList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Home: NextPage = () => {
  const [condition, setCondition] = useState("")
  const [time, setTime] = useState(new Date())

  const dayAndMonth = `${dayNamesList[time.getDay()]} ${monthNamesList[time.getMonth()]}`
  const timeLine = `${time.getHours() >= 10 ? time.getHours() : "0" + time.getHours()}:${time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes()}:${time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds()}`

  const changeTime = () => {
    setTime(new Date())

  }
  useEffect(() => {
    const id = setInterval(changeTime, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])
  return (
    <>
      <Head>
        <title>NextApp</title>
        <meta name="description" content="This App made using NextJs framework !" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="wrapper">
        <Clock dayAndMonth={dayAndMonth} time={timeLine} />
        <Todo />
        <Greetings hour={time.getHours()} />
        <Weather setCondition={setCondition} />
        <img src={`images/bg`} className='bgImage' />
        {
          conditions.includes(condition) ?
            <img src={`images/${condition}/bg-${randomBg}`} className='bgImage' />
            :
            <img src={`images/bg`} className='bgImage' />
        }
      </div>
    </>
  )
}

export default Home
