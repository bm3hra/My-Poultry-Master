// db.js - IndexedDB wrapper for Offline Storage
const DB_NAME = "PoultryMasterDB";
const DB_VERSION = 1;

let db;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // Birds basic info store
      if (!db.objectStoreNames.contains("birds")) {
        db.createObjectStore("birds", { keyPath: "id" });
      }

      // Growth Tracker store
      if (!db.objectStoreNames.contains("growth")) {
        const growthStore = db.createObjectStore("growth", {
          keyPath: "id",
          autoIncrement: true,
        });
        growthStore.createIndex("birdId", "birdId", { unique: false });
      }

      // Health Passport store
      if (!db.objectStoreNames.contains("passport")) {
        const passportStore = db.createObjectStore("passport", {
          keyPath: "id",
          autoIncrement: true,
        });
        passportStore.createIndex("birdId", "birdId", { unique: false });
      }

      // Financial Ledger store
      if (!db.objectStoreNames.contains("ledger")) {
        db.createObjectStore("ledger", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error("Database error: ", event.target.error);
      reject(event.target.error);
    };
  });
};

// Generic Add Function
const addRecord = async (storeName, data) => {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add(data);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Generic Update Function
const updateRecord = async (storeName, data) => {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(data);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Generic Get All Function
const getAllRecords = async (storeName) => {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Initialize DB on load
document.addEventListener("DOMContentLoaded", () => {
  initDB().then(() =>
    console.log("Offline Database Initialized Successfully."),
  );
});
