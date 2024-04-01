const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
    <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
    </article>
    `;
    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchCommentsForPost() {
  const postId = commentsFormElement.dataset.postid;

  // XMLHttpRequest
  // Axios 패키지

  try {
    const response = await fetch(`/posts/${postId}/comments`);

    if (!response.ok) {
      alert("Fetching comments failed!");
      return;
    }

    const responseData = await response.json();
    // console.log(responseData);

    if (responseData && responseData.length > 0) {
      const commentsListElement = createCommentsList(responseData);
      commentsSectionElement.innerHTML = ``;
      commentsSectionElement.appendChild(commentsListElement);
    } else {
      commentsSectionElement.firstElementChild.textContent =
        "We couldn't find any comments. Maybe add one?";
    }
  } catch (error) {
    alert("Getting comments failed!");
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = loadCommentsBtnElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  // console.log(enteredTitle, enteredText);

  const comment = { title: enteredTitle, text: enteredText };

  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // 400, 500 에러일때 처리
      fetchCommentsForPost();
    } else {
      alert("Could not send comments!");
    }
  } catch (error) {
    // 기술적 에러 처리 (인터넷 연결 없음 등 ...)
    alert("Could not send request - maybe try again later!");
  }
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener("submit", saveComment);
