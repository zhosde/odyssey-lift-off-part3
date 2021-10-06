import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {Layout, QueryResult} from '../components';
import TrackDetail from '../components/track-detail';

// trackId got from router path or browser URL (/track/:trackId)
export const GET_TRACK = gql`
query getTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
      numberOfViews
      modules {
        id
        title
        length
      }
      description
    }
  }
`;

const Track = ({trackId}) => {
    const {loading, error, data} = useQuery(GET_TRACK, {
        variables: {trackId}
    });
    return <Layout>
        <QueryResult error={error} loading={loading} data={data}>
        {/* using optional chaining as data only available till query finish loading */}
        <TrackDetail track={data?.track} />
</QueryResult>
    </Layout>;
  };
  export default Track;