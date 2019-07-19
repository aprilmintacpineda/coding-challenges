import './styles.scss';

import React from 'react';
import { updateStore, store } from 'fluxible-js';
import InlineError from '../../components/InlineError';
import Popup from '../../components/Popup';
import { randomStr } from '../../helper-funcs/strings';

export default class BoardCreate extends React.Component {
  constructor (props) {
    super(props);

    if (this.props.board) {
      this.state = {
        name: {
          input: this.props.board.name,
          error: ''
        },
        description: this.props.board.description
      };
    } else {
      this.state = {
        name: {
          input: '',
          error: ''
        },
        description: ''
      };
    }
  }

  nameChanged = ev => {
    this.setState({
      ...this.state,
      name: {
        input: ev.target.value,
        error: ev.target.value.trim()? '' : 'Please enter the name of this board.'
      }
    });
  }

  descriptionChanged = ev => {
    this.setState({
      ...this.state,
      description: ev.target.value.trim()
    });
  }

  createBoard = ev => {
    ev.preventDefault();

    if (!this.state.name.input.trim()) {
      this.setState({
        ...this.state,
        name: {
          input: this.state.name.input,
          error: 'Please enter the name of this board.'
        }
      });
    } else {
      if (this.props.board) {
        updateStore({
          Popup: null,
          boards: store.boards.map(board => {
            if (board.id !== this.props.board.id) return board;

            return {
              ...board,
              name: this.state.name.input,
              description: this.state.description.trim()
            };
          })
        });
      } else {
        updateStore({
          Popup: null,
          boards: store.boards.concat({
            id: randomStr(),
            name: this.state.name.input,
            description: this.state.description.trim(),
            created_at: Date.now(),
            lists: []
          })
        });
      }
    }
  }

  cancel = () => {
    updateStore({ Popup: null });
  }

  render () {
    return (
      <Popup>
        <form id="create-board" onSubmit={this.createBoard}>
          <h1 className="container-title">Create board</h1>
          <div className="form-group">
            <label>Board name</label>
            <input
              className="theme-default width-max"
              type="text"
              value={this.state.name.input}
              onChange={this.nameChanged}
              onBlur={this.nameChanged}
              placeholder="* required"
            />
            <InlineError error={this.state.name.error} />
          </div>
          <div className="form-group">
            <label>Board description</label>
            <textarea
              className="theme-default width-max"
              value={this.state.description}
              onChange={this.descriptionChanged}
              onBlur={this.descriptionChanged}
              placeholder="* Optional"
            />
          </div>
          <input type="submit" className="theme-default width-max" value={this.props.board ? 'Save' : 'Create'} />
          <input
            type="button"
            className="theme-default scheme-danger spaced-atop width-max"
            value="Cancel"
            onClick={this.cancel}
          />
        </form>
      </Popup>
    )
  }
}
