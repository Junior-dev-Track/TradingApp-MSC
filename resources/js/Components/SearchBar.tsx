// import React, { useState } from "react";
//import { FaSearch } from "react-icons/fa";
//import Api from "../components/Api.js";

{/**const Search = () => {
  const [searchQuery, setSearchQuery] = useState(""); // État pour stocker la requête de recherche
  const [searchResults, setSearchResults] = useState([]); // État pour stocker les résultats de recherche
  const api = new Api(); // Instance de votre classe API pour effectuer des recherches

  // Gérer les changements dans l'entrée de recherche
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value); // Mettre à jour la requête de recherche avec la valeur de l'entrée
  };

  // Fonction pour effectuer une recherche lorsque l'utilisateur appuie sur Entrée ou clique sur le bouton de recherche
const handleSearch = async (event) => {
    event.preventDefault(); // Empêcher le comportement de soumission par défaut du formulaire
    const response = await api.searchMovie(searchQuery, "en-US", 1, false); // Appel à l'API pour rechercher des films
    setSearchResults(response.results); // Mettre à jour les résultats de recherche avec la réponse de l'API
  };

  // Gérer les événements de touche sur l'entrée de recherche
  const handleInputKeyUp = async (event) => {
    if (event.key === "Enter") { // Vérifier si la touche appuyée est "Enter"
      await handleSearch(); // Exécuter la recherche
    }
  };

  return (
    <>
      {/* Section pour la barre de recherche */}
      {/**<section className="Container">
        <div className="search-box">
          <div className="container-box">
            <form onSubmit={handleSearch}> {/* Ajoutez onSubmit ici */}
             {/**  <div className="search">
                <button type="submit"> {/* Changez ce bouton en type "submit" pour soumettre le formulaire */}
                 {/**  <FaSearch />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleInputChange}
                  value={searchQuery}
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Section pour afficher les résultats de recherche */}
      {/**<div className="search-results">
        {/* Mapper à travers les résultats de recherche et les afficher */}
        {/**{searchResults.map((result) => (
          <div className="search-result" key={result.id}>
            {/* Afficher l'image du film */}
           {/**  <img
              src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
              alt={result.title}
            />
            {/* Afficher les détails du film */}
            {/**<div className="film-details">
              <h3>{result.title}</h3>
              {result.release_date && <p>Release Date: {result.release_date}</p>}
              <p>Rating: {result.vote_average}</p>
              {/* Ajoutez d'autres informations du film ici */}
           /**  </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;**/








