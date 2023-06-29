// Sample typeDefs.js file

import { gql } from 'graphql-tag';

// Define your GraphQL type definitions using the gql tag
const typeDefs = gql`
  type Query {
    hello: String!
    placeholder: String!
  }
`;

export default typeDefs;
