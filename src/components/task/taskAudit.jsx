import React, {memo} from 'react';
import {Button} from 'antd';
import styled from 'styled-components';

export const Test = styled.div`
    > .test:hover {
        width: 100px;
    }
`;
const taskAudit = () => (
  <div>
    <Test>
      <Button value="large" className="test">Default</Button>
    </Test>
    <Button danger>Default</Button>
  </div>
);

export default memo(taskAudit);
