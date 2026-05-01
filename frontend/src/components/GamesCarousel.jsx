import { useState } from 'react'
import ChevronLeft from '../svgs/chevron-left.svg?react'
import ChevronRight from '../svgs/chevron-right.svg?react'

const items = [
  { id: 1, title: "Card One",   text: "Some content for the first card." },
  { id: 2, title: "Card Two",   text: "Some content for the second card." },
  { id: 3, title: "Card Three", text: "Some content for the third card." },
  { id: 4, title: "Card Four",  text: "Some content for the fourth card." },
  { id: 5, title: "Card Five",  text: "Some content for the fifth card." },
]

export default function GamesCarousel({ visibleNeighbors = 1 }) {
  const [active, setActive] = useState(0)
  const n = items.length

  const neighbors    = Math.min(visibleNeighbors, Math.floor((n - 1) / 2))
  const visibleCount = neighbors * 2 + 1;

  const prev = () => setActive((i) => (i - 1 + n) % n)
  const next = () => setActive((i) => (i + 1) % n)

  const visibleIndices = Array.from({ length: visibleCount }, (_, k) =>
    (active - neighbors + k + n) % n
  )

  return (
    <div className="d-flex flex-column align-items-center py-5">

      <div className="d-flex align-items-stretch justify-content-center gap-3 w-100">

        <button
          className="btn btn-primary rounded-circle align-self-center d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: 44, height: 44 }}
          onClick={prev}
        >
          <ChevronLeft />
        </button>

        {visibleIndices.map((idx, k) => {
          const item     = items[idx];
          const isActive = k === neighbors;
          return (
            <div
              key={item.id}
              className={`card text-center flex-shrink-0 ${isActive ? "border-primary shadow" : "opacity-50"}`}
              style={{ width: 220, cursor: "pointer" }}
              onClick={() => { if (!isActive) setActive(idx); }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted">{item.text}</p>
              </div>
            </div>
          );
        })}

        <button
          className="btn btn-primary rounded-circle align-self-center d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: 44, height: 44 }}
          onClick={next}
        >
          <ChevronRight />
        </button>

      </div>

      <div className="d-flex justify-content-center gap-2 mt-3">
        {items.map((item, i) => (
          <button
            key={item.id}
            className={`btn btn-sm rounded-circle p-0 ${i === active ? "btn-primary" : "btn-outline-secondary"}`}
            style={{ width: 10, height: 10 }}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

    </div>
  )
}
