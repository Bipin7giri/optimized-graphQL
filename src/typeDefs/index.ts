// import path from 'node:path';
import { readFileSync } from 'node:fs';
import gql from 'graphql-tag';
// const filePath = path.join(process.cwd(), 'src', 'typeDefs', 'schema.graphql');
var filePath = "src/typeDefs/schema.graphql";

export const schema = readFileSync(filePath, 'utf8');
export const typeDefs = gql`
  ${schema}
`;
