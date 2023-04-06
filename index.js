const axios = require('axios');
const getRepos = async ({
  username = 'myogeshchavan97',
  page = 1,
  per_page = 30
} = {}) => {
  try {
    const repos = await axios.get(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`
    );
    return repos.data
      .map((repo) => {
        return {
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          stars: repo.stargazers_count
        };
      })
      .sort((first, second) => second.stars - first.stars);
  } catch (error) {
    return [];
  }
};

// getRepos({
//     username: 'gaearon',
//     page: 1,
// }).then((repositories) => console.log(repositories));

module.exports = { getRepos }; // équivalent à module.exports = { getRepos: getRepos };
// exporter la function getRepos comme la propriété d’un objet, comme ça si plus tard vous voulez exporter n’importe quelle autre fonction vous pourrez facilement l’ajouter à l’objet

// npm link : Exécuter cette commande crée un lien symbolique pour votre paquet, à l’intérieur du dossier global node_modules (le même dossier où vos dépendances npm globales ont été installées)
