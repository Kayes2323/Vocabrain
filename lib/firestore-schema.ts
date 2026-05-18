// Firestore Database Schema & Rules Documentation
// This file documents the complete schema structure for Vocabrain Premium

/*
FIRESTORE COLLECTIONS STRUCTURE
================================

1. USERS Collection
-------------------
Path: /users/{uid}
Purpose: Store user profile and subscription info

Document Structure:
{
  uid: string,
  email: string,
  displayName: string,
  createdAt: timestamp,
  lastLogin: timestamp,
  subscriptionId: string,
  isPremium: boolean,
  adminAccess: boolean,
  preferences: {
    favoriteWords: array<string>,
    studyReminders: boolean,
    theme: 'light' | 'dark'
  }
}


2. SUBSCRIPTIONS Collection
----------------------------
Path: /subscriptions/{subscriptionId}
Purpose: Track user subscriptions and payments

Document Structure:
{
  subscriptionId: string,
  userId: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  plan: 'monthly' | 'yearly' | 'free',
  status: 'active' | 'inactive' | 'cancelled' | 'expired',
  currentPeriodStart: timestamp,
  currentPeriodEnd: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp,
  autoRenew: boolean,
  cancellationDate: timestamp | null,
  price: number,
  currency: 'USD'
}


3. USER_PROGRESS Collection
---------------------------
Path: /user_progress/{progressId}
Purpose: Track vocabulary learning progress per user

Document Structure:
{
  progressId: string,
  userId: string,
  bandLevel: 6 | 7 | 8 | 9,
  wordsSeen: number,
  wordsLearned: number,
  correctAnswers: number,
  totalAttempts: number,
  averageScore: number,
  estimatedBandScore: number,
  timeSpent: number (in minutes),
  lastStudyDate: timestamp,
  streakDays: number,
  createdAt: timestamp,
  updatedAt: timestamp,
  wordDetails: {
    [wordId: string]: {
      attempts: number,
      correct: number,
      lastSeen: timestamp,
      difficulty: 1-5
    }
  }
}


4. FAVORITE_WORDS Collection
-----------------------------
Path: /favorite_words/{favoriteId}
Purpose: Store user's favorite words for quick review

Document Structure:
{
  favoriteId: string,
  userId: string,
  wordId: string,
  word: string,
  bandLevel: number,
  addedAt: timestamp,
  reviewCount: number,
  lastReviewDate: timestamp
}


5. VOCABULARY Collection (Admin Only)
--------------------------------------
Path: /vocabulary/{wordId}
Purpose: Store all IELTS vocabulary words

Document Structure:
{
  wordId: string,
  word: string,
  pronunciation: string,
  definition: string,
  example: string,
  synonyms: array<string>,
  antonyms: array<string>,
  partOfSpeech: string,
  bandLevel: 6 | 7 | 8 | 9,
  category: string,
  memoryTip: string,
  exampleSentence: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  createdBy: string (admin uid)
}


6. PAYMENT_HISTORY Collection
------------------------------
Path: /payment_history/{paymentId}
Purpose: Track all payment transactions

Document Structure:
{
  paymentId: string,
  userId: string,
  amount: number,
  currency: 'USD',
  status: 'success' | 'failed' | 'pending',
  planType: 'monthly' | 'yearly',
  stripePaymentIntentId: string,
  createdAt: timestamp,
  updatedAt: timestamp
}


FIRESTORE SECURITY RULES
========================

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isSignedIn() && 
             request.auth.token.email == 'aakayes99@gmail.com';
    }
    
    function isOwner(uid) {
      return isSignedIn() && request.auth.uid == uid;
    }
    
    function hasPremium() {
      return isSignedIn() &&
             get(/databases/$(database)/documents/subscriptions/$(request.auth.uid))
               .data.status == 'active';
    }
    
    // Users Collection
    match /users/{uid} {
      allow read: if isOwner(uid);
      allow create: if isSignedIn() && isOwner(uid);
      allow update: if isOwner(uid);
      allow delete: if isOwner(uid);
    }
    
    // Subscriptions Collection
    match /subscriptions/{subscriptionId} {
      allow read: if isSignedIn() && 
                     (isOwner(resource.data.userId) || isAdmin());
      allow create: if isSignedIn();
      allow update: if isAdmin() || 
                       (isSignedIn() && isOwner(resource.data.userId));
      allow delete: if isAdmin();
    }
    
    // User Progress Collection
    match /user_progress/{progressId} {
      allow read: if isSignedIn() && 
                     (isOwner(resource.data.userId) || isAdmin());
      allow create: if isSignedIn();
      allow update: if isSignedIn() && 
                       (isOwner(resource.data.userId) || isAdmin());
      allow delete: if isAdmin();
    }
    
    // Favorite Words Collection
    match /favorite_words/{favoriteId} {
      allow read: if isSignedIn() && 
                     (isOwner(resource.data.userId) || isAdmin());
      allow create: if isSignedIn();
      allow update: if isSignedIn() && 
                       (isOwner(resource.data.userId) || isAdmin());
      allow delete: if isSignedIn() && 
                       (isOwner(resource.data.userId) || isAdmin());
    }
    
    // Vocabulary Collection (Public Read, Admin Write)
    match /vocabulary/{wordId} {
      allow read: if true; // Public read for all users
      allow create: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Payment History Collection
    match /payment_history/{paymentId} {
      allow read: if isSignedIn() && 
                     (isOwner(resource.data.userId) || isAdmin());
      allow create: if isSignedIn();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
  }
}


DATABASE INITIALIZATION STEPS
=============================

1. Create Collections in Firebase Console:
   - users
   - subscriptions
   - user_progress
   - favorite_words
   - vocabulary
   - payment_history

2. Set Security Rules:
   - Go to Firestore Database > Rules
   - Replace the default rules with the rules above
   - Click Publish

3. Add Default Admin User:
   Collection: users
   Document ID: (Firebase UID of aakayes99@gmail.com)
   Fields:
   {
     uid: string,
     email: 'aakayes99@gmail.com',
     displayName: 'Admin',
     createdAt: timestamp,
     subscriptionId: 'admin_free',
     isPremium: true,
     adminAccess: true
   }

4. Create Admin Subscription:
   Collection: subscriptions
   Document ID: 'admin_free'
   Fields:
   {
     subscriptionId: 'admin_free',
     userId: (admin uid),
     plan: 'free',
     status: 'active',
     isPremium: true,
     createdAt: timestamp
   }
*/

