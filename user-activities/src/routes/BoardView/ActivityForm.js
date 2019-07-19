import React from 'react';
import { updateStore, store } from 'fluxible-js';
import Popup from '../../components/Popup';
import InlineError from '../../components/InlineError';
import { randomStr } from '../../helper-funcs/strings';

const categories = [
  {
    id: '1',
    label: 'Personal'
  },
  {
    id: '2',
    label: 'Business'
  },
  {
    id: '3',
    label: 'Fitness'
  },
  {
    id: '4',
    label: 'Fun'
  }
];

const statuses = [
  {
    id: '1',
    label: 'Incomplete'
  },
  {
    id: '2',
    label: 'Complete'
  }
];

const months = [
  {
    value: '1',
    label: 'January'
  },
  {
    value: '2',
    label: 'February'
  },
  {
    value: '3',
    label: 'March'
  },
  {
    value: '4',
    label: 'April'
  },
  {
    value: '5',
    label: 'May'
  },
  {
    value: '6',
    label: 'June'
  },
  {
    value: '7',
    label: 'July'
  },
  {
    value: '8',
    label: 'August'
  },
  {
    value: '9',
    label: 'September'
  },
  {
    value: '10',
    label: 'October'
  },
  {
    value: '11',
    label: 'November'
  },
  {
    value: '12',
    label: 'December'
  }
];

const monthsOptions = months.map(month => <option key={month.value} value={month.value}>{month.label}</option>);

const currentYear = new Date().getFullYear();
const minYear = currentYear - 10;
const maxYear = currentYear + 10;
const yearsOptions = (() => {
  const options = [];

  for (let a = maxYear; a > minYear; a--) options.push(<option key={a} value={a}>{a}</option>);
  return options;
})();

const hoursOptions = (() => {
  const options = [];

  for (let a = 1; a <= 12; a++) options.push(<option key={a} value={a}>{a}</option>);
  return options;
})();

const minutesOptions = (() => {
  const options = [];

  for (let a = 0; a <= 59; a++) options.push(<option key={a} value={a}>{a}</option>);
  return options;
})();

export default class ActivityForm extends React.Component {
  constructor (props) {
    super(props);

    this.nameErrorMessage = 'Please enter the name of this activity.';
    this.detailsErrorMessage = 'Please enter the details of this activity.';

    if (this.props.activity) {
      this.state = {
        name: {
          input: this.props.activity.name,
          error: ''
        },
        category: this.props.activity.category.id,
        status: this.props.activity.status.id,
        details: {
          input: this.props.activity.details,
          error: ''
        },
        due: {
          month: this.props.activity.due.month,
          date: this.props.activity.due.date,
          year: this.props.activity.due.year,
          hours: this.props.activity.due.hours,
          minutes: this.props.activity.due.minutes,
          meridiem: this.props.activity.due.meridiem
        }
      };
    } else {
      const currentDate = new Date();

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
        due: {
          month: (currentDate.getMonth() + 1).toString(),
          date: currentDate.getDate().toString(),
          year: currentDate.getFullYear().toString(),
          hours: (currentDate.getHours() % 12 || 12).toString(),
          minutes: currentDate.getMinutes().toString(),
          meridiem: 'am'
        }
      };
    }
  }

  saveActivity = ev => {
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

              if (this.props.activity) {
                return {
                  ...list,
                  activities: list.activities.map(activity => {
                    if (activity.id !== this.props.activity.id) return activity;

                    return {
                      ...activity,
                      name: this.state.name.input,
                      details: this.state.details.input,
                      category: categories.find(category => category.id === this.state.category),
                      status: statuses.find(status => status.id === this.state.status),
                      due: this.state.due
                    };
                  })
                }
              }

              return {
                ...list,
                activities: list.activities.concat({
                  id: randomStr(),
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

  dueYearChanged = ev => {
    try {
      const year = parseInt(ev.target.value);

      if (year >= minYear && year <= maxYear) {
        this.setState({
          ...this.state,
          due: {
            ...this.state.due,
            date: 1,
            year
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  dueMonthChanged = ev => {
    if (months.find(month => month.value === ev.target.value)) {
      this.setState({
        ...this.state,
        due: {
          ...this.state.due,
          month: ev.target.value,
          date: 1
        }
      });
    }
  }

  dueDateChanged = ev => {
    const date = parseInt(ev.target.value);

    if (
      date >= 1 &&
      date <= new Date(this.state.due.year, this.state.due.month, 0).getDate()
    ) {
      this.setState({
        ...this.state,
        due: {
          ...this.state.due,
          date: ev.target.value
        }
      });
    }
  }

  dueHoursChanged = ev => {
    const hours = parseInt(ev.target.value);

    if (hours >= 1 && hours <= 12) {
      this.setState({
        ...this.state,
        due: {
          ...this.state.due,
          hours: ev.target.value
        }
      });
    }
  }

  dueMinutesChanged = ev => {
    const minutes = parseInt(ev.target.value);

    if (minutes >= 0 && minutes <= 59) {
      this.setState({
        ...this.state,
        due: {
          ...this.state.due,
          minutes: ev.target.value
        }
      });
    }
  }

  dueMeridiemChanged = ev => {
    if (ev.target.value === 'am' || ev.target.value === 'pm') {
      this.setState({
        ...this.state,
        due: {
          ...this.state.due,
          meridiem: ev.target.value
        }
      });
    }
  }

  cancel = () => {
    updateStore({ Popup: null });
  }

  render () {
    return (
      <Popup>
        <form id="create-activity-form" onSubmit={this.saveActivity}>
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
              value={this.state.status}
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
            <label>Due date</label>
            <select
              className="theme-default"
              value={this.state.due.year}
              onChange={this.dueYearChanged}
              onBlur={this.dueYearChanged}
            >{yearsOptions}</select>
            <select
              className="theme-default"
              value={this.state.due.month}
              onChange={this.dueMonthChanged}
              onBlur={this.dueMonthChanged}
            >{monthsOptions}</select>
            <select
              className="theme-default"
              value={this.state.due.date}
              onChange={this.dueDateChanged}
              onBlur={this.dueDateChanged}
            >
              {(() => {
                const maxDate = new Date(this.state.due.year, this.state.due.month, 0).getDate();
                const options = [];

                for (let a = 1; a <= maxDate; a++) options.push(<option key={a} value={a}>{a}</option>);
                return options;
              })()}
            </select>
          </div>
          <div className="form-group">
            <label>Due time</label>
            <select
              className="theme-default"
              value={this.state.due.hours}
              onChange={this.dueHoursChanged}
              onBlur={this.dueHoursChanged}
            >{hoursOptions}</select>
            <select
              className="theme-default"
              value={this.state.due.minutes}
              onChange={this.dueMinutesChanged}
              onBlur={this.dueMinutesChanged}
            >{minutesOptions}</select>
            <select
              className="theme-default"
              value={this.state.due.meridiem}
              onChange={this.dueMeridiemChanged}
              onBlur={this.dueMeridiemChanged}
            >
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </div>
          <input type="submit" className="theme-default width-max" value="Save" />
          <input type="button" className="theme-default scheme-danger width-max spaced-atop" value="Cancel" onClick={this.cancel} />
        </form>
      </Popup>
    );
  }
}
