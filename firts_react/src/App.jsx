// Importe moi les Hooks suivant car je vais m'e servir 
import { useEffect, useState } from 'react'

import './App.css'

function App() {
  // Je creer une variable books avec un setBooks qui me permet de la modifier
  //  et je l'initialise en tant que tableau vide avec useState    
    const [books, setBooks] = useState([]);

    // Me permet d'afficher que les donner sont en cours de chargement 
    // quand setLoading est en "true" donc "vrai" j'ai un message qui s'affiche 'Chargement des livres'
    const [loading, setLoading] = useState("");

    // M'affiche un message d'erreur si une erreur survient mais est initialiser a l'etat NULL 
    const [error, setError] = useState(null);

    // Me permet de rajouter 10 livre a la suite de mes livre existant
    const [offset, setOffset] = useState(0);
    

    // Je declare la viariable limit qui me servira a changer la limit du nombre de livre afficher 
    const limit = 20

    // Mon async function

    async function GetApi() {
      try {
        // Message de chargement
        setLoading("Chargement des livres...")


        // Le fetch me permet d'envoyer une requete HTTP vers mon api et me renvoie une promise 
        // Le await indique a JS : attend de recevoir une response avant de continuer a lire le code
        // Dans mon cas 20 livres vont s'afficher car dans mon url il y "limit=20" mais je peut tres bien le modifier
            const response = await fetch(`https://openlibrary.org/subjects/science.json?limit=${limit}&offset=${offset}`);

            // Traduit le json
            const data = await response.json();

            // envoie les données dans la variable books 
            // grace a prev je garde en memoire l'etat actuelle de books 
            // puis je lui rajoute les livre present dans data.works 
            // les ... sont des pread qui me permettent de decomposer un tableau et de le mettre a l'interieur d'un autre 

              setBooks(prev => [...prev, ...data.works]);

              setOffset(prev => prev + limit); // prépare la prochaine page

            // Dit a mon loading "stop le chargement est fini ne m'affiche plus de message"
            setLoading("")
      }

      // Si une erreur
      catch (error) {
        setError("Impossible de charger les livre")
        setLoading("")
      }
    }
    
    
  // La vue 
  return (
    <>
        <div>
      <h1>Livres de science</h1>

      {/* Quand on clique sur le bouton (onClick) fait appel a la fonction (get api ) */}
      {/* Le bouton s'affiche uniquement si mon tableau est egale a 0 */}
      {books.length > 0 ? "" : <button onClick={GetApi}>Charger mes livres</button>}

      <ul>

        {/* map est une boucle donc je lui dit " fait un map a l'interieur de books '.'
         et appel les element qui ce trouve a l'interieur 'book' " */}
        {books.map((book) => (
          <li key={book.key}>
            <strong>Titre : </strong>{book.title} — <strong>Auteur : </strong>{book.authors[0].name} 
          </li>
        ))}
      </ul>

      {/* Ma condition if avec mon else ":" */}
      <h2> {error != null ? "Erreur :" + error : ""}</h2>

      {/* Mon message de chargement  */}
      <h2>{loading}</h2>
      
      {/* m'affiche le btn qui affiche 20 livres supplementaire uniquement si mon tableau de livre n'est pas egale a 0  */}
      {books.length == 0 ? "" :  <button onClick={GetApi}>Voir plus de livres</button>}
      
    </div>
    </>
  )
}

export default App
