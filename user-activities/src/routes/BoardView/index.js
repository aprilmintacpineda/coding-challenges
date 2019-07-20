import './styles.scss';

import React from 'react';
import { mapStatesToProps } from 'react-fluxible';
import { updateStore } from 'fluxible-js';
import { Link, Redirect } from 'react-router-dom';
import { truncate } from '../../helper-funcs/strings';
import Popup from '../../components/Popup';
import ListForm from './ListForm';
import ActivityForm from './ActivityForm';
import DeleteActivity from './DeleteActivity';
import DeleteList from './DeleteList';

class BoardView extends React.Component {
  displayCreateListForm = () => {
    updateStore({
      Popup: <ListForm boardId={this.props.match.params.id} />
    });
  }

  displayListActivities = list => {
    if (!list.activities.length) {
      return (
        <p>
          This list has no activies yet. <button className="create-activity theme-text" onClick={() => {
            updateStore({
              Popup: <ActivityForm boardId={this.props.match.params.id} listId={list.id} />
            });
          }}>Create activity</button>
        </p>
      );
    }

    return (
      <>
        <button className="theme-default width-max" onClick={() => {
          updateStore({
            Popup: <ActivityForm boardId={this.props.match.params.id} listId={list.id} />
          });
        }}>Create activity</button>
        {list.activities.map(activity =>
          <div key={activity.id} className="activity">
            <p><strong>{activity.name}</strong></p>
            <p><i>{activity.status.label}</i></p>
            <p>{activity.category.label}</p>
            <p>Due on {
              new Date(`${activity.due.year}-${activity.due.month}-${activity.due.date} ${activity.due.hours}:${activity.due.minutes} ${activity.due.meridiem}`)
              .format('%F %D, %y %H:%N %a')
            }</p>
            <div className="footer">
              <button className="theme-text" title="Edit" onClick={() => {
                updateStore({
                  Popup: (
                    <ActivityForm boardId={this.props.match.params.id} listId={list.id} activity={activity} />
                  )
                });
              }}><i className="fas fa-edit"></i></button>
              <button className="theme-text" title="Delete" onClick={() => {
                updateStore({
                  Popup: (
                    <DeleteActivity
                      boardId={this.props.match.params.id}
                      listId={list.id}
                      activity={activity}
                    />
                  )
                });
              }}><i className="fas fa-trash"></i></button>
              <button className="theme-text" title="Details" onClick={() => {
                updateStore({
                  Popup: (
                    <Popup>
                      <div id="details-popup">
                        <p className="container-title"><strong>{activity.name}</strong></p>
                        <p className="details">{activity.details}</p>
                        <button className="theme-default" onClick={() => {
                          updateStore({ Popup: null });
                        }}>Dismiss</button>
                      </div>
                    </Popup>
                  )
                });
              }}><i className="fas fa-external-link-alt"></i></button>
            </div>
          </div>
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

    return board.lists.map(list =>
      <div key={list.id} className="list">
        <div className="container-title">
          <p><strong>{list.name}</strong></p>
          <div className="buttons">
            <button className="theme-text" title="Edit" onClick={() => {
              updateStore({
                Popup: <ListForm boardId={board.id} list={list} />
              });
            }}><i className="fas fa-edit"></i></button>
            <button className="theme-text" title="Delete" onClick={() => {
              updateStore({
                Popup: <DeleteList boardId={board.id} list={list} />
              });
            }}>
              <i className="fas fa-trash"></i>
            </button>
            <button className="theme-text" title="Details" onClick={() => {
              updateStore({
                Popup: (
                  <Popup>
                    <div id="details-popup">
                      <p className="container-title"><strong>{list.name}</strong></p>
                      <p className="details">{list.details || 'No details provided.'}</p>
                      <button className="theme-default" onClick={() => {
                        updateStore({ Popup: null });
                      }}>Dismiss</button>
                    </div>
                  </Popup>
                )
              });
            }}><i className="fas fa-external-link-alt"></i></button>
          </div>
        </div>
        {this.displayListActivities(list)}
      </div>
    );
  }

  render () {
    const board = this.props.boards.find(board => board.id === this.props.match.params.id);

    if (!board) return <Redirect to="/" />;

    return (
      <div id="board-view">
        <div id="top-bar">
          <p id="back-button"><Link to="/"><i className="fas fa-chevron-circle-left"></i></Link></p>
          <div id="contents">
            <p><strong>{truncate(board.name, 10)}</strong></p>
            <p id="buttons">
              <button className="theme-text" onClick={this.displayCreateListForm}>Create list</button>
            </p>
          </div>
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
