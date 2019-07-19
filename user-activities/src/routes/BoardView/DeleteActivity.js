import React from 'react';
import { updateStore, store } from 'fluxible-js';
import Popup from '../../components/Popup';

export default function DeleteActivity (props) {
  return (
    <Popup>
      <div id="delete-activity-dialog">
        <p>Are you sure you want to delete this activity?</p>
        <div className="activity">
          <p><strong>Name:</strong> {props.activity.name}</p>
          <p><strong>Status:</strong> {props.activity.status.label}</p>
          <p><strong>Category:</strong> {props.activity.category.label}</p>
          <p><strong>Due on:</strong> {new Date(props.activity.due).format('%F %D, %y')}</p>
          <br/>
          <p><strong>Details:</strong> <br/>{props.activity.details}</p>
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
                  lists: board.lists.map(list => {
                    if (list.id !== props.listId) return list;

                    return {
                      ...list,
                      activities: list.activities.filter(activity => activity.id !== props.activity.id)
                    };
                  })
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
