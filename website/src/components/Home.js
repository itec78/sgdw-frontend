import React, {Component} from 'react';

import Logo from '../components/common/Logo';
import NavLinks from '../components/NavLinks';

import LoadingContainer from '../containers/LoadingContainer';
import ResultsContainer from '../containers/ResultsContainer';
import ErrorMessageContainer from '../containers/ErrorMessageContainer';
import SearchButtonContainer from '../containers/SearchButtonContainer';
import SwapInputValuesButton from '../containers/SwapInputValuesButton';
import TargetPageInputContainer from '../containers/TargetPageInputContainer';
import SourcePageInputContainer from '../containers/SourcePageInputContainer';

import {P, Modal, InputFlexContainer} from './Home.styles';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div>
        <Logo />

        <NavLinks handleOpenModal={this.handleOpenModal.bind(this)} />

        <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal}>
          <p>
            Ispirato dalla teoria dei{' '}
            <a href="https://it.wikipedia.org/wiki/Sei_gradi_di_separazione">
              Sei gradi di separazione
            </a>
            , <b>Sei gradi di Wikipedia</b> attraversa i collegamenti di Wikipedia per trovare il
            numero minimo di click per navigare tra ciascuna delle quasi 2 milioni di pagine
            sulla più grande enciclopedia mondiale libera.
          </p>
          <p>
            Inserisci il titolo di due pagine di Wikipedia nelle caselle di questo sito, clicca sul
            pulsante "Vai!" e scopri come sono collegate le pagine di Wikipedia.
          </p>
          <p>
            Wikipedia è un marchio registrato della Wikimedia Foundation.
            Questo sito è fatto da appassionati senza affiliazione all'organizzazione.
          </p>
          <p>
            Un progetto di <a href="https://jwn.gr/">Jacob Wenger</a>.
            Modificato e tradotto in italiano da Odoacre e Itec.
          </p>
        </Modal>

        <P>Trova i percorsi più brevi tra</P>
        <InputFlexContainer>
          <SourcePageInputContainer />
          <SwapInputValuesButton />
          <TargetPageInputContainer />
        </InputFlexContainer>

        <SearchButtonContainer />
        <LoadingContainer />
        <ResultsContainer />
        <ErrorMessageContainer />
      </div>
    );
  }
}

export default Home;
