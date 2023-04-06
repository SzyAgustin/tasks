import React from 'react';
import { Vortex } from 'react-loader-spinner';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingBox>
      <Vortex
        visible
        height='80'
        width='80'
        ariaLabel='vortex-loading'
        wrapperStyle={{}}
        wrapperClass='vortex-wrapper'
        colors={[
          '#0000af',
          '#0089c9',
          '#00bad3',
          '#0000af',
          '#0089c9',
          '#00bad3',
        ]}
      />
    </LoadingBox>
  );
};

export default Loading;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
