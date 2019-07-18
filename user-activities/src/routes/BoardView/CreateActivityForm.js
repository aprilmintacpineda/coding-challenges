import React from 'react';
import { updateStore, store } from 'fluxible-js';
import Popup from '../../components/Popup';
import InlineError from '../../components/InlineError';
import { categories, statuses } from '../../constants';

export default class CreateActivityForm extends React.Component {
  constructor (props) {
    super(props);

    this.nameErrorMessage = 'Please enter the name of this activity.';
    this.detailsErrorMessage = 'Please enter the details of this activity.';

    this.state = {
      name: {
        input: '',
        error: ''
      },
      category: categories[0].id,
      status: statuses[0].id,
      details: {
        input: '',
        error: ''
      },
      due: new Date().format('%y-%M-%D')
    };
  }

  createActivity = ev => {
    ev.preventDefault();

    const nameError = this.state.name.input.trim() ? '' : this.nameErrorMessage;
    const detailsError = this.state.details.input.trim() ? '' : this.detailsErrorMessage;

    if (nameError || detailsError) {
      this.setState({
        ...this.state,
        details: {
          input: this.state.details.input,
          error: detailsError
        },
        name: {
          input: this.state.name.input,
          error: nameError
        }
      });
    } else {
      updateStore({
        Popup: null,
        boards: store.boards.map(board => {
          if (board.id !== this.props.boardId) return board;

          return {
            ...board,
            lists: board.lists.map(list => {
              if (list.id !== this.props.listId) return list;

              return {
                ...list,
                activities: list.activities.concat({
                  name: this.state.name.input,
                  details: this.state.details.input,
                  category: categories.find(category => category.id === this.state.category),
                  status: statuses.find(status => status.id === this.state.status),
                  due: this.state.due
                })
              }
            })
          };
        })
      });
    }
  }

  categoryChanged = ev => {
    for (let a = categories.length - 1; a >= 0; a--) {
      if (categories[a].id === ev.target.value) {
        this.setState({
          ...this.state,
          category: ev.target.value
        });

        break;
      }
    }
  }

  statusChanged = ev => {
    for (let a = statuses.length - 1; a >= 0; a--) {
      if (statuses[a].id === ev.target.value) {
        this.setState({
          ...this.state,
          status: ev.target.value
        });

        break;
      }
    }
  }

  nameChanged = ev => {
    this.setState({
      ...this.state,
      name: {
        input: ev.target.value,
        error: ev.target.value.trim() ? '' : this.nameErrorMessage
      }
    });
  }

  detailsChanged = ev => {
    this.setState({
      ...this.state,
      details: {
        input: ev.target.value,
        error: ev.target.value.trim() ? '' : this.detailsErrorMessage
      }
    });
  }

  dueChanged = ev => {
    this.setState({
      ...this.state,
      due: ev.target.value
    });
  }

  cancel = () => {
    updateStore({
      Popup: null
    });
  }

  render () {
    return (
      <Popup>
        <form id="create-activity-form" onSubmit={this.createActivity}>
          <h1 className="container-title">Create Activity</h1>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="theme-default width-max"
              value={this.state.name.input}
              onChange={this.nameChanged}
              onBlur={this.nameChanged}
              placeholder="* required"
            />
            <InlineError error={this.state.name.error} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              className="theme-default width-max"
              value={this.state.category}
              onChange={this.categoryChanged}
              onBlur={this.categoryChanged}
            >
              {categories.map(category =>
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              className="theme-default width-max"
              value={this.state.status.input}
              onChange={this.statusChanged}
              onBlur={this.statusChanged}
            >
              {statuses.map(status =>
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label>Details</label>
            <textarea
              className="theme-default width-max"
              value={this.state.details.input}
              placeholder="* required"
              onChange={this.detailsChanged}
              onBlur={this.detailsChanged}
            />
            <InlineError error={this.state.details.error} />
          </div>
          <div className="form-group">
            <label>Due</label>
            <input
              className="theme-default width-max"
              type="date"
              value={this.state.due}
              onChange={this.dueChanged}
              onBlur={this.dueChanged}
            />
          </div>
          <input type="submit" className="theme-default width-max" value="Create activity" />
          <input type="button" className="theme-default scheme-danger width-max spaced-atop" value="Cancel" onClick={this.cancel} />
        </form>
      </Popup>
    );
  }
}
