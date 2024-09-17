import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { FaRupeeSign, FaMapMarkerAlt, FaBed, FaBath } from 'react-icons/fa';

const HomeDetail = () => {
  const { id } = useParams(); 
  const [home, setHome] = useState(null);
  const [relatedHomes, setRelatedHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try { 
        const response = await axios.get(`http://localhost:5000/api/homeListings/${id}`);
        setHome(response.data);

      
        const relatedResponse = await axios.get('http://localhost:5000/api/homeListings');
        const related = relatedResponse.data.filter(
          (listing) => listing.area === response.data.area && listing._id !== response.data._id
        );
        setRelatedHomes(related);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHomeDetails();
  }, [id]); 

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!home) return <p className="text-center text-red-500 mt-10">Home not found</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 lg:p-8">
        <div>
          {(home.imageUrls && home.imageUrls.length > 0) || home.videoUrl ? (
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-6 text-gray-800">Gallery</h3>
              <Slider {...sliderSettings} className="relative">
                {home.imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Home Image ${index + 1}`}
                      className="w-full h-auto object-cover rounded-lg"
                      style={{ maxHeight: '80vh' }}
                    />
                  </div>
                ))}
                {home.videoUrl && (
                  <div className="relative">
                    <video className="w-full h-auto object-cover rounded-lg" controls>
                      <source src={home.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </Slider>
            </div>
          ) : (
            <p className="text-center mb-8 text-gray-600">No media available</p>
          )}

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">{home.title}</h2>
            <div className="flex items-center text-gray-600 mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-600" />
              <p>{home.area}</p>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <FaRupeeSign className="mr-2 text-green-600" />
              <p>₹{home.price}</p>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <FaBed className="mr-2 text-yellow-600" />
              <p>{home.beds} Beds</p>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <FaBath className="mr-2 text-purple-600" />
              <p>{home.baths} Baths</p>
            </div>
            <p className="text-gray-600 mb-2"><strong>Home Type:</strong> {home.homeType}</p>
            <p className="text-gray-600 mb-2"><strong>For Rent:</strong> {home.forRent ? "Boy's" : "Girl's"}</p>
            <p className="text-gray-600 mb-2"><strong>Phone No:</strong> {home.phoneNo}</p>
            {home.bargain && <p className="text-green-600 font-semibold">Negotiable</p>}

            {home.amenities && home.amenities.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Amenities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {home.amenities.map((amenity, index) => (
                    <li key={index} className="text-gray-600">{amenity}</li>
                  ))}
                </ul>
              </div>
            )}

            {home.nearbyAreas && home.nearbyAreas.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Nearby Areas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {home.nearbyAreas.map((area, index) => (
                    <li key={index} className="text-gray-600">{area}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {relatedHomes.length > 0 && (
            <div className="mb-10">
              <h3 className="text-3xl font-bold mb-6 text-gray-800">Related Homes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedHomes.map((relatedHome) => (
                  <div key={relatedHome._id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={relatedHome.imageUrls[0]}
                      alt={`Related Home ${relatedHome._id}`}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                      style={{ maxHeight: '200px' }}
                    />
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{relatedHome.title}</h4>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      <p>{relatedHome.area}</p>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaRupeeSign className="mr-2 text-green-600" />
                      <p>₹{relatedHome.price}</p>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaBed className="mr-2 text-yellow-600" />
                      <p>{relatedHome.beds} Beds</p>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaBath className="mr-2 text-purple-600" />
                      <p>{relatedHome.baths} Baths</p>
                    </div>
                    <a
                      href={`/home/${relatedHome._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeDetail;
