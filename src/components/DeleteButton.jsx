import React from 'react';
import * as api from './api';

const DeleteButton = (data, deleted) => {
  const remove = (id, loc) => {
    api.deleteItem(id, loc).then(() => data.deleted(true));
  };

  return (
    <div>
      <button onClick={() => remove(data.data.id, data.data.loc)}>
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
