import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { mapStatesToProps } from 'react-fluxible';
import { updateStore } from 'fluxible-js';
import { truncate } from '../../helper-funcs/strings';
import CreateBoardForm from './CreateBoardForm';

class Dashboard extends React.Component {
  displayCreateBoardForm = () => {
    updateStore({ Popup: <CreateBoardForm /> });
  }

  render () {
    if (!this.props.boards.length) {
      return (
        <div id="dashboard">
          <div id="empty-workspace" className="container-centered">
            <h1>Empty workspace</h1>
            <p>You currently don't have any boards.</p>
            <button  className="theme-default width-max spaced-atop" onClick={this.displayCreateBoardForm}>Create board</button>
          </div>
        </div>
      );
    }

    return (
      <div id="dashboard">
        <div id="boards">
          <button id="new-board-button" onClick={this.displayCreateBoardForm}>
            <p className="container-centered">Create board</p>
          </button>
          {this.props.boards.map(board =>
            <Link key={board.id} to={`/board/${board.id}`}>
              <div className="board">
                <p className="container-title" title={board.name}><strong>{truncate(board.name, 85)}</strong></p>
                <p title={board.description}>{board.description? truncate(board.description, 240) : 'No description provided.'}</p>
                <div className="footer">
                  <p>Created: {new Date(board.created_at).format('%f %M, %y %h:%N:%S %a')}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default mapStatesToProps(Dashboard, states => ({
  boards: states.boards
}));
