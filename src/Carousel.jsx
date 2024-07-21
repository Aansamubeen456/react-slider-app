import React, { useEffect, useState } from 'react'
import { shortList, list, longList } from './data'
import { FaQuoteRight } from 'react-icons/fa'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Carousel = () => {
  const [people, setPeople] = useState(list)
  const [currentPerson, setCurrentPerson] = useState(0)

  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson - 1 + people.length) % people.length
      return result
    })
  }
  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson + 1) % people.length
      return result
    })
  }
  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide()
    }, 2000)
    return () => {
      clearInterval(sliderId)
    }
  }, [currentPerson])
  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person
        return (
          <article
            className="slide"
            key={id}
            style={{
              transform: `translateX( ${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? 'visible' : 'hidden',
            }}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        )
      })}
      <button type="button" onClick={() => prevSlide()} className="prev">
        <FaChevronLeft />
      </button>
      <button type="button" onClick={() => nextSlide()} className="next">
        <FaChevronRight />
      </button>
    </section>
  )
}

export default Carousel
