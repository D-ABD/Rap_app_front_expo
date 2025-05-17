
# 🛠️ Adaptation de My-Evol-UI à une nouvelle API Django

Ce guide explique comment adapter ce projet **React Native + Expo** (`My-Evol-UI`) pour qu’il serve d’interface utilisateur (UI) à une autre application Django, différente de celle d'origine.

---

## 📁 Structure du projet (rappel)

Le cœur de la logique d’interfaçage avec l’API se trouve dans :
```
src/
├── api/
│   ├── axios.ts          # baseURL via .env
│   └── client.ts         # intercepteur pour token JWT
├── contexts/AuthContext.tsx  # login/logout via /token/
├── screens/              # Login, Dashboard, Journal, etc.
```

---

## ✅ Étapes pour adapter à une **autre API Django**

---

### 1. 🔄 Modifier l’URL de l’API dans le fichier `.env`
Crée ou modifie `.env` à la racine du projet :

```env  
API_URL=https://nouvelle-api-django.com/api
```

L’instance Axios sera automatiquement configurée via `src/api/axios.ts` et `client.ts`.

---

### 2. 🔐 Authentification : `/token/`
Ton app s'attend à un endpoint `POST /token/` (type JWT) avec :
```json
{ "email": "...", "password": "..." }
```

💡 Si ta nouvelle API utilise `/api/token/` ou un autre chemin :
- adapte `AuthContext.tsx` dans la fonction `login()`.
- ou fais une redirection serveur côté Django avec DRF.

---

### 3. 👤 Profil utilisateur : `/api/me/`
L’écran `UserScreen.tsx` appelle :
```ts
client.get('/api/me/')
```

Adapte ce chemin dans `UserScreen` si la nouvelle API utilise une route différente (ex : `/users/me/`, `/profile/`, etc.).

---

### 4. 🧪 Test de token : `/test-token/`
L’écran `TestScreen.tsx` appelle :
```ts
client.get('/test-token/')
```
⚠️ Ce point est utile uniquement en développement.

---

### 5. 🧱 Autres endpoints à adapter (si besoin)
Selon les écrans actifs, ces routes peuvent être appelées :

| Écran                | Endpoint attendu (par défaut)           |
|----------------------|-----------------------------------------|
| ObjectifsScreen      | `/objectives/`                          |
| StatsScreen          | `/stats/` ou `/user/stats/`             |
| JournalScreen        | `/journal/`                             |
| Notifications        | Non implémenté dynamiquement (modale statique) |
| Logout               | Supprime juste le token (pas d’appel API) |

🔧 Modifie les appels dans chaque écran (`screens/*.tsx`) selon les routes de ta nouvelle API.

---

### 6. 🔁 Navigation conditionnelle (token ou pas)

Le fichier `src/navigation/AppNavigator.tsx` affiche :
- `WelcomeScreen` (public)
- `LoginScreen` si `token === null`
- `myappApp` si connecté

Pas besoin d’adapter cette logique, elle est universelle tant que le `login()` stocke le token JWT.

---

## ✅ En résumé

| À changer / vérifier         | Où ?                        |
|-----------------------------|-----------------------------|
| URL de base de l'API        | `.env` → `API_URL=...`      |
| Route `/token/` (login JWT) | `src/contexts/AuthContext.tsx` |
| Route `/api/me/`            | `src/screens/UserScreen.tsx` |
| Routes perso (objectifs…)   | `src/screens/*.tsx`         |

---

## 🧪 Tester l'intégration

```bash
# Lancer en mode dev
npx expo start
```

→ Vérifie que :
- Le login fonctionne avec l'email/mot de passe
- Le token est bien stocké dans AsyncStorage
- Le header change dynamiquement (icône user, bouton logout)
- Les appels API affichent bien les données du nouvel utilisateur

---

## ✨ Bonus : conseils Django

Pour que cette UI fonctionne immédiatement, expose ces endpoints dans ton nouveau projet Django :

```python
urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view()),         # login JWT
    path("api/me/", views.UserMeView.as_view()),               # profil utilisateur
    path("test-token/", views.TestTokenView.as_view()),        # test token (dev)
    path("objectives/", ObjectiveViewSet.as_view({'get': 'list'})),  # objectifs
    # ... autres viewsets
]
```

---

## 💬 Besoin d'aide ?
Tu peux me fournir l’arborescence ou la doc de ta nouvelle API Django, et je t’aiderai à mapper automatiquement les endpoints côté UI.
