import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SERVICES_URL, ASSESSMENT_REQUEST_URL } from '../../utils/apiEndPoints';
import './Dashboard.css';
import Spinner from "../Spinner/Spinner";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CombinedDashboard = () => {
  const [serviceData, setServiceData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceResponse = await axios.get(SERVICES_URL);
        const bookingResponse = await axios.get(ASSESSMENT_REQUEST_URL);
        setServiceData(serviceResponse.data);
        setBookingData(bookingResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  // Calculate total revenue from services
  const totalRevenue = bookingData.reduce((acc, booking) => {
    const service = serviceData.find((service) => service.serviceId === booking.serviceId);
    return acc + (service ? service.servicePrice * booking.quantities : 0);
  }, 0);

  // Calculate total price based on date received
  const revenueByDate = bookingData.reduce((acc, booking) => {
    const service = serviceData.find((service) => service.serviceId === booking.serviceId);
    const dateReceived = booking.dateReceived;
    if (dateReceived && service) {
      if (!acc[dateReceived]) {
        acc[dateReceived] = 0;
      }
      acc[dateReceived] += service.servicePrice * booking.quantities;
    }
    return acc;
  }, {});

  const dates = Object.keys(revenueByDate);
  const revenues = Object.values(revenueByDate);

  const revenueByDateData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Revenue by Date Received',
        data: revenues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueByDateOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Revenue by Date Received',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Calculate total bookings per service
  const bookingsPerService = serviceData.map((service) => {
    const totalBookings = bookingData.filter((booking) => booking.serviceId === service.serviceId).length;
    return {
      serviceName: service.serviceName,
      totalBookings,
    };
  });

  const serviceNames = bookingsPerService.map((item) => item.serviceName);
  const bookings = bookingsPerService.map((item) => item.totalBookings);

  const bookingsPerServiceData = {
    labels: serviceNames,
    datasets: [
      {
        label: 'Total Bookings per Service',
        data: bookings,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const bookingsPerServiceOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Bookings per Service',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard">
      <h1>Manager Dashboard</h1>
      <div className="total-revenue">
        <h2>Total Revenue: {totalRevenue.toLocaleString()} VND</h2>
      </div>
      <div className="charts">
        <div className="chart-container">
          <Bar data={revenueByDateData} options={revenueByDateOptions} />
        </div>
        <div className="chart-container">
          <Bar data={bookingsPerServiceData} options={bookingsPerServiceOptions} />
        </div>
      </div>
    </div>
  );
};

export default CombinedDashboard;