export const FIRESTORE_SCHEMA = {
  collections: {
    users: 'users',
    subscriptions: 'subscriptions',
    userProgress: 'user_progress',
    favoriteWords: 'favorite_words',
    vocabulary: 'vocabulary',
    paymentHistory: 'payment_history',
  },
};

// Type definitions for TypeScript
export interface FirestoreUser {
  uid: string;
  email: string;
  displayName: string;
  createdAt: any;
  lastLogin: any;
  subscriptionId: string;
  isPremium: boolean;
  adminAccess: boolean;
  preferences?: {
    favoriteWords: string[];
    studyReminders: boolean;
    theme: 'light' | 'dark';
  };
}

export interface FirestoreSubscription {
  subscriptionId: string;
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan: 'monthly' | 'yearly' | 'free';
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  currentPeriodStart?: any;
  currentPeriodEnd?: any;
  createdAt: any;
  updatedAt: any;
  autoRenew?: boolean;
  cancellationDate?: any;
  price: number;
  currency: string;
}

export interface FirestoreUserProgress {
  progressId: string;
  userId: string;
  bandLevel: 6 | 7 | 8 | 9;
  wordsSeen: number;
  wordsLearned: number;
  correctAnswers: number;
  totalAttempts: number;
  averageScore: number;
  estimatedBandScore: number;
  timeSpent: number;
  lastStudyDate?: any;
  streakDays: number;
  createdAt: any;
  updatedAt: any;
  wordDetails?: Record<string, any>;
}
