import React from 'react';
import { updateStore, store } from 'fluxible-js';

import Popup from '../../components/Popup';
import InlineError from '../../components/InlineError';
import { randomStr } from '../../helper-funcs/strings';

export default class ListForm extends React.Component {
  constructor (props) {
    super(props);

    if (this.props.list) {
      this.state = {
        name: {
          input: this.props.list.name,
          error: ''
        },
        details: this.props.list.details,
      };
    } else {
      this.state = {
        name: {
          input: '',
          error: ''
        },
        details: '',
      };
    }
  }

  cancel = () => {
    updateStore({ Popup: null });
  }

  saveList = ev => {
    ev.preventDefault();

    if (!this.state.name.input.trim()) {
      this.setState({
        ...this.state,
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

          if (this.props.list) {
            return {
              ...board,
              lists: board.lists.map(list => {
                if (list.id !== this.props.list.id) return list;

                return {
                  ...list,
                  name: this.state.name.input,
                  details: this.state.details.trim()
                };
              })
            };
          }

          return {
            ...board,
            lists: board.lists.concat({
              id: randomStr(),
              name: this.state.name.input,
              details: this.state.details.trim(),
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
      ...this.state,
      name: {
        input: ev.target.value,
        error: ev.target.value.trim()? '' : 'Please enter name of this list.'
      }
    });
  }

  detailsChanged = ev => {
    this.setState({
      ...this.state,
      details: ev.target.value
    });
  }

  render () {
    return (
      <Popup>
        <div id="create-list-form">
          <h1 className="container-title">
            {this.props.list ? 'Edit list' : 'Create list'}
          </h1>
          <form onSubmit={this.saveList}>
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
            <label>Details</label>
            <textarea
              className="theme-default width-max"
              value={this.state.details}
              onChange={this.detailsChanged}
              onBlur={this.detailsChanged}
              placeholder="* optional"
            />
            <br/>
            <input className="theme-default width-max spaced-atop" type="submit" value="Save" />
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
