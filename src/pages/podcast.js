import React, { Component } from 'react'
import { graphql } from 'gatsby'
import _ from 'lodash'
import PlayIcon from 'mdi-react/PlayIcon'
import SpeakerIcon from 'mdi-react/SpeakerIcon'
import { array, shape, string } from 'prop-types'

import { HTMLContent } from 'components/Content'
import PageHelmet from 'components/Helmets/PageHelmet'
import SubscribeLinksBar from 'components/SubscribeLinksBar'
import PodcastContext from 'contexts/PodcastContext'
import { SrText } from 'style/components'
import {
  CurrentEpisodeContainer,
  EpisodesColumn,
  EpisodeTab,
  Grid,
  IconContainer,
  PlayButton,
  SelectedEpsiodeTitle,
  TabButton,
  Title,
  TitleBG,
  TitleContainer,
} from 'style/components/podcastPage'

const pageTitle = `Podcast Archive`
const pageDescription = ``

export default class PodcastPage extends Component {
  static propTypes = {
    data: shape({
      site: shape({
        siteMetadata: shape({ title: string.isRequired }),
      }),
      podcasts: shape({ edges: array }),
    }).isRequired,
  }

  static contextType = PodcastContext

  state = {
    episodes: _.map(this.props.data.podcasts.edges, `node`),
    showDetails: this.props.data.podcasts.edges[0].id,
  }

  componentDidMount() {
    const { url } = this.context
    const { episodes, showDetails } = this.state
    const { id } =
      _.find(episodes, [`frontmatter.podcastURL`, url]) || episodes[0]
    if (showDetails === id) return
    this.setState({ showDetails: id })
  }

  getSelectedEpisode = () => {
    const { episodes, showDetails } = this.state
    return _.find(episodes, [`id`, showDetails]) || episodes[0]
  }

  setShowDetails = (id) => () => this.setState({ showDetails: id })

  handlePlayButtonClick = (podcastURL) => () => {
    const { isPlaying, url, setPodcastState, setPlaying } = this.context

    if (podcastURL === url) {
      setPlaying(!isPlaying)
    } else {
      setPodcastState({ url: podcastURL })
    }
  }

  renderEpisodeTab = (episode) => {
    const { url } = this.context
    const {
      id,
      frontmatter: { title, podcastURL /* , date */ },
    } = episode
    const { id: currentId } = this.getSelectedEpisode()
    const selected = id === currentId
    const isCurrentEpisode = url === podcastURL
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
    )
  }

  renderEpisodes() {
    const { episodes } = this.state

    return (
      <EpisodesColumn>{_.map(episodes, this.renderEpisodeTab)}</EpisodesColumn>
    )
  }

  renderSelectedEpisode() {
    const {
      html,
      frontmatter: { title },
    } = this.getSelectedEpisode()

    return (
      <CurrentEpisodeContainer>
        <SelectedEpsiodeTitle>{title}</SelectedEpsiodeTitle>
        <HTMLContent content={html} />
      </CurrentEpisodeContainer>
    )
  }

  render() {
    const { image } = this.getSelectedEpisode().frontmatter

    return (
      <>
        <PageHelmet
          pageTitle={pageTitle}
          description={pageDescription}
          path="/podcast"
        />

        <TitleContainer>
          <TitleBG image={image} className="fill" />
          <Title>{pageTitle}</Title>
          <SubscribeLinksBar />
        </TitleContainer>
        <Grid>
          {this.renderEpisodes()}
          {this.renderSelectedEpisode()}
        </Grid>
      </>
    )
  }
}

export const pageQuery = graphql`
  query AllPodcastEpisodes {
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
            image {
              childImageSharp {
                fluid(maxWidth: 1700) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            imageAlt
            podcastURL
          }
        }
      }
    }
  }
`
