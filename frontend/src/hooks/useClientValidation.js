export default function useClientValidation() {
  function validate(rules = {}, data = {}) {
    const errors = {}

    for (const [field, opts] of Object.entries(rules)) {
      const val = data[field]

      if (opts.required) {
        const empty = val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0)
        if (empty) {
          errors[field] = errors[field] || []
          errors[field].push('Ce champ est requis.')
          continue
        }
      }

      if (opts.numeric && val !== undefined && val !== null && val !== '') {
        if (isNaN(Number(val))) {
          errors[field] = errors[field] || []
          errors[field].push('Doit être un nombre.')
        }
      }

      if (typeof opts.min === 'number' && val !== undefined && val !== null && val !== '') {
        if (Number(val) < opts.min) {
          errors[field] = errors[field] || []
          errors[field].push(`Doit être au moins ${opts.min}`)
        }
      }

      if (typeof opts.max === 'number' && val !== undefined && val !== null && val !== '') {
        if (Number(val) > opts.max) {
          errors[field] = errors[field] || []
          errors[field].push(`Doit être au plus ${opts.max}`)
        }
      }

      if (opts.minLength && typeof val === 'string') {
        if (val.length < opts.minLength) {
          errors[field] = errors[field] || []
          errors[field].push(`Doit contenir au moins ${opts.minLength} caractères`)
        }
      }

      if (opts.maxLength && typeof val === 'string') {
        if (val.length > opts.maxLength) {
          errors[field] = errors[field] || []
          errors[field].push(`Doit contenir au plus ${opts.maxLength} caractères`)
        }
      }
    }

    return errors
  }

  return { validate }
}
