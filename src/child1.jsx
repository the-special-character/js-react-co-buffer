import React, { memo } from 'react';

function Child1() {
  console.log('Child 1 render');
  return <div>Child1</div>;
}

export default memo(Child1);
