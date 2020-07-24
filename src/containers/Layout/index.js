import React from 'react';
import TopMenu from '../TopMenu';
import Content from '../Content';
import { Container } from '@material-ui/core';

export default function Layout() {
  return (
    <>
      <TopMenu mb={2} />
      <br />
      <Container>
        <Content />
      </Container>
    </>
  );
}
