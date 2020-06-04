/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function () {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if (
    'serviceWorker' in navigator
    && (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function (registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function () {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case 'redundant':
                  throw new Error('The installing ' +
                    'service worker became redundant.');

                default:
                // Ignore
              }
            };
          }
        };
      }).catch(function (e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here
  const form = document.querySelector('#form');
  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');
  const email = document.querySelector('#email');
  const country = document.querySelector('#country');
  const postalCode = document.querySelector('#postal-code');
  const phoneNumber = document.querySelector('#phone-number');
  const creditCard = document.querySelector('#credit-card');
  const securityCode = document.querySelector('#security-code');
  const expirationDate = document.querySelector('#expiration-date');
  const submitBtn = document.querySelector('.submit_button');
  let feedback;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
  })

  const checkInputs = () => {
    const firstNameValue = firstName.value.trim()
    const lastNameValue = lastName.value.trim()
    const emailValue = email.value.trim()
    const countryValue = country.value.trim()
    const postalCodeValue = postalCode.value.trim()
    const phoneNumberValue = phoneNumber.value.trim()
    const creditCardValue = creditCard.value.trim()
    const securityCodeValue = securityCode.value.trim()
    const expirationDateValue = expirationDate.value.trim()


    validateFirstName(firstNameValue, firstName);
    validateLastName(lastNameValue, lastName);
    validateEmail(emailValue, email);
    validateCountry(countryValue, country);
    validatePostcode(postalCodeValue, postalCode);
    validatePhoneNumber(phoneNumberValue, phoneNumber);
    validateCreditCard(creditCardValue, creditCard);
    validateSecurityCode(securityCodeValue, securityCode);
    validateExpiryDate(expirationDateValue, expirationDate);

    validateEntireForm();
  }

  const setErrorFor = (input, message) => {
    const formControl = input.parentElement.parentElement;

    if (!document.querySelector('.error-text')) {
      const error = document.createElement('div');
      error.innerText = message;
      error.className = 'error-text';
      error.style.fontSize ='1.1rem'
      formControl.appendChild(error);
    }
  }

  const setSuccessFor = (input) => {
    const inputSection = input.parentElement.parentElement;
    if (inputSection.querySelector('.error-text') !== null) {
      const error = inputSection.querySelector('.error-text');
      error.remove();
    }
  }

  const isEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email)
  }

  const validateFirstName = (firstNameValue, firstName) => {
    if (firstNameValue.length < 3) {
      setErrorFor(firstName, 'First name must by minimum 3 characters long');
    } else {
      setSuccessFor(firstName);
    }
  }

  const validateLastName = (lastNameValue, lastName) => {
    if (lastNameValue.length < 3) {
      setErrorFor(lastName, 'Last name must by minimum 3 characters long');
    } else {
      setSuccessFor(lastName);
    }
  }

  const validateEmail = (emailValue, email) => {
    if (!isEmail(emailValue)) {
      setErrorFor(email, 'Email is not valid');
    } else {
      setSuccessFor(email);
    }
  }

  const validateCountry = (countryValue, country) => {
    if (countryValue === '') {
      setErrorFor(country, 'Country is requred');
    } else {
      setSuccessFor(country);
    }
  }

  const validatePostcode = (postalCodeValue, postalCode) => {
    if (postalCodeValue === '') {
      setErrorFor(postalCode, 'Postal Code is requred');
    } else {
      setSuccessFor(postalCode);
    }
  };

  const validatePhoneNumber = (phoneNumberValue, phoneNumber) => {
    if (phoneNumberValue.length < 9) {
      setErrorFor(phoneNumber, 'Phone number must have minimum 9 digits long');
    } else {
      setSuccessFor(phoneNumber);
    }
  }

  const validateCreditCard = (creditCardValue, creditCard) => {
    let filtredCardValue = creditCardValue.replace(/-|\s/g, "");
    if (filtredCardValue.length !== 16) {
      setErrorFor(creditCard, 'Credit card must be 16 digits long');
    } else {
      setSuccessFor(creditCard);
    }
  }
  const validateSecurityCode = (securityCodeValue, securityCode) => {
    if (securityCodeValue.length !== 3) {
      setErrorFor(securityCode, 'Security code must be 3 digits long');
    } else {
      setSuccessFor(securityCode);
    }
  };

  const validateExpiryDate = (expirationDateValue, expirationDate) => {
    let filtredExpiryDate = expirationDateValue.replace(/\/|\s/g, "");
    if (filtredExpiryDate.length !== 4) {
      setErrorFor(expirationDate, 'Security code must be 4 characters long');
    } else {
      setSuccessFor(expirationDate);
    }
  }

  const validateEntireForm = () => {
    if (!document.querySelector('.error-text')) {
      if (!document.querySelector('.alert.alert-success')) {
        if (document.querySelector('.alert.alert-danger')) {
          document.querySelector('.alert.alert-danger').remove();
        }
        feedback = document.createElement('div');
        feedback.innerText = 'Your data has been submited, thank you for filling out your information!'
        feedback.className = 'alert alert-success';
        feedback.style.margin ='60px 0';
        submitBtn.appendChild(feedback);
        form.reset();
      }
      setTimeout(() => feedback.remove(), 4000)
    } else {
      if (!document.querySelector('.alert.alert-danger')) {
        feedback = document.createElement('div');
        feedback.innerText = 'Unable to submit from, please correct data';
        feedback.className = 'alert alert-danger';
        feedback.style.margin ='60px 0';

        submitBtn.appendChild(feedback);
      }
    }
  }
})();
