import React from 'react';
import { Vortex } from 'react-loader-spinner';
import { FlexCenterBox } from './FlexCenterBox';

interface LoadingProps {
  size?: string;
}

const Loading = ({ size }: LoadingProps) => {
  return (
    <FlexCenterBox>
      <Vortex
        visible
        height={size ? size : '80'}
        width={size ? size : '80'}
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
    </FlexCenterBox>
  );
};

export default Loading;
