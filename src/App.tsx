import { useState, type FormEvent } from 'react'
import { getAdvice } from './lib/advisor'
import messages from './data/messages.json'
import { Form } from './components/Form/Form'
import { FormField } from './components/FormField/FormField'
import { FormFieldLabel } from './components/FormFieldLabel/FormFieldLabel'
import { FormFieldError } from './components/FormFieldError/FormFieldError'
import { TextInput } from './components/TextInput/TextInput'
import { CheckboxInput } from './components/CheckboxInput/CheckboxInput'
import './App.css'

export default function App() {
  const [result, setResult] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [numberOfDays, setNumberOfDays] = useState('')
  const [isEU, setIsEU] = useState(false)
  const [errors, setErrors] = useState<{ numberOfPeople?: string; numberOfDays?: string }>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setErrors({})
    const newErrors = validate()
    const hasErrors = Object.keys(newErrors).length > 0

    if (hasErrors) {
      setErrors(newErrors)
      setResult('')
      return
    }

    if (!numberOfPeople || !numberOfDays) return

    const parsedNumberOfPeople = parseInt(numberOfPeople, 10)
    const parsedNumberOfDays = parseInt(numberOfDays, 10)

    const advice = getAdvice({
      numberOfPeople: parsedNumberOfPeople,
      numberOfDays: parsedNumberOfDays,
      isEU
    })

    setResult(advice)
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

        <Form onSubmit={handleSubmit} noValidate>
          <FormField>
            <FormFieldLabel>Hoeveel mensen gaan er op reis?</FormFieldLabel>
            <TextInput
              required
              type="number"
              min="1"
              max="4"
              step="1"
              placeholder="2"
              value={numberOfPeople}
              onChange={(event) => setNumberOfPeople((event.target as HTMLInputElement).value)}
              aria-invalid={errors.numberOfPeople ? true : false}
            />
            {errors.numberOfPeople && <FormFieldError>{errors.numberOfPeople}</FormFieldError>}
          </FormField>

          <FormField>
            <FormFieldLabel>Hoeveel dagen duurt de reis?</FormFieldLabel>
            <TextInput
              required
              type="number"
              min="1"
              step="1"
              placeholder="7"
              value={numberOfDays}
              onChange={(event) => setNumberOfDays((event.target as HTMLInputElement).value)}
              aria-invalid={errors.numberOfDays ? true : false}
            />
            {errors.numberOfDays && <FormFieldError>{errors.numberOfDays}</FormFieldError>}
          </FormField>

          <FormField>
            <CheckboxInput
              checked={isEU}
              onChange={(event) => setIsEU((event.target as HTMLInputElement).checked)}
            />
            <FormFieldLabel>Mijn reis is alleen binnen EU landen</FormFieldLabel>
          </FormField>

          <button type="submit" disabled={!numberOfPeople || !numberOfDays}>
            Check voordeligste optie
          </button>
        </Form>

        {result && (
          <p aria-live="polite" className="recommendation">
            De voordeligste optie voor u is: <span className="result">"{result}"</span>
          </p>
        )}
      </section>
    </main>
  )
}
