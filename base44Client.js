const STORAGE_KEY = 'bebiko_pregnancy_records';

function readRecords() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function makeId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const base44 = {
  auth: {
    async logout() {
      return true;
    },
    async deleteAccount() {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('bebiko_language');
      return true;
    },
  },
  entities: {
    Pregnancy: {
      async list(order = '-created_date', limit = 20) {
        const records = readRecords();
        const sorted = [...records].sort((a, b) => {
          const aDate = new Date(a.created_date || 0).getTime();
          const bDate = new Date(b.created_date || 0).getTime();
          return order.startsWith('-') ? bDate - aDate : aDate - bDate;
        });
        return sorted.slice(0, limit);
      },
      async create(data) {
        const records = readRecords();
        const record = {
          id: makeId(),
          created_date: new Date().toISOString(),
          ...data,
        };
        writeRecords([record, ...records]);
        return record;
      },
      async update(id, data) {
        const records = readRecords();
        const updated = records.map((record) => (
          record.id === id ? { ...record, ...data, updated_date: new Date().toISOString() } : record
        ));
        writeRecords(updated);
        return updated.find((record) => record.id === id) || null;
      },
    },
  },
};
