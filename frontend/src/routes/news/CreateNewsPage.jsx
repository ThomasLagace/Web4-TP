import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import newsClient from '../../api/newsClient'

export default function CreateNewsPage() {
  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    newsClient.store(date, title, content).then(() => {
      navigate('/news')
    }).finally(() => {
      setIsSaving(false)
    })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Nouvelle actualité</h1>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">

            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Titre</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contenu</label>
              <textarea
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
