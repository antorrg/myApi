/* global bootstrap: false */
const sessionCleaner = ()=>{
  console.log('yo funciono')
  localStorage.removeItem('token')
}
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()