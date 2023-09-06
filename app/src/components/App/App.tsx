import React from 'react';

import { GlobalStyles } from '../../assets/styles/GlobalStyles';

import Header from '../Header';

import {Container} from './styles';

function index() {

  return (
    <Container>
      <GlobalStyles />
      <Header />
    </ Container>
  );
}

export default index;
