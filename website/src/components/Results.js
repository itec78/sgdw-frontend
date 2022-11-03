import React, {Component} from 'react';

import ResultsList from './ResultsList';
import ResultsGraph from './ResultsGraph';
import StyledLink from './common/StyledLink';

import {
  ResultsMessage,
  TwitterButtonWrapper,
  TwitterButton,
  TwitterBirdSvg,
} from './Results.styles';

import {getNumberWithCommas, getWikipediaPageUrl} from '../utils';

class Results extends Component {
  /**
   * Adds some character to the results by rendering a snarky comment for certain degress of
   * separation.
   */
  renderSnarkyContent(degreesOfSeparation) {
    let snarkyContent;
    if (degreesOfSeparation === 0) {
      snarkyContent = (
        <React.Fragment>
          <b>Davvero?</b> Lavoro troppo qualificato...
        </React.Fragment>
      );
    } else if (degreesOfSeparation === 1) {
      snarkyContent = (
        <React.Fragment>
          <b>Beh...</b> Grazie per avermi reso il lavoro facile.
        </React.Fragment>
      );
    } else if (degreesOfSeparation === 5) {
      snarkyContent = (
        <React.Fragment>
          <b>*Mi asciugo la fronte*</b> E' stato un duro lavoro!.
        </React.Fragment>
      );
    } else if (degreesOfSeparation === 6) {
      snarkyContent = (
        <React.Fragment>
          <b>*Col fiantone*</b> Che allenamento!
        </React.Fragment>
      );
    } else if (degreesOfSeparation >= 7) {
      snarkyContent = (
        <React.Fragment>
          <b>*Raccogliete le vostre mandibole dal pavimento*</b> Questo è stato intenso!
        </React.Fragment>
      );
    }

    if (snarkyContent) {
      snarkyContent = (
        <p>
          <i>{snarkyContent}</i>
        </p>
      );
    }

    return snarkyContent;
  }

  /**
   *  Adds a warning if the source and/or target page(s) were redirects.
   */
  renderRedirectWarning(isSourceRedirected, isTargetRedirected) {
    let redirectContent;
    if (isSourceRedirected && isTargetRedirected) {
      redirectContent = (
        <p>
          <b>Nota:</b> La pagina iniziale e quella finale sono redirect.
        </p>
      );
    } else if (isSourceRedirected) {
      redirectContent = (
        <p>
          <b>Nota:</b> La pagina iniziale è un redirect.
        </p>
      );
    } else if (isTargetRedirected) {
      redirectContent = (
        <p>
          <b>Nota:</b> La pagina finale è un redirect.
        </p>
      );
    }

    return redirectContent;
  }

  render() {
    const {results, isFetchingResults} = this.props;
    const {
      paths,
      sourcePageTitle,
      targetPageTitle,
      isSourceRedirected,
      isTargetRedirected,
      durationInSeconds,
    } = results;

    if (paths === null || isFetchingResults) {
      return null;
    }

    const sourcePageLink = (
      <StyledLink href={getWikipediaPageUrl(sourcePageTitle)} target="_blank">
        {sourcePageTitle}
      </StyledLink>
    );
    const targetPageLink = (
      <StyledLink href={getWikipediaPageUrl(targetPageTitle)} target="_blank">
        {targetPageTitle}
      </StyledLink>
    );

    // No paths found.
    if (paths.length === 0) {
      return (
        <ResultsMessage>
          <p>
            <i>
              <b>Beh</b>, questo è imbarazzante...
            </i>
          </p>
          <p>
            <b>Non esiste nessun percorso</b> di Wikipedia da {sourcePageLink} a {targetPageLink}.
          </p>
          {this.renderRedirectWarning(
            sourcePageTitle,
            targetPageTitle,
            isSourceRedirected,
            isTargetRedirected
          )}
        </ResultsMessage>
      );
    }

    const degreesOfSeparation = paths[0].length - 1;
    const pathOrPaths = paths.length === 1 ? 'percorso' : 'percorsi';
    const degreeOrDegrees = degreesOfSeparation === 1 ? 'grado' : 'gradi';

    return (
      <React.Fragment>
        <ResultsMessage>
          {this.renderSnarkyContent(degreesOfSeparation)}
          <p>
            Ho trovato{' '}
            <b>
              {getNumberWithCommas(paths.length)} {pathOrPaths}
            </b>{' '}
            con{' '}
            <b>
              {degreesOfSeparation} {degreeOrDegrees}
            </b>{' '}
            di separazione da {sourcePageLink} a {targetPageLink} in{' '}
            <b>{durationInSeconds} secondi!</b>
          </p>
          {this.renderRedirectWarning(isSourceRedirected, isTargetRedirected)}
        </ResultsMessage>
        <ResultsGraph paths={paths} />
        <ResultsList paths={paths} />
      </React.Fragment>
    );
  }
}

export default Results;
