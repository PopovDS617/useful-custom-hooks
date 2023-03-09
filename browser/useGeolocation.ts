import React, { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState({
    latitude: null,
    longitude: null,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError('Geolocation is not allowed');
      return;
    }
    const onSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude);
      setCoords({ latitude, longitude });
    };

    const onError = (error) => {
      setError(error.message);
    };

    geo.getCurrentPosition(onSuccess, onError);
  }, []);

  return { coords, error };
};
