import './styles.scss';

import React from 'react';
import { mapStatesToProps } from 'react-fluxible';
import { updateStore } from 'fluxible-js';
import { Link, Redirect } from 'react-router-dom';
import { truncate } from '../../helper-funcs/strings';
import CreateListForm from './CreateListForm';
import CreateActivityForm from './CreateActivityForm';

class BoardView extends React.Component {
  displayCreateListForm = () => {
    updateStore({
      Popup: <CreateListForm boardId={this.props.match.params.id} />
    });
  }

  displayListActivities = list => {
    if (!list.activities.length) {
      return (
        <p>
          This list has no activies yet. <button className="create-activity theme-text" onClick={() => {
            updateStore({
              Popup: <CreateActivityForm boardId={this.props.match.params.id} listId={list.id} />
            });
          }}>Create activity</button>
        </p>
      );
    }

    return (
      <>
        <button className="theme-default width-max" onClick={() => {
          updateStore({
            Popup: <CreateActivityForm boardId={this.props.match.params.id} listId={list.id} />
          });
        }}>Create activity</button>
        {list.activities.map(activity =>
          <button key={activity.id} className="activity">
            <p><strong>{activity.name}</strong></p>
            <p>{activity.category.label}</p>
            <p>Due on {new Date(activity.due).format('%F %D, %y')}</p>
          </button>
        )}
      </>
    )
  }

  displayLists = () => {
    const board = this.props.boards.find(board => board.id === this.props.match.params.id);

    if (!board.lists.length) {
      return (
        <div className="container-centered">
          <h1>Empty board</h1>
          <p>This board is currently empty.</p>
          <button className="theme-default width-max spaced-atop" onClick={this.displayCreateListForm}>Create list</button>
        </div>
      );
    }

    return (
      <>
        {board.lists.map(list =>
          <div key={list.id} className="list">
            <p className="container-title"><strong>{list.name}</strong></p>
            {this.displayListActivities(list)}
          </div>
        )}
      </>
    );
  }

  render () {
    const board = this.props.boards.find(board => board.id === this.props.match.params.id);

    if (!board) return <Redirect to="/" />;

    return (
      <div id="board-view">
        <div id="top-bar">
          <p id="back-button"><Link to="/">{`< Back`}</Link></p>
          <p><strong>{truncate(board.name, 10)}</strong></p>
          <p id="buttons">
            <button className="theme-text" onClick={this.displayCreateListForm}>Create list</button>
          </p>
        </div>
        <div id="lists">
          {this.displayLists()}
        </div>
      </div>
    );
  }
}

export default mapStatesToProps(BoardView, states => ({
  boards: states.boards
}));
