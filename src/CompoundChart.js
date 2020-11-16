import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function CompoundChart(props) {
  const { data, loading, totalCost, initial } = props;

  if (loading) {
    return (null);
  }
  else {
    return (
      <LineChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis dataKey="amount" domain={[initial, totalCost]} />
        <Tooltip label="Year"/>
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    )
  }
}
