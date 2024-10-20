import { useState, type FormEvent } from 'react'
import { getAdvice } from './lib/advisor'
import messages from './data/messages.json'
import './App.css'

export default function App() {
  const [result, setResult] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [numberOfDays, setNumberOfDays] = useState('')
  const [isEU, setIsEU] = useState(false)
  const [errors, setErrors] = useState<{ numberOfPeople?: string; numberOfDays?: string }>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!numberOfPeople || !numberOfDays) return

    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setResult('')
      setErrors(newErrors)
      return
    }

    const parsedNumberOfPeople = parseInt(numberOfPeople, 10)
    const parsedNumberOfDays = parseInt(numberOfDays, 10)

    const advice = getAdvice({
      numberOfPeople: parsedNumberOfPeople,
      numberOfDays: parsedNumberOfDays,
      isEU
    })

    setResult(advice)
    setErrors({})
  }

  function validate() {
    const newErrors: typeof errors = {}
    const parsedNumberOfPeople = parseInt(numberOfPeople, 10)
    const parsedNumberOfDays = parseInt(numberOfDays, 10)

    if (!parsedNumberOfPeople || parsedNumberOfPeople < 1 || parsedNumberOfPeople > 4) {
      newErrors.numberOfPeople = messages.error_number_of_people
    }

    if (!numberOfDays || parsedNumberOfDays < 1) {
      newErrors.numberOfDays = messages.error_number_of_days
    }

    return newErrors
  }

  return (
    <main>
      <section className="coverage-advisor">
        <h1>Keuzehulp</h1>
        <p>Gebruik ons keuzehulp tool om de dekking van uw doorlopende reisverzekering op de voordeligste manier aan te passen.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="number-of-people">Hoeveel mensen gaan er op reis? *</label>
          <input
            required
            type="number"
            id="number-of-people"
            min="1"
            max="4"
            step="1"
            placeholder="2"
            value={numberOfPeople}
            onChange={(event) => setNumberOfPeople(event.target.value)}
            className={errors.numberOfPeople ? 'invalid' : ''}
            aria-invalid={errors.numberOfPeople ? true : false}
            aria-describedby="number-of-people-error"
          />
          {errors.numberOfPeople && (
            <span
              id="number-of-people-error"
              role="alert"
              className="error-helper"
            >
              {errors.numberOfPeople}
            </span>
          )}

          <label htmlFor="number-of-days">Hoeveel dagen duurt de reis? *</label>
          <input
            required
            type="number"
            id="number-of-days"
            min="1"
            step="1"
            placeholder="7"
            value={numberOfDays}
            onChange={(event) => setNumberOfDays(event.target.value)}
            className={errors.numberOfDays ? 'invalid' : ''}
            aria-invalid={errors.numberOfDays ? true : false}
            aria-describedby="number-of-days-error"
          />
          {errors.numberOfDays && (
            <span
              id="number-of-days-error"
              role="alert"
              className="error-helper"
            >
              {errors.numberOfDays}
            </span>
          )}

          <label htmlFor="is-eu">
            <input
              type="checkbox"
              id="is-eu"
              name="is-eu"
              checked={isEU}
              onChange={(event) => setIsEU(event.target.checked)}
            />
            Mijn reis is alleen binnen EU landen
          </label>

          <button type="submit" disabled={!numberOfPeople || !numberOfDays}>Check voordeligste optie</button>
        </form>

        {result && (
          <p
            aria-live="polite"
            className="recommendation"
          >
            De voordeligste optie voor u is: <span className="result">"{result}"</span>
          </p>
        )}
      </section>
    </main>
  )
}
