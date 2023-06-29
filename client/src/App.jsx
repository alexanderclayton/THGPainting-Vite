import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client' //not sure if createHttpLink is needed
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import WhyTHG from './pages/WhyTHG';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Header from './components/Header';
import Footer from './components/Footer';
import Userpage from './pages/Userpage';
import AllProjects from './pages/AllProjects';
import Project from './pages/Project';
import AllClients from './pages/AllClients';
import Client from './pages/Client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/why-thg" element={<WhyTHG />} />\
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/all-projects/project/:id" element={<Project />} />
          <Route path="/all-clients" element={<AllClients />} />
          <Route path="/all-clients/client/:id" element={<Client />} />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  )
}

export default App;