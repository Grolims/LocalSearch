# LocalSearch

Local-Search est une application créée par 3 étudiants de la HEIG-VD. L’application propose une plateforme d’échange pour les agriculteurs sur laquelle ils peuvent publier leurs points de ventes et les produits associés.

L’application a été construite avec les frameworks Ionic & Angular, reposant sur un API REST Express / Nodejs spécialement réalisée pour ce projet . Ce projet a été fait dans le cadre des cours ArchiOWeb et DevMobil.

**Etat des lieux :**

Actuellement l’application permet d’effectuer plusieurs actions:

- Créer des points de ventes et des items

- Modifier et supprimer des items

- Afficher de manière intéractive sur une carte les points de ventes et les items

- Lister les point de ventes et les items

- Filtrer les items de manières dynamique 

- Modifier ou supprimer les items.

L’application n’étant pas encore publiée sur les stores Android et Apple, voici un guide pour la tester en local sur votre pc.

## Démarrage

Cloner le repo

Si vous désirez utiliser l’application commencer par cloner le repo dans votre répertoire actuel :

```cli
git clone https://github.com/Grolims/LocalSearch.git
```

Installer les dépendances :

```clike
cd LocalSearch
npm install
```

Crée un ficher d'environement:

Dans le projet ouvrez le répértoire src/environments/ et créer un fichier environment.ts avec le contenue suivant :

```
export const environment = {
  production: false,

  qimgUrl: "https://comem-qimg.herokuapp.com/api",
  qimgSecret:"votre clé pour l'api",
};
```

Démarrer le serveur local :

```clike
ionic serve
```

## Guide d’utilisation

Si vous utilisez l’application dans votre navigateur, nous vous recommandons fortement de mettre votre navigateur en mode responsive, appuyer sur CTRL + Shift + M (Firefox / Chrome).

### Création de compte

La première étape est de vous logger, cliquer sur registration pour créer un compte et ensuite connectez vous. Attention, l’application est un version beta et donc la réinitialisation des mot-de-passes n’est pas encore possible. Contactez un admin en cas de problème.![](https://lh5.googleusercontent.com/5fjtY1ay9ACApGy4yAesnyAGKc36sT80k7mYvx2wGVdksqSB68vnBruyiqWHAmxG8om-EVrg_pruiduZXl78_Vz3GlMVdcK2VP6fDhdM2j79y0Cwmg6ajOD3WksGUYoYzbLBGzR1)

Une fois connecté vous arrivez sur la page d'accueil, avec l’affichage de la carte selon votre localisation. Lors du clic sur un point de vente dans la liste, la carte se centre sur ce dernier.


<img src="https://lh6.googleusercontent.com/-E0J_N-rfXG2VWE47fGEvq2zHvjWoHzzDxGk62rg989mCqmBE0pUu3pdJWWzrJJZIOx_ky36cuTeW0iUrqHi7HeTwUYmGiIOZ6H1ZiXgYpo6E_Dib6hlpMG_4zAOCUVvCfXkJuVc" alt="img" style="zoom: 67%;" />

Vous pouvez maintenant parcourir les points de ventes, via la carte ou la liste, rechercher un produit spécifique, ou accéder à votre compte pour créer des points de vente et des produits.



Recherche de produits 

Pour rechercher un produit spécifique, il suffit d’appuyer sur la barre de recherche et ensuite soit taper le nom du produit ou filtrer par prix et / ou catégories la liste affichée.

<img src="https://lh3.googleusercontent.com/S8Hi7Ysk2gX19SRV5OzpXxFZQP846nicKsapbXM1UIVQwR858W6cSAbkPxuyQaq-3Cahdvd0DQFIALQGUHXpK2vRd-Vib4s2RCop0I6ZF9UeEbE9BoaQSmKt1a9E8tnGDRAUY6w_" alt="img" style="zoom: 50%;" />

Appuyer ensuite sur celui-ci pour ouvrir les détails et si vous désirez connaître sa position, appuyez sur le point de vente.

Mon profil

Pour accéder à votre profil, appuyé sur le logo. <img src="https://lh3.googleusercontent.com/Zv0uGW7Cs4dmGmatMfkYgf0m9JjdipTbJphGPjuBC4G0OaWy81RNrLG603duoLKd2TA6oYPm0qkbzBo7g1OlwRp0ZVsIMAaoKwjxXb8M9KaL5pSM5mq3p3w7lmLH4LFqXpQJbgXQ" alt="img" style="zoom: 50%;" /> Vous accédez maintenant à la liste des produits et des points de ventes que vous avez créés. Vous pouvez depuis cette page modifier vos produits ou les supprimer. Si vous appuyez sur le poduit, vous accédez à sa description.

Modification et suppression d’un items

Pour modifier ou supprimer un item il suffit de le slider vers la gauche et appuyez sur supprimer ou modifier selon l’action désirée.

<img src="https://lh6.googleusercontent.com/vkCv51Cd5Sm5XteBa_BsQI-WIvBoHqSIu71X3oou4lRl-IFEJYBJ4_gVM0Dr2wh6-2_mrgmWLyvp14lb2OOxi2wIdvBhKzZXXp9RJfX4JV5N6L-ASXNoG_LWx-baWL-YzdnwOz_q" alt="img" style="zoom: 67%;" />

Le menu de modification est le même que celui de création, il suffit de renseigner les informations à modifier et de valider.

Création point de vente et produit

Pour créer un produit ou un point de vente il suffit d’appuyer sur le bouton correspondant en bas la page et de remplir les champs du formulaire.
<img src="https://lh6.googleusercontent.com/B3SwfHe3htJkgP7-pCUYA0JiMFgEGNOPcfnhq_ow2G2zyBD6D4tob5SvwyeuaYqLqrMvLeWPgghqM71nzX40QbZaN9De7yM9amSfBnMv-o64B-vxH677qj9r7NoTIFx7Y1daFpRk" alt="img" style="zoom:67%;" />




<img src="https://lh5.googleusercontent.com/GWI7lTPqJQbXmVWJgY7Jh-336HSPvb-09pHGz6tWm_JZG7j4t_-HEnsjUCPH3GCapgJ5EbfJ57UVhXFgJMBBH7Z6HDACdsFCpYXAoza2sxUyu18KFHppKHmSSlIqZ6d2yUwk1Qzc" alt="img" style="zoom:67%;" />
Création d'un point de vente

<img src="https://lh4.googleusercontent.com/e9oZCfAa9fON805lzNjLP11wHi1j8szSPOyOEoV1Wm9gJCXb8ktLSL6hoMkzwzkaTtMLEvajsR_vf9LLkw6dF9Z1PhxXYJeuFvBcUciT6xqk8a-jquOb_O_BvAs4aEuIbggn8QAX" alt="img" style="zoom:67%;" />
Création d'un produit
