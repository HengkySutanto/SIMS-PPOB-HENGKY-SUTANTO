import React from 'react'
import { useNavigate } from 'react-router-dom'

const dummyServices = [
  {
    service_code: "PAJAK",
    service_name: "Pajak PBB",
    service_icon: "pbb-1.png",
    service_tariff: 40000
  },
  {
    service_code: "PLN",
    service_name: "Listrik",
    service_icon: "listrik-1.png",
    service_tariff: 10000
  },
  {
    service_code: "PDAM",
    service_name: "PDAM Berlangganan",
    service_icon: "pdam-1.png",
    service_tariff: 40000
  },
  {
    service_code: "PULSA",
    service_name: "Pulsa",
    service_icon: "pulsa-1.png",
    service_tariff: 40000
  },
  {
    service_code: "PGN",
    service_name: "PGN Berlangganan",
    service_icon: "pgn-1.png",
    service_tariff: 50000
  },
  {
    service_code: "MUSIK",
    service_name: "Musik Berlangganan",
    service_icon: "musik-1.png",
    service_tariff: 50000
  },
  {
    service_code: "TV",
    service_name: "TV Berlangganan",
    service_icon: "televisi-1.png",
    service_tariff: 50000
  },
  {
    service_code: "PAKET_DATA",
    service_name: "Paket data",
    service_icon: "paket-data.png",
    service_tariff: 50000
  },
  {
    service_code: "VOUCHER_GAME",
    service_name: "Voucher Game",
    service_icon: "game-1.png",
    service_tariff: 100000
  },
  {
    service_code: "VOUCHER_MAKANAN",
    service_name: "Voucher Makanan",
    service_icon: "voucher-makanan.png",
    service_tariff: 100000
  },
  {
    service_code: "QURBAN",
    service_name: "Qurban",
    service_icon: "kurban-1.png",
    service_tariff: 200000
  },
  {
    service_code: "ZAKAT",
    service_name: "Zakat",
    service_icon: "zakat-1.png",
    service_tariff: 300000
  }
]

function Services({ services }) {
  const navigate = useNavigate()
  return (
    <div className='max-w-full overflow-auto flex items-start justify-between gap-x-6 scrollbar'>
      {dummyServices?.map((service) => (
        <div key={service.service_icon} className="flex flex-col items-center w-10 md:w-14 xl:w-18 flex-shrink-0" onClick={() => navigate(`/payment?code=${service.service_code}&service_name=${service.service_name}&tarif=${service.service_tariff}&icon=${service.service_icon}`)}>
          <img src={`/${service.service_icon}`} alt={service.service_name} className='w-10 md:w-14 xl:w-18' />
          <div className="text-xs md:text-sm text-wrap text-center">
            {service.service_name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Services