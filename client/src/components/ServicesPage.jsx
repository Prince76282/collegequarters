import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from "../utils/key";
import { FaSearch, FaMapMarkerAlt, FaPhone, FaDollarSign, FaTag } from 'react-icons/fa';

const ServiceFilter = ({ filters, handleFilterChange }) => {
  return (
    <div className="my-4">
      <label htmlFor="serviceType" className="block text-lg font-medium text-gray-700">
        Service Type
      </label>
      <select
        name="serviceType"
        value={filters.serviceType}
        onChange={handleFilterChange}
        className="p-3 mt-1 border border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
      >
        <option value="">All Services</option>
        <option value="Electrician">Electrician</option>
        <option value="Home Cleaner">Home Cleaner</option>
        <option value="Plumber">Plumber</option>
        <option value="Laundry">Laundry</option>
      </select>
    </div>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        src={service.imageUrl || 'https://via.placeholder.com/150'}
        alt={service.name || 'No name available'}
        className="w-full h-48 object-cover mb-4 rounded-t-lg"
      />
      <h3 className="text-xl font-semibold mb-2">{service.name || 'No name available'}</h3>
      <div className="flex items-center mb-1 text-gray-600">
        <FaPhone className="mr-2" />
        <p>{service.phone || 'No phone available'}</p>
      </div>
      <div className="flex items-center mb-1 text-gray-600">
        <FaMapMarkerAlt className="mr-2" />
        <p>{service.address || 'No address available'}</p>
      </div>
      <div className="flex items-center mb-1 text-gray-600">
        <FaDollarSign className="mr-2" />
        <p>${service.price !== undefined ? service.price : 'No price available'}</p>
      </div>
      <div className="flex items-center text-gray-600">
        <FaTag className="mr-2" />
        <p>{service.serviceType || 'No service type available'}</p>
      </div>
    </div>
  );
};

const ServicePage = () => {
  const [filters, setFilters] = useState({
    serviceType: '',
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services`);
        setServices(response.data);
      } catch (error) {
        setError('Error fetching services.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    if (!service || typeof service.serviceType === 'undefined') return false;

    const serviceType = service.serviceType.toLowerCase();
    const filterType = filters.serviceType ? filters.serviceType.toLowerCase() : '';

    return filterType ? serviceType === filterType : true;
  });

  return (
    <div className="container mx-auto p-6 mt-12">
      <ServiceFilter filters={filters} handleFilterChange={handleFilterChange} />

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <p className="text-center text-gray-600">No services available for this filter</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicePage;
