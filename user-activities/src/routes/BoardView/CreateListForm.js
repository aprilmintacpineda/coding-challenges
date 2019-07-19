import React from 'react';
import { updateStore, store } from 'fluxible-js';

import Popup from '../../components/Popup';
import InlineError from '../../components/InlineError';
import { randomStr } from '../../helper-funcs/strings';

export default class CreateListForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: {
        input: '',
        error: ''
      }
    };
  }

  cancel = () => {
    updateStore({ Popup: null });
  }

  createList = ev => {
    ev.preventDefault();

    if (!this.state.name.input.trim()) {
      this.setState({
        name: {
          input: this.state.name.input,
          error: 'Please enter name of this list.'
        }
      });
    } else {
      updateStore({
        Popup: null,
        boards: store.boards.map(board => {
          if (board.id !== this.props.boardId) return board;

          return {
            ...board,
            lists: board.lists.concat({
              id: randomStr(),
              name: this.state.name.input,
              activities: [],
              created_at: Date.now()
            })
          };
        })
      });
    }
  }

  nameChanged = ev => {
    this.setState({
      name: {
        input: ev.target.value,
        error: ev.target.value.trim()? '' : 'Please enter name of this list.'
      }
    });
  }

  render () {
    return (
      <Popup>
        <div id="create-list-form">
          <h1 className="container-title">Create list</h1>
          <form onSubmit={this.createList}>
            <label>Name</label>
            <input
              className="theme-default width-max"
              type="text"
              value={this.state.name.input}
              onChange={this.nameChanged}
              onBlur={this.nameChanged}
              placeholder="* required"
            />
            <InlineError error={this.state.name.error} />
            <br/>
            <input className="theme-default width-max spaced-atop" type="submit" value="Create list" />
            <input
              className="theme-default scheme-danger width-max spaced-atop"
              type="button"
              value="Cancel"
              onClick={this.cancel}
            />
          </form>
        </div>
      </Popup>
    );
  }
}
