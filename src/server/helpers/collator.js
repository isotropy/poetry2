import ramda from "ramda";
import * as commentsAPI from "../comments";
import * as imageAPI from "../image";
import * as likesAPI from "../likes";

export async function getFullPost(post) {
  
  const ungroupedComments = await commentsAPI.getLatest(post.id);
  const imagedUngroupedComments = await Promise.all(
    ungroupedComments.map(async ungroupedComment => ({
      ...ungroupedComment,
      userPictureData: await imageAPI.getImage(ungroupedComment.userPicture)
    }))
  );
  const groupedComments = ramda.groupBy(c => c.parentCommentId || "root")(
    imagedUngroupedComments
  );
  const comments = groupedComments.root
    ? groupedComments.root.reduce(
        (acc, comment) =>
          acc.concat({ ...comment, children: groupedComments[comment.id] }),
        []
      )
    : [];

  const likes = await likesAPI.getLikes(post.id);

  const imageData = await imageAPI.getImage(post.image);

  return imageData
    ? {
        ...post,
        comments,
        likes,
        imageData
      }
    : {
        ...post,
        comments,
        likes
      };
}