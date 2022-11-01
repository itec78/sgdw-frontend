import React from 'react';

import {Wrapper, TextLink, TextLinkInternal} from './NavLinks.styles';

const NavLinks = ({handleOpenModal}) => (
  <Wrapper>
    <TextLink href="#" onClick={() => handleOpenModal()}>
      About
    </TextLink>
    <TextLink href="https://github.com/seigradidiwikipedia">GitHub</TextLink>
  </Wrapper>
);

export default NavLinks;
