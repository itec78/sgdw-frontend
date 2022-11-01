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
          <b>Seriously?</b> Talk about overqualified for the job...
        </React.Fragment>
      );
    } else if (degreesOfSeparation === 1) {
      snarkyContent = (
        <React.Fragment>
          <b>Welp...</b> thanks for making my job easy.
        </React.Fragment>
      );
    } else if (degreesOfSeparation === 5) {
      snarkyContent = (
        <React.Fragment>
          <b>*wipes brow*</b> I really had to work for this one.
        </React.Fragment>
      );
    } else if (degreesOfSeparation === 6) {
      snarkyContent = (
        <React.Fragment>
          <b>*breathes heavily*</b> What a workout!
        </React.Fragment>
      );
    } else if (degreesOfSeparation >= 7) {
      snarkyContent = (
        <React.Fragment>
          <b>*picks jaw up from floor*</b> That was intense!
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
          <b>Nota:</b> La pagina inziale e finale sono redirect.
        </p>
      );
    } else if (isSourceRedirected) {
      redirectContent = (
        <p>
          <b>Nota:</b> La pagina inziale è un redirect.
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
            Trovato{' '}
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
