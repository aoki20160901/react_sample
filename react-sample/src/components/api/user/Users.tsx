import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../data/api/user';
const Users: React.FC = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    getUsers().then((users) => {
      setData(JSON.stringify(users, undefined, 2));
    });
  }, []);
  return (
    <div style={{ whiteSpace: 'break-spaces', background: '#DDD' }}>{data}</div>
  );
};

export { Users };