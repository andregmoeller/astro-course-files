import { column, defineDb, defineTable } from 'astro:db';

const Logs = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    url: column.text(),
    date_accessed: column.date(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Logs },
});
