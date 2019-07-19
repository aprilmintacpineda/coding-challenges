import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { mapStatesToProps } from 'react-fluxible';
import { updateStore } from 'fluxible-js';
import { truncate } from '../../helper-funcs/strings';
import Popup from '../../components/Popup';
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
            <div key={board.id} className="board">
              <p className="container-title" title={board.name}><strong>{truncate(board.name, 85)}</strong></p>
              <p title={board.description}>{board.description? truncate(board.description, 200) : 'No description provided.'}</p>
              <br/>
              <p>Created: {new Date(board.created_at).format('%f %M, %y %h:%N:%S %a')}</p>
              <div className="footer">
                <button className="theme-text" title="Delete" onClick={() => {
                  updateStore({
                    Popup: (
                      <Popup>
                        <div id="delete-board-dialog">
                          <p>Are you sure you want to delete this board?</p>
                          <div className="board">
                            <p title={board.name}><strong>Name:</strong> {board.name}</p>
                            <p title={board.description}>
                              <strong>Description:</strong>
                              <br/>
                              {board.description? board.description : 'No description provided.'}
                            </p>
                          </div>
                          <p>This action cannot be undone.</p>
                          <div className="footer">
                            <button className="theme-default scheme-danger" onClick={() => {
                              updateStore({
                                Popup: null,
                                boards: this.props.boards.filter(_board => _board.id !== board.id)
                              });
                            }}>Delete</button>
                            <button className="theme-default" onClick={() => {
                              updateStore({ Popup: null });
                            }}>Cancel</button>
                          </div>
                        </div>
                      </Popup>
                    )
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
