import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
  const [ count, setCount ] = useState(0);
  return (
    <>
      <h1>Hello world</h1>
      <p>From this test component</p>
      <p>Something else</p>
      <p>Hot module replacement</p>
      <p>Hot module replacement</p>
      <p>Hot module replacement and server restar!</p>
      <p>Neat</p>
      <button onClick={() => setCount(v => v + 1)}>Click me! {count}</button>
      <button onClick={() => setCount(v => v + 1)}>Click me! {count}</button>
      {[...Array(count)].map((v, i) => {
        return <p>This is amazing {i} times, HAH</p>
      })}
    </>
  )
}
