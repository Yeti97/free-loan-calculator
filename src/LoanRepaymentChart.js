import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function LoanRepaymentChart(props) {
  const { data, loading, totalCost } = props;

  if (loading) {
    return (null);
  }
  else {
    console.log(data, loading);
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
        <XAxis dataKey="termRemaining" />
        <YAxis dataKey="amountRemaining" domain={[0, totalCost]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amountRemaining" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    )
  }
}
