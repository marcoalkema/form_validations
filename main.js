import { validateName, validateCity, validateTelephone, validateNumber } from './validations.js'
import * as R from 'ramda'
import * as Rx from 'rxjs'

const nameInputObs = Rx.Observable.fromEvent(document.querySelector('.nameInput'), 'focusout')
      .map(evt => R.compose(
        validateName,
        R.path(['target', 'value'])
      )(evt))

const cityInputObs = Rx.Observable.fromEvent(document.querySelector('.cityInput'), 'focusout')
      .map(evt => R.compose(
        validateCity,
        R.path(['target', 'value'])
      )(evt))

const telephoneInputObs = Rx.Observable.fromEvent(document.querySelector('.telephoneInput'), 'keyup')
      .map(evt => validateTelephone(evt.target.value))

const numberInputObs = Rx.Observable.fromEvent(document.querySelector('.numberInput'), 'keyup')
      .delay(200)
      .map(evt => R.compose(
        validateNumber,
        R.path(['target', 'value'])
      )(evt))

function mkLiElementStrings (acc, str) {
  return acc + '<li>' + str + '</li>'
}

Rx.Observable
  .combineLatest(
    nameInputObs,
    cityInputObs)
  .subscribe(residentValidationResults => {
    const ulElementStr = '<ul>' + R.reduce(mkLiElementStrings, '', residentValidationResults) + '</ul>'
    document.querySelector('.combinedResult').innerHTML = ulElementStr
  })

telephoneInputObs.subscribe(telephoneValidation => {
  const ulElementStr = '<ul>' + R.reduce(mkLiElementStrings, '', telephoneValidation.value) + '</ul>'
  document.querySelector('.liveResult').innerHTML = 'Look ma\'! Real-time validation!' + ulElementStr
})

numberInputObs.subscribe(numberValidation => {
  const ulElementStr = '<ul>' + R.reduce(mkLiElementStrings, '', numberValidation.value) + '</ul>'
  const elementColor = numberValidation.result === 'succes' ? '#349534' : '#a43534'
  document.querySelector('.numberResult').innerHTML = 'Let your true color shine!' + ulElementStr
  document.querySelector('.numberInput').style.background = elementColor
})
