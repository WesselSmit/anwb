import { useState, type FormEvent } from 'react'
import { getAdvice } from './lib/advisor'
import messages from './static/messages.json'

export default function App() {
  const [result, setResult] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [numberOfDays, setNumberOfDays] = useState(0)
  const [isEU, setIsEU] = useState(false)
  const [errors, setErrors] = useState<{ numberOfPeople?: string; numberOfDays?: string }>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const advice = getAdvice({ numberOfPeople, numberOfDays, isEU })

    setResult(() => advice)
    setErrors({})
  }

  function validate() {
    const newErrors: typeof errors = {}

    if (numberOfPeople < 1 || numberOfPeople > 4) {
      newErrors.numberOfPeople = messages.error_number_of_people
    }

    if (numberOfDays < 1) {
      newErrors.numberOfDays = messages.error_number_of_days
    }

    return newErrors
  }

  return (
    <>
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
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
          aria-invalid={errors.numberOfPeople ? 'true' : 'false'}
          aria-describedby="number-of-people-error"
        />
        {errors.numberOfPeople && (
          <span
            id="number-of-people-error"
            role="alert"
            className="error"
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
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(Number(e.target.value))}
          aria-invalid={errors.numberOfDays ? 'true' : 'false'}
          aria-describedby="number-of-days-error"
        />
        {errors.numberOfDays && (
          <span
            id="number-of-days-error"
            role="alert"
            className="error"
          >
            {errors.numberOfDays}
          </span>
        )}

        <input
          type="checkbox"
          id="is-eu"
          name="is-eu"
          checked={isEU}
          onChange={(e) => setIsEU(e.target.checked)}
        />
        <label htmlFor="is-eu">Mijn reis blijft binnen EU landen</label>

        <button type="submit">Verstuur</button>
      </form>

      <hr />

      {result && <p aria-live="polite">De voordeligste optie in uw situatie is: {result}</p>}
    </>
  )
}
