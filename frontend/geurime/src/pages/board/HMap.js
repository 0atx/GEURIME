import React, { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import moment from "moment";
import 'moment/locale/ko';

const value = [
  { date: '2016/01/11', count:2 },
  { date: '2016/04/12', count:2 },
  { date: '2016/05/01', count:5 },
  { date: '2016/05/02', count:5 },
  { date: '2016/05/03', count:1 },
  { date: '2016/05/04', count:11 },
  { date: '2022/11/08', count:1 },
];


const HMap = () => {
  return (
    <HeatMap
      value={value}
      width='30vw'
      style={{ color: '#ad001d' }}
      startDate={new Date(moment().subtract(1, 'months').format('YYYY/MM/DD'))}
      endDate={new Date(moment().format('YYYY/MM/DD'))}
      weekLabels={['일', '월', '화', '수', '목', '금', '토']}

      legendCellSize={0}
      panelColors={{
        0: '#f4decd',
        2: '#e4b293',
        4: '#d48462',
        10: '#c2533a',
        20: '#ad001d',
        30: '#000',
      }}
      rectProps={{
        rx: 2.5
      }}
      rectRender={(props, data) => {
        // if (!data.count) return <rect {...props} />;
        return (
          <Tooltip key={props.key} placement="top" content={`count: ${data.count || 0}`}>
            <rect {...props} />
          </Tooltip>

              
        );
      }}
    />
  )
};
export default HMap