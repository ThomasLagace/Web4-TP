import { useState } from 'react'

export default function useServerValidation() {
  const [errors, setErrors] = useState({})

  function clearErrors() {
    setErrors({})
  }

  function handleServerErrors(err) {
    if (!err || !err.response) return

    if (err.response.status === 422) {
      const srvErrors = err.response.data?.errors || {}
      setErrors(srvErrors)

      const firstKey = Object.keys(srvErrors)[0]
      if (firstKey) {
        // Try to find element by name or id
        const selectorByName = `[name="${firstKey}"]`
        const elByName = document.querySelector(selectorByName)
        const elById = document.getElementById(firstKey)
        const target = elByName || elById
        if (target && typeof target.scrollIntoView === 'function') {
          try {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' })
            target.focus && target.focus()
          } catch (e) { }
        }
      }
    }
  }

  return { errors, setErrors, clearErrors, handleServerErrors }
}
