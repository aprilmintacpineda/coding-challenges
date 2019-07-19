import React from 'react';
import { updateStore, store } from 'fluxible-js';
import Popup from '../../components/Popup';

export default function DeleteList (props) {
  return (
    <Popup>
      <div id="delete-list-dialog">
        <p>Are you sure you want to delete this list?</p>
        <div className="list">
          <p><strong>Name:</strong> {props.list.name}</p>
          <p>
            <strong>Description:</strong>
            <br/>
            {props.list.description || 'No description provided.'}
          </p>
        </div>
        <p>This action cannot be undone.</p>
        <div className="footer">
          <button className="theme-default scheme-danger" onClick={() => {
            updateStore({
              Popup: null,
              boards: store.boards.map(board => {
                if (board.id !== props.boardId) return board;

                return {
                  ...board,
                  lists: board.lists.filter(list => list.id !== props.list.id)
                };
              })
            });
          }}>Delete</button>
          <button className="theme-default" onClick={() => {
            updateStore({ Popup: null });
          }}>Cancel</button>
        </div>
      </div>
    </Popup>
  );
}
