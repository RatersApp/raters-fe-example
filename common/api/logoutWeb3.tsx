function deleteDatabase(dbName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(dbName);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event: Event) => {
      const error = (event.target as IDBRequest).error;
      console.error(`Error deleting database ${dbName}:`, error);
      reject(error);
    };

    request.onblocked = () => {
      console.warn(`Delete request blocked for database ${dbName}`);
    };
  });
}

export async function clearDatabases(): Promise<void> {
  try {
    await deleteDatabase('auth-client-db');
    await deleteDatabase('nfid-auth-client-db');
  } catch (error) {
    console.error('An error occurred while clearing the databases:', error);
  }
}