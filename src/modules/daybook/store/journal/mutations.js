export function setEntries(state, entries) {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
}

export function updateEntry({ entries }, entry) {
  const idx = entries.map((event) => event.id).indexOf(entry.id);
  entries[idx] = entry;
}

export function addEntry(state, entry) {
  state.entries = [entry, ...state.entries];
}

export function deleteEntry(state, id) {
  state.entries = state.entries.filter((entry) => entry.id !== id);
}
