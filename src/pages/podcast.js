import _ from 'lodash';
import React, { Component } from 'react';
import { array, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import { HTMLContent } from 'components/Content';
import PodcastContext from 'components/PodcastContext';
import PageHelmet from 'components/Helmets/PageHelmet';
import SubscribeLinksBar from 'components/SubscribeLinksBar';
import { SrText } from 'style/components';
import {
  Grid,
  EpisodesColumn,
  EpisodeTab,
  TabButton,
  CurrentEpisodeContainer,
  SelectedEpsiodeTitle,
  PlayButton,
  IconContainer,
  TitleBG,
  TitleContainer,
  Title,
} from 'style/components/podcastPage';
import { PlayIcon, SpeakerIcon } from 'mdi-react';

const pageTitle = `Podcast Archive`;
const pageDescription = ``;
export default class PodcastPage extends Component {
  static propTypes = {
    data: shape({
      site: shape({
        siteMetadata: shape({ title: string.isRequired }),
      }),
      podcasts: shape({ edges: array }),
    }).isRequired,
  };

  static contextType = PodcastContext;

  state = {
    episodes: _.map(this.props.data.podcasts.edges, `node`),
    showDetails: this.props.data.podcasts.edges[0].id,
  };

  componentDidMount() {
    const { url } = this.context;
    const { episodes, showDetails } = this.state;
    const { id } = _.find(episodes, [`frontmatter.podcastURL`, url]) || episodes[0];
    if (showDetails === id) return;
    this.setState({ showDetails: id });
  }

  getSelectedEpisode = () => {
    const { episodes, showDetails } = this.state;
    return _.find(episodes, [`id`, showDetails]) || episodes[0];
  };

  setShowDetails = (id) => () => this.setState({ showDetails: id });

  handlePlayButtonClick = (podcastURL) => () => {
    const { isPlaying, url, setPodcastState, setPlayState } = this.context;

    if (podcastURL === url) {
      setPlayState(!isPlaying);
    } else {
      setPodcastState({ url: podcastURL });
    }
  };

  renderEpisodeTab = (episode) => {
    const { url } = this.context;
    const {
      id,
      frontmatter: { title, podcastURL /* , date */ },
    } = episode;
    const { id: currentId } = this.getSelectedEpisode();
    const selected = id === currentId;
    const isCurrentEpisode = url === podcastURL;
    return (
      <EpisodeTab key={id} selected={selected}>
        <TabButton
          type="button"
          selected={selected}
          onClick={this.setShowDetails(id)}
          title="Show episode details"
        >
          {title}
        </TabButton>
        {isCurrentEpisode ? (
          <IconContainer>
            <SpeakerIcon size={35} />
          </IconContainer>
        ) : (
          <PlayButton
            type="button"
            onClick={this.handlePlayButtonClick(podcastURL)}
          >
            <PlayIcon size={30} />
            <SrText>{`Listen to ${title}`}</SrText>
          </PlayButton>
        )}
      </EpisodeTab>
    );
  };

  renderEpisodes() {
    const { episodes } = this.state;

    return (
      <EpisodesColumn>{_.map(episodes, this.renderEpisodeTab)}</EpisodesColumn>
    );
  }

  renderSelectedEpisode() {
    const {
      html,
      frontmatter: { title },
    } = this.getSelectedEpisode();

    return (
      <CurrentEpisodeContainer>
        <SelectedEpsiodeTitle>{title}</SelectedEpsiodeTitle>
        <HTMLContent content={html} />
      </CurrentEpisodeContainer>
    );
  }

  render() {
    const { image, imageURL } = this.getSelectedEpisode().frontmatter;

    return (
      <>
        <PageHelmet
          pageTitle={pageTitle}
          description={pageDescription}
          path="/podcast"
        />

        <TitleBG image={image || imageURL}>
          <TitleContainer>
            <Title>{pageTitle}</Title>
          </TitleContainer>
          <SubscribeLinksBar />
        </TitleBG>
        <Grid>
          {this.renderEpisodes()}
          {this.renderSelectedEpisode()}
        </Grid>
      </>
    );
  }
}

export const pageQuery = graphql`
  query AllEpisodesQuery {
    podcasts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { format: { eq: "audio" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            image
            imageURL
            imageAlt
            podcastURL
          }
        }
      }
    }
  }
`;
