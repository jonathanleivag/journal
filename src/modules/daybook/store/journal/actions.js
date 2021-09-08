import journalApi from "../../../../api/journalApi";

export async function loadEntries({ commit }) {
  const { data } = await journalApi.get("/entries.json");
  if (!data) {
    commit("setEntries", []);
    return;
  }
  const entries = [];
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }
  commit("setEntries", entries);
}

export async function updateEntry({ commit }, entry) {
  const { date, picture, text } = entry;
  const dataToSave = { date, picture, text };
  await journalApi.put(`/entries/${entry.id}.json`, dataToSave);
  commit("updateEntry", entry);
}

export async function createEntry({ commit }, entry) {
  const { date, picture, text } = entry;
  const dataToSave = { date, picture, text };
  const { data } = await journalApi.post(`/entries.json`, dataToSave);
  dataToSave.id = data.name;
  commit("addEntry", dataToSave);
  return data.name;
}

export async function deleteEntry({ commit }, id) {
  await journalApi.delete(`/entries/${id}.json`);
  commit("deleteEntry", id);
  return id;
}
