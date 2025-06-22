export const createStorage = (storage = localStorage) => ({
  setData: (key, data) => {
    storage.setItem(key, JSON.stringify(data));
  },
  getData: (key) => {
    return JSON.parse(storage.getItem(key));
  },
});

export const storage = createStorage();
