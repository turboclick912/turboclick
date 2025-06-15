// TurboClick - Página web con suscripción y publicación de vehículos + buscador IA

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TurboClick() {
  const [subscribed, setSubscribed] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSubscribe = () => {
    window.location.href = "https://paypal.me/turboclick/5";
  };

  const handleSellClick = () => {
    if (!subscribed) {
      const confirmSub = window.confirm(
        "¿Has pagado la suscripción de 5€ en PayPal? Si es así, pulsa Aceptar para continuar."
      );
      if (confirmSub) setSubscribed(true);
    } else {
      setFormVisible(true);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVehicles([...vehicles, formData]);
    setFormData({ brand: "", model: "", description: "", price: "", imageUrl: "" });
    setFormVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const mockDatabase = [
      {
        brand: "Toyota",
        model: "Corolla",
        pros: "Fiabilidad, bajo consumo",
        cons: "Problemas en sensores de oxígeno",
      },
      {
        brand: "BMW",
        model: "320d",
        pros: "Prestaciones, confort",
        cons: "Problemas en la EGR y turbo en modelos antiguos",
      },
      {
        brand: "Yamaha",
        model: "MT-07",
        pros: "Ligera, divertida, económica",
        cons: "Suspensión blanda, asiento incómodo en viajes largos",
      },
    ];
    const result = mockDatabase.find(
      (v) => `${v.brand} ${v.model}`.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(result || { notFound: true });
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">TurboClick</h1>
      <p className="text-lg mb-6">Todo sobre coches y motos. Consulta modelos, fallos comunes y ventajas. Suscríbete por solo 5 €/mes para publicar tu vehículo en venta.</p>

      <div className="mb-6">
        <Button onClick={handleSubscribe}>Suscribirse por 5 €/mes</Button>
      </div>

      <div className="mb-8">
        <Button onClick={handleSellClick}>Publicar un vehículo en venta</Button>
      </div>

      {formVisible && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Formulario de publicación</h3>
          <Input name="brand" placeholder="Marca" value={formData.brand} onChange={handleInputChange} required />
          <Input name="model" placeholder="Modelo" value={formData.model} onChange={handleInputChange} required />
          <Textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleInputChange} required />
          <Input name="price" placeholder="Precio (€)" type="number" value={formData.price} onChange={handleInputChange} required />
          <Input name="imageUrl" placeholder="URL de imagen del vehículo" value={formData.imageUrl} onChange={handleInputChange} required />
          <Button type="submit">Publicar</Button>
        </form>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Vehículos en venta</h2>
        {vehicles.length === 0 && <p>No hay vehículos publicados aún.</p>}
        {vehicles.map((v, i) => (
          <Card key={i} className="mb-4">
            <CardContent className="space-y-2">
              <img src={v.imageUrl} alt="vehículo" className="w-full h-48 object-cover rounded" />
              <p><strong>Marca:</strong> {v.brand}</p>
              <p><strong>Modelo:</strong> {v.model}</p>
              <p><strong>Precio:</strong> {v.price} €</p>
              <p>{v.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Buscador de vehículos</h2>
        <div className="mb-4 flex gap-2">
          <Input value={search} onChange={handleSearchChange} placeholder="Ejemplo: Toyota Corolla o Yamaha MT-07" />
          <Button onClick={handleSearch}>Buscar</Button>
        </div>
        {searchResult && !searchResult.notFound && (
          <Card className="mb-4">
            <CardContent>
              <p>🚗 <strong>{searchResult.brand} {searchResult.model}</strong></p>
              <p>✅ Ventajas: {searchResult.pros}</p>
              <p>⚠️ Fallos comunes: {searchResult.cons}</p>
            </CardContent>
          </Card>
        )}
        {searchResult?.notFound && (
          <p>No se encontró información sobre ese modelo. Prueba con otro.</p>
        )}
      </section>
    </main>
  );
}
