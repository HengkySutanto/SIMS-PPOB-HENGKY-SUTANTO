import { useEffect, useState } from "react";
import Promo from "../components/home/Promo";
import Services from "../components/home/Services";
import UserProfile from "../components/home/UserProfile"
import { API_BASE_URL } from "../config/api";

const Home = () => {
  const [banners, setBanners] = useState();
  const [services, setServices] = useState();

  useEffect(() => {
    const fetchBannerNServices = async () => {
      try {
        const [bannerResponse, servicesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/banner`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          }),
          fetch(`${API_BASE_URL}/services`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })
        ]);

        const [bannerData, servicesData] = await Promise.all([
          bannerResponse.json(),
          servicesResponse.json()
        ]);

        if (profileData.status === 0) {
          setBanners(bannerData.data);
        } else {
          console.error('Failed to fetch banner:', profileData.message);
        }

        if (balanceData.status === 0) {
          setServices(servicesData.data);
        } else {
          console.error('Failed to fetch services:', balanceData.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBannerNServices();
  }, []);

  return (
    <div className="container mx-auto p-5 md:p-0 md:py-5 space-y-10">
      <Services services={services} />
      <Promo banners={banners} />
    </div>
  );
};

export default Home; 