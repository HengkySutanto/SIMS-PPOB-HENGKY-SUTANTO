import React from 'react'
import { useNavigate } from 'react-router-dom'

function Services({ services }) {
  const navigate = useNavigate()
  return (
    <div className='max-w-full overflow-auto flex items-start justify-between gap-x-6 scrollbar'>
      {services?.map((service) => (
        <div key={service.service_icon} className="flex flex-col items-center w-10 md:w-14 xl:w-18 flex-shrink-0" onClick={() => navigate(`/payment?code=${service.service_code}&service_name=${service.service_name}&tarif=${service.service_tariff}&icon=${service.service_icon}`)}>
          <img src={`${service.service_icon}`} alt={service.service_name} className='w-10 md:w-14 xl:w-18' />
          <div className="text-xs md:text-sm text-wrap text-center">
            {service.service_name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Services