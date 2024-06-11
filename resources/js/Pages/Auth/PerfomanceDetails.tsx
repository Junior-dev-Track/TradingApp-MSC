// Importation des hooks useState, useEffect et du composant React de base.
import React, { useState, useEffect } from 'react';
// Importation d'axios pour les requêtes HTTP.
import axios from 'axios';

// Définition des props attendus par le composant PerformanceDetails.
interface PerformanceDetailsProps {
  assetId: string;
}

// Définition du type des données de performance.
interface PerformanceData {
  date: string;
  value: number;
}

// Composant fonctionnel PerformanceDetails qui prend un assetId comme prop.
const PerformanceDetails: React.FC<PerformanceDetailsProps> = ({ assetId }) => {
  // Déclaration des états pour les données de performance, le chargement et les erreurs.
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Utilisation de useEffect pour charger les données de performance lors du montage du composant.
  useEffect(() => {
    // Requête GET à l'API pour récupérer les performances en fonction de l'assetId.
    axios.get(`/api/performances/${assetId}`)
      .then(response => {
        setPerformanceData(response.data);  // Mise à jour des données de performance.
        setLoading(false);                  // Arrêt du chargement.
      })
      .catch(error => {
        setError('Error fetching performance data'); // Gestion des erreurs.
        setLoading(false);
      });
  }, [assetId]); // L'effet dépend de la valeur d'assetId.

  // Gestion de l'affichage pendant le chargement des données.
  if (loading) return <p>Loading...</p>;
  // Gestion de l'affichage en cas d'erreur.
  if (error) return <p className="text-red-500">{error}</p>;

  // Affichage des détails de performance sous forme de liste si aucune erreur et chargement terminé.
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold">Performance Details</h2>
      {performanceData.map((data, index) => (
        <div key={index} className="p-2">
          <p>{data.date}: {data.value}</p>
        </div>
      ))}
    </div>
  );
};

// Exportation par défaut du composant PerformanceDetails pour utilisation dans d'autres parties de l'application.
export default PerformanceDetails;
