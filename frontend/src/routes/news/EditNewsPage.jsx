import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import newsClient from '../../api/newsClient'
import useServerValidation from '../../hooks/useServerValidation'

export default function EditNewsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const { errors, handleServerErrors, clearErrors } = useServerValidation()

  useEffect(() => {
    newsClient.show(id)
      .then((res) => {
        const news = res.data["data"]

        setDate(news.date)
        setTitle(news.title)
        setContent(news.content)
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
  setError('')

    setIsSaving(true)

    clearErrors()
    newsClient.update(id, date, title, content)
      .then(() => {
        navigate(`/news/${id}`)
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          handleServerErrors(err)
        } else {
          setError('Une erreur est survenue lors de la mise à jour de l\'actualité.')
        }
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Modifier l'actualité</h1>

      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error && isLoading === false ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
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
              {isSaving ? 'Enregistrement...' : 'Sauvegarder'}
            </button>

          </div>
        </div>
        </form>
      )}
    </div>
  )
}
