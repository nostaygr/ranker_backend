import React from 'react';
import ReactDOM from 'react-dom';
import { createItem } from './common';

class ItemCreateForm extends React.Component {
  handleSubmit(event, subject_id, onClick) {
    event.preventDefault();
    const name = event.target.name.value;
    if (!name) {
      return;
    }
    onClick(name, subject_id);

    ReactDOM.findDOMNode(event.target.name).value = '';
  }

  render() {
    return (
      <form
        id="subject"
        className="commentForm"
        onSubmit={e => this.handleSubmit(e, this.props.subject_id, this.props.onClick)}
      >
        <input type="text" name="name" placeholder="name" />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export class Subject extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('login') === 'true') {
      this.props.getItemsCallback(this.props.match.params.id);
      this.props.getSubjectCallback(this.props.match.params.id);
    }
  }

  render() {
    const subject = this.props.subject;
    const items = this.props.items;
    if (subject) {
      return (
        // item を表示する
        <div>
          <div>{subject.title}</div>
          <table>
            {items &&
              items.map(item => (
                <tbody key={item.id}>
                  <tr>
                    <td>
                      {item.rank}:{item.name}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
          <ItemCreateForm
            subject_id={subject.id}
            onClick={(name, subject_id) => {
              this.props.createItemsCallback(name, subject_id);
            }}
          />
        </div>
      );
    }
    return <div>loading...</div>;
  }
}
