import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Header } from './Header';
import { Subject } from './Subject';
import { Subjects } from './Subjects';
import { Login } from './Login';
import { Logout } from './Logout';
import { Signup } from './Signup';
import {
  signup,
  login,
  setLogout,
  getSubjects,
  getSubject,
  subjectsUpdated,
  getItems,
  createSubject,
  createItem,
} from './common';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
    };
  }

  findSubjectById(subjectId) {
    return this.state.subjects.filter(subject => subject.id === subjectId)[0];
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Subjects
                subjects={this.state.subjects}
                getSubjectsCallback={user_id => getSubjects(this, user_id)}
                createSubjectCallback={(title, user_id) => {
                  createSubject(this, title, user_id);
                }}
              />
            )}
          />
          <Route path="/login" render={() => <Login onClick={login} />} />
          <Route path="/logout" render={() => <Logout setLogout={setLogout} />} />
          <Route path="/signup" render={() => <Signup onClick={signup} />} />
          <Route
            path="/subjects/:id"
            render={props => (
              <Subject
                items={this.state.items}
                subject={this.state.subject}
                getItemsCallback={subject_id => getItems(this, subject_id)}
                getSubjectCallback={subject_id => getSubject(this, subject_id)}
                createItemsCallback={(name, subject_id) => {
                  createItem(this, name, subject_id);
                }}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
