// Importation de React et de ses hooks nécessaires.
import React, { useState, useEffect } from 'react';
// Importation de la bibliothèque axios pour effectuer des requêtes HTTP.
import axios from 'axios';

// Définition de l'interface des props pour le composant AssetDetails.
interface AssetDetailsProps {
  assetId: string;
}

// Déclaration du composant fonctionnel AssetDetails qui accepte des props conformes à AssetDetailsProps.
const AssetDetails: React.FC<AssetDetailsProps> = ({ assetId }) => {
  // useState pour gérer l'état de l'actif courant, initialisé à null.
  const [asset, setAsset] = useState<any>(null);
  // useState pour gérer l'état de chargement, initialisé à false.
  const [loading, setLoading] = useState(false);
  // useState pour gérer l'état d'erreur, initialisé à null.
  const [error, setError] = useState<string | null>(null);

  // useEffect pour effectuer une action après le rendu du composant, ici une requête à l'API.
  useEffect(() => {
    setLoading(true);  // Commence le chargement
    axios.get(`/api/assets/${assetId}`)  // Envoie une requête GET à l'API
      .then(response => {
        setAsset(response.data);  // Met à jour l'état de l'actif avec les données reçues
        setLoading(false);  // Termine le chargement
      })
      .catch(error => {
        setError('Error fetching asset details');  // Gestion des erreurs
        setLoading(false);
      });
  }, [assetId]);  // Dépendance de l'effet, l'effet s'exécute à nouveau si assetId change

  // Affichage conditionnel pendant le chargement
  if (loading) return <p>Loading...</p>;
  // Affichage conditionnel en cas d'erreur
  if (error) return <p className="text-red-500">{error}</p>;

  // Rendu du composant avec les détails de l'actif
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold">{asset?.name}</h1>  // Utilisation de l'opérateur optionnel pour éviter une erreur si asset est null
      <p className="text-gray-600">{asset?.description}</p>
      {/* Autres détails de l'actif peuvent être ajoutés ici */}
    </div>
  );
};

// Exportation du composant pour qu'il puisse être utilisé ailleurs dans l'application
export default AssetDetails;
