import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation addClient(
    $name: String!, 
    $address: String!, 
    $email: String!, 
    $phoneNumber: String!
    ) {
      addClient(
        name: $name, 
        address: $address, 
        email: $email, 
        phoneNumber: $phoneNumber
        ) {
          id
          name
          address
          email
          phoneNumber
          }
      }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $id: ID!
    $name: String!
    $address: String!
    $email: String!
    $phoneNumber: String!
  ) {
    updateClient(
      id: $id
      name: $name
      address: $address
      email: $email
      phoneNumber: $phoneNumber
    ) {
      id
      name
      address
      email
      phoneNumber
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
    }
  }
`

export const ADD_PROJECT = gql`
  mutation addProject(
    $description: String!
    $startDate: Date!
    $endDate: Date
    $clientId: ID!
    $projectType: ProjectType!
    $paid: Boolean!
    $paymentType: PaymentType!
    $images: [String]
    ) {
      addProject(
        description: $description
        startDate: $startDate
        endDate: $endDate
        clientId: $clientId
        projectType: $projectType
        paid: $paid
        paymentType: $paymentType
        images: $images
        ) {
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
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $description: String!
    $startDate: Date!
    $endDate: Date!
    $clientId: ID!
    $projectType: ProjectType!
    $paid: Boolean!
    $paymentType: PaymentType!
    $images: [String]
    ) {
      updateProject(
        id: $id
        description: $description
        startDate: $startDate
        endDate: $endDate
        clientId: $clientId
        projectType: $projectType
        paid: $paid
        paymentType: $paymentType
        images: $images
        ) {
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

export const ADD_PROJECT_IMAGE = gql`
  mutation addProjectImage($downloadURL: String!, $projectId: ID!) {
    addProjectImage(downloadURL: $downloadURL, projectId: $projectId) {
      images
    }
  }
`

export const ADD_CLIENT_HOME_PHOTO = gql`
  mutation addHomePhoto($downloadURL: String!, $clientId: ID!) {
    addHomePhoto(downloadURL: $downloadURL, clientId: $clientId) {
      homePhoto
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`

export const LOGIN_USER = gql`
      mutation login(
        $email: String!
        $password: String!
      ) {
        login(
          email: $email
          password: $password
        ) {
          token
          user {
            email
            password
          }
        }
      }
`
