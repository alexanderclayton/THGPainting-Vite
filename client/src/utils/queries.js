import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
query {
    getClients {
      id
      name
      address
      email
      phoneNumber
      projects {
        id
        startDate
        endDate
        projectType
        paid
        paymentType
        images
      }
    }
  }
`

export const GET_CLIENT = gql`
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      name
      address
      email
      phoneNumber
      homePhoto
      projects {
        id
        startDate
        endDate
        projectType
        paid
        paymentType
        images
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query {
    getProjects {
      id
      description
      startDate
      endDate
      projectType
      paid
      paymentType
      images
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      description
      startDate
      endDate
      clientId
      projectType
      paid
      paymentType
      images
    }
  }
`