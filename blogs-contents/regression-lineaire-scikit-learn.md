---
title: "Comprendre la Régression Linéaire : Les Maths derrières Scikit-Learn"
titleEn: "Understanding Linear Regression: The Math Behind Scikit-Learn"
description: "Une exploration approfondie de la régression linéaire, de la formule mathématique à l'implémentation pratique."
descriptionEn: "An in-depth exploration of linear regression, from the mathematical formula to practical implementation."
excerpt: "Découvrez les mathématiques derrière la régression linéaire et comment scikit-learn implémente cette算法."
excerptEn: "Discover the mathematics behind linear regression and how scikit-learn implements this algorithm."
date: "2024-03-07"
tags: ["Machine Learning", "Python", "Scikit-Learn", "Mathématiques"]
coverColor: "#6366f1"
readTime: 8
---

# Comprendre la Régression Linéaire : Les Maths derrière Scikit-Learn

Quand j'ai commencé à m'intéresser au Machine Learning, la régression linéaire était mon premier contact avec l'apprentissage automatique. C'est simple, puissant, et surtout, ça cache beaucoup de mathématiques intéressantes derrière des bibliothèques comme scikit-learn.

## C'est quoi la Régression Linéaire ?

En quelques mots, la régression linéaire est une méthode qui permet de prédire une valeur continue à partir d'une ou plusieurs variables. Imaginez que vous avez des données sur la superficie des maisons et leurs prix. La régression linéaire va trouver la droite qui meilleur décrit la relation entre ces deux variables.

## La Formule Mathématique

La formule de base de la régression linéaire simple est :

**y = mx + b**

Ou de manière plus formelle :

**y = β₀ + β₁x + ε**

 où :
- **y** est la variable que nous voulons prédire (le prix de la maison)
- **x** est la variable explicative (la superficie)
- **β₀** (bêta zéro) est l'ordonnée à l'origine (intercept)
- **β₁** (bêta un) est le coefficient directeur (slope)
- **ε** (epsilon) est l'erreur

### La Formule avec les Sommes

Pour calculer ces coefficients, on utilise :

**β₁ = Σ(xi - x̄)(yi - ȳ) / Σ(xi - x̄)²**

**β₀ = ȳ - β₁x̄**

 où x̄ et ȳ sont les moyennes des variables.

## Ce que Scikit-Learn Cache

Quand j'ai utilisé scikit-learn pour la première fois, j'étais émerveillé par la simplicité du code :

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

Mais derrière cette simplicité, il y a beaucoup de choses qui se passent :

### 1. Calcul des Coefficients
Scikit-learn résout l'équation normale :
**β = (X^T X)^(-1) X^T y**

Cela utilise la méthode des moindres carrés ordinaires (OLS).

### 2. Régularisation
Pour éviter le surapprentissage, scikit-learn peut ajouter une régularisation :
- **Ridge (L2)** : Ajoute une pénalité sur la magnitude des coefficients
- **Lasso (L1)** : Peut annuler certains coefficients (sélection de features)

### 3. Gestion des Données
La bibliothèque gère automatiquement :
- La mise à l'échelle des données
- Les valeurs manquantes
- Les variables catégorielles

## Mon Implémentation from Scratch

Pour vraiment comprendre, j'ai décidé d'implémenter ma propre version :

```python
class LinearRegression:
    def fit(self, X, y):
        # Calculer les moyennes
        self.x_mean = np.mean(X)
        self.y_mean = np.mean(y)
        
        # Calculer beta_1 (slope)
        numerator = np.sum((X - self.x_mean) * (y - self.y_mean))
        denominator = np.sum((X - self.x_mean) ** 2)
        self.beta_1 = numerator / denominator
        
        # Calculer beta_0 (intercept)
        self.beta_0 = self.y_mean - self.beta_1 * self.x_mean
        
    def predict(self, X):
        return self.beta_0 + self.beta_1 * X
```

## Métriques d'Évaluation

Pour savoir si notre modèle est bon, on utilise plusieurs métriques :

1. **R² (Coefficient de détermination)** : Mesure la proportion de variance expliquée
2. **MSE (Mean Squared Error)** : Moyenne des carrés des erreurs
3. **RMSE (Root MSE)** : Racine carrée du MSE

## Conclusion

Comprendre les mathématiques derrières la régression linéaire m'a vraiment aidé à mieux appréhender le Machine Learning. Ce n'est pas juste une "boîte noire" - c'est un outil puissant qui repose sur des bases mathématiques solides.

La prochaine fois que vous utilisez `LinearRegression()` de scikit-learn, vous saurez exactement ce qui se passe derrière !
