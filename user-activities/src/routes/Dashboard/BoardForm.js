import './styles.scss';

import React from 'react';
import { updateStore, store } from 'fluxible-js';
import InlineError from '../../components/InlineError';
import Popup from '../../components/Popup';
import { randomStr, trimSpaces } from '../../helper-funcs/strings';

export default class BoardForm extends React.Component {
  constructor (props) {
    super(props);

    if (this.props.board) {
      this.state = {
        name: {
          input: this.props.board.name,
          error: ''
        },
        details: this.props.board.details
      };
    } else {
      this.state = {
        name: {
          input: '',
          error: ''
        },
        details: ''
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

  detailsChanged = ev => {
    this.setState({
      ...this.state,
      details: ev.target.value
    });
  }

  saveBoard = ev => {
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
              name: trimSpaces(this.state.name.input),
              details: trimSpaces(this.state.details)
            };
          })
        });
      } else {
        updateStore({
          Popup: null,
          boards: store.boards.concat({
            id: randomStr(),
            name: trimSpaces(this.state.name.input),
            details: trimSpaces(this.state.details),
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
        <form id="create-board" onSubmit={this.saveBoard}>
          <h1 className="container-title">
            {this.props.board ? 'Edit board' : 'Create board'}
          </h1>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <label>Details</label>
            <textarea
              className="theme-default width-max"
              value={this.state.details}
              onChange={this.detailsChanged}
              onBlur={this.detailsChanged}
              placeholder="* Optional"
            />
          </div>
          <input type="submit" className="theme-default width-max" value="Save" />
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
