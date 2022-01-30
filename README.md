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

Démarrer le serveur local :

```clike
ionic serve
```

## Guide d’utilisation

Si vous utilisez l’application dans votre navigateur, nous vous recommandons fortement de mettre votre navigateur en mode responsive, appuyer sur CTRL + Shift + M (Firefox / Chrome).

### Création de compte

La première étape est de vous logger, cliquer sur registration pour créer un compte et ensuite connectez vous. Attention, l’application est un version beta et donc la réinitialisation des mot-de-passes n’est pas encore possible. Contactez un admin en cas de problème.![](https://lh5.googleusercontent.com/5fjtY1ay9ACApGy4yAesnyAGKc36sT80k7mYvx2wGVdksqSB68vnBruyiqWHAmxG8om-EVrg_pruiduZXl78_Vz3GlMVdcK2VP6fDhdM2j79y0Cwmg6ajOD3WksGUYoYzbLBGzR1)

Une fois connecté vous arrivez sur la page d'accueil, avec l’affichage de la carte selon votre ![](https://lh3.googleusercontent.com/2yxLV0epiRiexi3NkLliH2BWlpZN0-ae0Nw50uW1C9wqe-9YZgYyVP0w777u1Ug4nLw8osLBpk56uazkJxpg9zoMuI3r4jhWLnnP2nR1yXJBuoOuOekN59iot2cEYqrwC4pH_PSF)localisation. Vous pouvez maintenant parcourir les points de ventes, via la carte ou la liste, rechercher un item spécifique, ou accéder à votre compte pour créer des points de vente et des items.

Recherche items

Pour rechercher un item spécifique, il suffit d’appuyer sur la barre de recherche et ensuite soit taper le nom de l’item ou filtrer par prix et / ou catégories la liste de tous les items :

![](https://lh3.googleusercontent.com/CsW8jadkKE5YxhvdNb_16zVbrvja02tLuoIbnCaAW5Guh2eSAjLkfyRYH9WaZTOlZAwqLizpTIrwLRkymwgW3dmXh50kwvCaSsAl2Pkg-3B9xdAguVJjt4zmZlWTvffmhSSCWrbj)

Appuyer ensuite sur l’item pour bouger la carte vers son point de vente et ouvrir les détails de celui-ci.

Mon profil

Pour accéder à votre profil, appuyé sur le logo ![](https://lh3.googleusercontent.com/4Fz2LKRBCrYs6Zx7QTo1dJxva5KQa2D2TvLa2GNeN8ovASZPps7K5n6whcZQDUEwtg5riVQ9zpUhc9fxeyzMg-ThVjkl1IO3kUjdW4QEJLrMAuA812QE3ncUZle6BfE051rlK-X6) vous accéder maintenant à la liste des items et des points de ventes que vous avez créé, vous pouvez depuis cette page modifier vos items et les supprimer. Si vous cliquer sur l’item vous accéder à sa description