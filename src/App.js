import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './containers/Layout';

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
