import React from "react";
import { UserList } from "./UserList";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button'

type UserRowProps = {
  User: UserList;
  // onNameChange: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

const UserRow = (props: UserRowProps) => {
  const { id, name, company, tel } = props.User;

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   props.onNameChange(props.User.id, e.target.value);
  // };

  const handleDeleteClick = () => {
    props.onDelete(props.User.id);
  };

  return (
    // { id:props.User.id, name:props.User.name, company:props.User.company, tel:props.User.tel }
    <div>
      <div title={id} className="id">
        {id}
      </div>
      <div title={name} className="name">
        {name}
      </div>
      <div title={company} className="company">
        {company}
      </div>
      <div title={tel} className="tel">
        {tel}
      </div>
      <div className="delete-row" onClick={handleDeleteClick}>
        削除
      </div>
    </div>
  );
};

export default UserRow;