import React from "react";
import Card from "./Card";

function Cards({ branches }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {branches.map((branch, index) => (
        <Card
          key={branch.id || index}
          name={branch.nombre}
          address={branch.direccion}
          phone={branch.telefono}
          image={branch.imagen}
          country={branch.pais}
          state={branch.estado}
          city={branch.ciudad}
          description={branch.descripcion}
        />
      ))}
    </div>
  );
}

export default Cards;
