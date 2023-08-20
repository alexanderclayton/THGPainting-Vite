import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  scalar Upload

  type Client {
    id: ID!
    name: String!
    address: String!
    email: String!
    phoneNumber: String!
    projects: [Project]
    homePhoto: [String]
  }
  
  type Project {
    id: ID!
    description: String!
    startDate: Date!
    endDate: Date!
    clientId: ID!
    projectType: ProjectType!
    paid: Boolean!
    paymentType: PaymentType!
    images: [String]
    paintColors: [String]
  }
  
  enum ProjectType {
    PAINTING
    CHRISTMAS_LIGHTS
    OTHER
  }
  
  enum PaymentType {
    CASH
    CHECK
    VENMO
    NONE
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    avatar: String
  }

  type Image {
    id: ID!
    url: String!
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    getClients: [Client]!
    getClient(id: ID!): Client
    getProjects: [Project]!
    getProject(id: ID!): Project
    getProjectImages: [Image!]!
  }
  
  type Mutation {
    addClient(name: String!, address: String!, email: String!, phoneNumber: String!): Client!
    updateClient(id: ID!, name: String, address: String, email: String, phoneNumber: String, homePhoto: [String]): Client
    deleteClient(id: ID!): Client
    addUser(name: String!, email: String!, password: String!, avatar: String): User
    addProjectImage(downloadURL: String!, projectId: ID!): Project
    addHomePhoto(downloadURL: String!, clientId: ID!): Client
  
    addProject(description: String!, startDate: Date!, endDate: Date, clientId: ID!, projectType: ProjectType!, paid: Boolean!, paymentType: PaymentType, images: [String], paintColors: [String]): Project
    updateProject(id: ID!, description: String!, startDate: Date, endDate: Date, clientId: ID, projectType: ProjectType, paid: Boolean, paymentType: PaymentType, images: [String], paintColors: [String]): Project
    deleteProject(id: ID!): Project
  
    register(name: String!, email: String!, password: String!, avatar: String): User!
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;