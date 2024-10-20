import { useState, type FormEvent } from 'react'
import { getAdvice } from './lib/advisor'

export default function App() {
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [numberOfDays, setNumberOfDays] = useState(7)
  const [isEU, setIsEU] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('form submit', numberOfPeople, numberOfDays, isEU, getAdvice({ numberOfPeople, durationInDays: numberOfDays, isEU }))
  }

  return (
    <>
      <h1>Keuzehulp</h1>
      <p>Gebruik ons keuzehulp tool om de dekking van uw doorlopende reisverzekering op de voordeligste manier aan te passen.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="number-of-people">Hoeveel mensen gaan er op reis?</label>
        <input type="number" id="number-of-people" min="1" max="4" step="1" value={numberOfPeople} onChange={(e) => setNumberOfPeople(Number(e.target.value))} />

        <label htmlFor="number-of-days">Hoeveel dagen duurt de reis?</label>
        <input type="number" id="number-of-days" min="1" step="1" value={numberOfDays} onChange={(e) => setNumberOfDays(Number(e.target.value))} />

        <input type="checkbox" id="is-eu" name="is-eu" checked={isEU} onChange={(e) => setIsEU(e.target.checked)} />
        <label htmlFor="is-eu">Mijn reis blijft binnen EU landen</label>

        <button type="submit">Verstuur</button>
      </form>
    </>
  )
}
