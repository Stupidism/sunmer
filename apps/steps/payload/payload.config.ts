import path from 'path';
import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

console.log('process.env.POSTGRES_URL: ', process.env.POSTGRES_URL);

export default buildConfig({
  collections: [
    // Your collections here
  ],
  globals: [
    // Your globals here
  ],
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.ts'),
  },
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString: process.env.POSTGRES_URL
        ? process.env.POSTGRES_URL + '?sslmode=require'
        : 'postgres://postgres:@127.0.0.1:5432/steps-dev-local',
    },
  }),
  editor: lexicalEditor({}),
});
