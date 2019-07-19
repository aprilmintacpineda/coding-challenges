import React from 'react';
import { updateStore, store } from 'fluxible-js';
import Popup from '../../components/Popup';

export default function DeleteBoard (props) {
  return (
    <Popup>
      <div id="delete-board-dialog">
        <p>Are you sure you want to delete this board?</p>
        <div className="board">
          <p title={props.board.name}><strong>Name:</strong> {props.board.name}</p>
          <p title={props.board.details}>
            <strong>Details:</strong>
            <br/>
            {props.board.details? props.board.details : 'No details provided.'}
          </p>
        </div>
        <p>This action cannot be undone.</p>
        <div className="footer">
          <button className="theme-default scheme-danger" onClick={() => {
            updateStore({
              Popup: null,
              boards: store.boards.filter(board => board.id !== props.board.id)
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
