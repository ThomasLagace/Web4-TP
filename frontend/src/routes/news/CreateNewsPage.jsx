import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import newsClient from '../../api/newsClient'
import useServerValidation from '../../hooks/useServerValidation'
import useClientValidation from '../../hooks/useClientValidation'

export default function CreateNewsPage() {
  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const { errors, setErrors, handleServerErrors, clearErrors } = useServerValidation()
  const { validate } = useClientValidation()

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    clearErrors()
    // client-side validate
    const clientErrors = validate({
      date: { required: true },
      title: { required: true, minLength: 3 },
      content: { required: true, minLength: 3 },
    }, { date, title, content })

    if (Object.keys(clientErrors).length > 0) {
      // show client errors and focus first
      setErrors(clientErrors)
      const first = Object.keys(clientErrors)[0]
      const el = document.querySelector(`[name="${first}"]`) || document.getElementById(first)
      if (el && el.focus) el.focus()
      setIsSaving(false)
      return
    }
    setIsSaving(true)

    newsClient.store(date, title, content)
      .then(() => {
        navigate('/news')
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          handleServerErrors(err)
        } else {
          setError('Une erreur est survenue lors de la création de l\'actualité.')
        }
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Nouvelle actualité</h1>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">

          {error && (
            <div className="alert alert-danger mb-3" role="alert">
              {error}
            </div>
          )}

            <div className="mb-3">
              <label className="form-label">Date</label>
              {errors.date && <div className="text-danger mb-2">{errors.date[0]}</div>}
              <input
                name="date"
                id="date"
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Titre</label>
              {errors.title && <div className="text-danger mb-2">{errors.title[0]}</div>}
              <input
                name="title"
                id="title"
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contenu</label>
              {errors.content && <div className="text-danger mb-2">{errors.content[0]}</div>}
              <textarea
                name="content"
                id="content"
                className="form-control"
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? 'Enregistrement...' : 'Créer'}
            </button>

          </div>
        </div>
      </form>
    </div>
  )
}
