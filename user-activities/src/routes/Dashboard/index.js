import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { mapStatesToProps } from 'react-fluxible';
import { updateStore } from 'fluxible-js';
import { truncate } from '../../helper-funcs/strings';
import Popup from '../../components/Popup';
import CreateBoardForm from './CreateBoardForm';
import DeleteBoard from './DeleteBoard';

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
            <div key={board.id} className="board">
              <p className="container-title" title={board.name}><strong>{truncate(board.name, 85)}</strong></p>
              <p title={board.description}>{board.description? truncate(board.description, 200) : 'No description provided.'}</p>
              <br/>
              <p>Created: {new Date(board.created_at).format('%f %M, %y %h:%N:%S %a')}</p>
              <div className="footer">
                <button className="theme-text" title="Edit"><i className="fas fa-edit"></i></button>
                <button className="theme-text" title="Delete" onClick={() => {
                  updateStore({
                    Popup: <DeleteBoard board={board} />
                  });
                }}>
                  <i className="fas fa-trash"></i>
                </button>
                <button className="theme-text" title="Details">
                  <Link to={`/board/${board.id}`}>
                    <i className="fas fa-external-link-alt"></i>
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default mapStatesToProps(Dashboard, states => ({
  boards: states.boards
}));
