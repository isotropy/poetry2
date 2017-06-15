import React, { Component } from "react";
import { connect } from "redux-jetpack";
import * as myProfileActions from "../../actions/my-profile";
import Posts from "../posts/posts";

class MyProfile extends Component {
  componentWillMount() {
    myProfileActions.getProfile(this.props.user.id);
    this.setState({
      open: "posts"
    });
  }

  handleClick(action) {
    this.setState({
      open: action
    });
  }

  render() {
    return (
      <div>
        <img src={this.props.user.image} />
        {this.props.user.name}
        <ul>
          <li>
            <a href="posts">My Posts</a>
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
        <Posts posts={this.props.myPosts.posts} user={this.props.user} />
      </div>
    );
  }
}

export default connect(MyProfile, state => state);
