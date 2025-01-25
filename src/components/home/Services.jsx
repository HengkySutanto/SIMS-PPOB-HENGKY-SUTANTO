import React from 'react'

const services = [
  { title: 'PBB', img: 'pbb.png', alt: 'pbb' },
  { title: 'Listrik', img: 'listrik.png', alt: 'listrik' },
  { title: 'Pulsa', img: 'pulsa.png', alt: 'pulsa' },
  { title: 'PDAM', img: 'pdam.png', alt: 'pdam' },
  { title: 'PGN', img: 'pgn.png', alt: 'pgn' },
  { title: 'TV Langganan', img: 'televisi.png', alt: 'televisi' },
  { title: 'Musik', img: 'musik.png', alt: 'musik' },
  { title: 'Voucher Game', img: 'game.png', alt: 'voucher game' },
  { title: 'Voucher Makanan', img: 'voucher-makanan.png', alt: 'voucher makanan' },
  { title: 'Kurban', img: 'kurban.png', alt: 'kurban' },
  { title: 'Zakat', img: 'zakat.png', alt: 'zakat' },
  { title: 'Paket Data', img: 'paket-data.png', alt: 'paket data' },
]

function Services() {
  return (
    <div className='max-w-full overflow-auto flex items-start justify-between gap-x-6 scrollbar'>
      {services?.map((service) => (
        <div key={service.img} className="flex flex-col items-center w-10 md:w-14 xl:w-18 flex-shrink-0">
          <img src={service.img} alt={service.alt} className='w-10 md:w-14 xl:w-18' />
          <div className="text-xs md:text-sm text-wrap text-center">
            {service.title}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Services