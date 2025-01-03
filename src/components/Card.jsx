import React from "react";

function Card({
  name,
  address,
  phone,
  description,
  image,
  country,
  state,
  city,
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:scale-105 transform transition-all duration-300 max-w-xs mx-auto">
      {image && (
        <div className="relative w-full h-48">
          <img
            src={`https://pruebatest.xyz/storage/${image}`}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      <div className="p-4 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Dirección:</span> {address}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Teléfono:</span> {phone}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">País:</span> {country}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Estado:</span> {state}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Ciudad:</span> {city}
        </p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}

export default Card;
