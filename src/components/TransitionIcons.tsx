import React, { ReactElement } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './TransitionIcons.css';

interface TransitionIconsProps {
  showFirst: boolean;
  first: ReactElement;
  second: ReactElement;
}

const TransitionIcons = ({
  showFirst,
  first,
  second,
}: TransitionIconsProps) => {
  return (
    <SwitchTransition>
      <CSSTransition
        classNames='fade'
        key={showFirst ? '1' : '2'}
        addEndListener={(node, done) =>
          node.addEventListener('transitionend', done, false)
        }
      >
        <>{showFirst ? first : second}</>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default TransitionIcons;
