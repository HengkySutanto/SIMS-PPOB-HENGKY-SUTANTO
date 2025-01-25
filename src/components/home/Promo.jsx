import React from 'react'

const promos = [
  { title: 'Banner Saldo Gratis', img: 'banner-1.png', alt: 'banner saldo gratis' },
  { title: 'Listrik', img: 'banner-2.png', alt: 'listrik' },
  { title: 'Pulsa', img: 'banner-3.png', alt: 'pulsa' },
  { title: 'PDAM', img: 'banner-4.png', alt: 'pdam' },
  { title: 'PGN', img: 'banner-5.png', alt: 'pgn' },
]

function Promo() {
  return (
    <div>
      <div className="font-semibold mb-5">
        Temukan promo menarik
      </div>
      <div className='max-w-full overflow-auto flex items-start justify-between gap-x-3 md:gap-x-6 scrollbar'>
        {promos?.map((promo) => (
          <div key={promo.img} className="flex flex-col items-center w-4/12 md:w-3/12 xl:w-[18%] flex-shrink-0">
            <img src={promo.img} alt={promo.alt} className='w-full' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Promo