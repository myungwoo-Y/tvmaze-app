import React, { useState, useEffect } from 'react';
import videos from '../../apis/videos';
import { imageOriginalValidation, removeTagInString } from '../../utils';
import { EpisodeListContainer } from './SeasonsShow.styles';
import { Row, Col, CardGroup, Card } from 'react-bootstrap';
const EpisodeList = ({episodes, seasonNumber}) => {
    const [ episodesById, setEpisodesById ] = useState(null);

    useEffect(() => {
        const newEpisodes = episodes.filter((episode) => (episode.season == seasonNumber));
        setEpisodesById(newEpisodes);
    }, [seasonNumber]);

    const renderEpisodes = () => {
        if(episodesById === null){
            return <></>;
        }
        return episodesById.map((episode, i) => {
            const image = imageOriginalValidation(episode.image);
            const title = episode.name;
            const description = removeTagInString(episode.summary);
            return(
                <Col xs={12} md={6} key={episode.id} className="mb-3">
                    <EpisodeListContainer>
                        <CardGroup>
                            <Card>
                                <Card.Img variant="top" src={image} />
                                <Card.Body>
                                    <Card.Title>{`Episode ${i+1}: ` + title}</Card.Title>
                                <Card.Text>
                                    {description}
                                </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">{`Air Date: ${episode.airdate}`}</small>
                                </Card.Footer>
                            </Card>
                        </CardGroup>
                    </EpisodeListContainer>
                </Col>
            )
        })
    }

    return(
        <Row>
            {renderEpisodes()}
        </Row>
    )
}

export default EpisodeList;