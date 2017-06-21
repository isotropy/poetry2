import React, { Component } from "react";
import Like from "./like";
import Comments from "./comments";

export default ({ post, user }) => {
  return (
    <li
      className="post"
      style={{
        backgroundImage: `url(${post.imageData})` || "none",
        backgroundColor: post.color || "none",
        backgroundSize: "cover"
      }}>
      <ul className="lines">{post.lines.split("\n").map(i => <li>{i}</li>)}</ul>
      <Like post={post} user={user} />
      <Comments post={post} user={user} />
    </li>
  );
};
