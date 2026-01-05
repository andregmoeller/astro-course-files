import { column, defineDb, defineTable, NOW } from 'astro:db';

const Links = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    url: column.text(),
    date: column.date({default: NOW}),
    isRead: column.boolean(),
    upvoteNum: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Links },
});
