import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {Layout, ModuleDetail, QueryResult} from '../components';

export const GET_MODULE_AND_PARENT_TRACK = gql`
query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

const Module = ({trackId, moduleId}) => {
    const {loading, error, data} = useQuery(GET_MODULE_AND_PARENT_TRACK, {
        variables: {trackId, moduleId}
    });
    return <Layout fullWidth>
        <QueryResult error={error} loading={loading} data={data}>
        {/* using optional chaining as data only available till query finish loading */}
        <ModuleDetail track={data?.track} module={data?.module} />
        </QueryResult>
    </Layout>;
  };
  export default Module;