import React, { Component } from "react";
import { connect } from "redux-jetpack";
import { Switch } from "react-router-dom";
import Route from "../../route";
import * as usersActions from "../../actions/users";
import * as postsActions from "../../actions/posts";
import MyPosts from "./my-posts";
import Notifications from "./notifications";
import Activity from "./activity";

class MyProfile extends Component {
  componentWillMount() {
    usersActions.getMyProfile(this.props.auth.sessionId);
    postsActions.getPostsByUser(this.props.auth.sessionId, this.props.user.id);
  }

  render() {
    return !this.props.user
      ? <div>Loading</div>
      : <div>
          <img src={this.props.user.imageData} />
          {this.props.user.userFullName}
          <ul>
            <li>
              <a href="/my-profile/posts">My Posts</a>
            </li>
            <li>
              <a href="/my-profile/notifications">
                Notifications
              </a>
            </li>
            <li>
              <a href="/my-profile/activity">
                Activity
              </a>
            </li>
          </ul>
          <Switch>
            <Route path="/my-profile/notifications" component={Notifications} />
            <Route path="/my-profile/activity" component={Activity} />
            <Route path="/my-profile/posts" component={MyPosts} />
            <Route exact path="/my-profile" component={MyPosts} />
          </Switch>
        </div>;
  }
}

export default connect(MyProfile, state => ({
  user: state.user,
  posts: state.posts,
  auth: state.auth
}));
