import { Failure, Success } from 'folktale/validation'

const containsOnlyNumbers = (city) => /^\d+$/.test(city)
      ? Success(city)
      : Failure(['Cannot contain special characters or letters.'])

const isLongEnough = (length) => (name) => name.length > 1
      ? Success(name)
      : Failure(['Must have more than ' + length + ' character(s).'])

const containsSpecialCharacter = (name) => /^[a-zA-Z]/.test(name)
      ? Success(name)
      : Failure(['Name cannot contain special characters or numbers.'])

export function validateName (name) {
  const cannotBeCalledRob = (name) => /Rob/.test(name)
        ? Failure(['Name cannot be Rob, I\'m sorry.'])
        : Success(name)

  const isValidName = (name) => Success(name)
        .concat(isLongEnough(2)(name))
        .concat(containsSpecialCharacter(name))
        .concat(cannotBeCalledRob(name))

  return isValidName(name)
    .matchWith({
      Success: ({ value }) => `Success: ${value}`,
      Failure: ({ value }) => `Error found: ${value}`
    })
}

export function validateCity (city) {
  const isValidCity = (city) => Success(city)
        .concat(isLongEnough(1)(city))
        .concat(containsSpecialCharacter(city))

  return isValidCity(city)
    .matchWith({
      Success: ({ value }) => `Success: ${value}`,
      Failure: ({ value }) => `Error found: ${value}`
    })
}

export function validateTelephone (number) {
  const isNumberLongEnough = (number) => number.length >= 10
        ? Success(number)
        : Failure(['Phone numbers must be at least 10 characters.'])

  const isValidNumber = (number) => Success(number)
        .concat(containsOnlyNumbers(number))
        .concat(isNumberLongEnough(number))

  return isValidNumber(number)
    .matchWith({
      Success: result => ({
        result: 'succes',
        value: [result.value]
      }),
      Failure: result => ({
        result: 'error',
        value: result.value
      })
    })
}

export function validateNumber (number) {
  const isNumberLongEnough = (number) => number.length !== 0
        ? Success(number)
        : Failure(['Number cannot be empty.'])

  const isChristianNumber = (number) => number != 666
        ? Success(number)
        : Failure(['Demonspawn!'])

  const isValidNumber = (number) => Success(number)
        .concat(containsOnlyNumbers(number))
        .concat(isNumberLongEnough(number))
        .concat(isChristianNumber(number))

  return isValidNumber(number)
    .matchWith({
      Success: result => ({
        result: 'succes',
        value: [result.value]
      }),
      Failure: result => ({
        result: 'error',
        value: result.value
      })
    })
}
