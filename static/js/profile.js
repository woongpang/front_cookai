async function loadUserFollowing(currentFollowPage) {
	const response = await getUserFollowList(currentFollowPage);
	const followListResponse = await response.json();
	const followPageList = document.getElementById("follow-page");
	followPageList.style.display = "flex";
	followPageList.innerHTML = "";
	followPageList.innerText = "팔로잉 목록";
	console.log(followListResponse);
	if (followListResponse !== []) {
		followListResponse.results.forEach((result) => {
			const followList = document.createElement("div");
			followList.setAttribute("id", "follow-list");
			followList.setAttribute("class", "follow-list");
			if (result.avatar) {
				userAvatar = result.avatar;
			} else {
				userAvatar = "/static/img/no_avatar.png";
			}
			followList.innerHTML = `
				<img id="follow-avatar" class="follow-avatar" src=${userAvatar} onclick="location.href='${FRONT_BASE_URL}/profile.html?user_id=${result.id}'" style="cursor:pointer;">
                <div id="follow-name" class="follow-name" onclick="location.href='${FRONT_BASE_URL}/profile.html?user_id=${result.id}'" style="cursor:pointer;">${result.username}</div>
			`;
			followPageList.appendChild(followList);
		});
	}

	const pagination = document.createElement("div");
	pagination.setAttribute("class", "pagination");
	pagination.innerHTML = "";

	const pageCount = followListResponse.count / 10 + 1;
	for (i = 1; i < pageCount; i++) {
		const newPageLink = document.createElement("div");
		newPageLink.setAttribute("class", "page-link");
		newPageLink.setAttribute("onclick", `loadUserFollowing(${i})`);
		newPageLink.innerText = i;
		pagination.append(newPageLink);
		followPageList.appendChild(pagination);
	}
}
async function loadUserFollower(currentFollowPage) {
	const response = await getUserFollowList(currentFollowPage, 1);
	const followListResponse = await response.json();
	const followingList = await getUserFollowing();
	const followingIdList = followingList.map((item) => item.id);
	const followPageList = document.getElementById("follow-page");
	followPageList.style.display = "flex";
	followPageList.innerHTML = "";
	followPageList.innerText = "팔로워 목록";
	console.log(followListResponse);
	if (followListResponse !== []) {
		followListResponse.results.forEach((result) => {
			console.log(result.id in followingIdList ? "팔로우" : "언팔로우");
			const followList = document.createElement("div");
			followList.setAttribute("id", "follow-list");
			followList.setAttribute("class", "follow-list");
			if (result.avatar) {
				userAvatar = result.avatar;
			} else {
				userAvatar = "/static/img/no_avatar.png";
			}
			followList.innerHTML = `
				<img id="follow-avatar" class="follow-avatar" src=${userAvatar} onclick="location.href='${FRONT_BASE_URL}/profile.html?user_id=${result.id}'" style="cursor:pointer;">
                <div id="follow-name" class="follow-name" onclick="location.href='${FRONT_BASE_URL}/profile.html?user_id=${result.id}'" style="cursor:pointer;">${result.username}</div>
			`;

			followPageList.appendChild(followList);
		});
	}
	const pagination = document.createElement("div");
	pagination.setAttribute("class", "pagination");
	pagination.innerHTML = "";

	const pageCount = followListResponse.count / 10 + 1;
	for (i = 1; i < pageCount; i++) {
		const newPageLink = document.createElement("div");
		newPageLink.setAttribute("class", "page-link");
		newPageLink.setAttribute("onclick", `loadUserFollower(${i})`);
		newPageLink.innerText = i;
		pagination.append(newPageLink);
		followPageList.appendChild(pagination);
	}
}
async function loadUserBookmarkArticle(currentPage) {
	const userResponse = await getUserDetail();
	const userId = new URLSearchParams(window.location.search).get("user_id");
	const response = await getUserFeedArticles(userId, 2, currentPage);
	const bookmarkResponse = await response.json();
	const articleContainer = document.getElementById("article");
	console.log("article", bookmarkResponse);
	articleContainer.innerHTML = "";
	articleContainer.innerText = `${userResponse.username}의 북마크`;
	const totalArticles = document.createElement("div");
	totalArticles.setAttribute("class", "user-detail-child");
	totalArticles.setAttribute("id", "total_articles");
	totalArticles.innerText = `게시글 : ${bookmarkResponse.count}`;
	articleContainer.appendChild(totalArticles);
	bookmarkResponse.results.forEach((result) => {
		const articleContent = document.createElement("div");
		const articleImage = result.avatar
			? result.avatar
			: "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2";
		articleContent.innerHTML = `
		<div id="article-container" class="article-container" onclick="location.href='${FRONT_BASE_URL}/articles/article_detail.html?article_id=${
			result.id
		}'" style="cursor:pointer">
					<img id="article-image" class="article-image" src=${articleImage}/>
                    <div id="article-content" class="article-content">
                        <div id="article-content__title" class="article-content__title">${result.title.slice(
													0,
													15
												)}...</div>
                        <div id="article-content__user" class="article-content__user">${
													result.user
												}</div>
                        <div id="article-content-count" class="article-content-count">
                            <div id="article-content__likes_count" class="article-content__likes_count"><i class="bi bi-heart-fill"></i> ${
															result.likes_count
														}</div>
                            <div id="article-content__comments_count" class="article-content__comments_count">댓글 수: ${
															result.comments_count
														}</div>
                            <div id="article-content__edit" class="article-content__edit" style="visibility:hidden;"></div>
                        </div>
                    </div>
					</div>
		`;
		articleContainer.appendChild(articleContent);
	});
	const pagination = document.createElement("div");
	pagination.setAttribute("class", "pagination");
	pagination.innerHTML = "";

	const pageCount = bookmarkResponse.count / 4 + 1;
	for (i = 1; i < pageCount; i++) {
		const newPageLink = document.createElement("div");
		newPageLink.setAttribute("class", "page-link");
		newPageLink.setAttribute("onclick", `loadUserArticle(${i})`);
		newPageLink.innerText = i;
		pagination.append(newPageLink);
		articleContainer.appendChild(pagination);
	}
}
async function loadUserLikeArticle(currentPage) {
	const userResponse = await getUserDetail();
	const userId = new URLSearchParams(window.location.search).get("user_id");
	const response = await getUserFeedArticles(userId, 1, currentPage);
	const likeArticleResponse = await response.json();
	const articleContainer = document.getElementById("article");
	console.log("article", likeArticleResponse);
	articleContainer.innerHTML = "";
	articleContainer.innerText = `${userResponse.username}의 좋아요 게시글`;
	const totalArticles = document.createElement("div");
	totalArticles.setAttribute("class", "user-detail-child");
	totalArticles.setAttribute("id", "total_articles");
	totalArticles.innerText = `게시글 : ${likeArticleResponse.count}`;
	articleContainer.appendChild(totalArticles);
	likeArticleResponse.results.forEach((result) => {
		const articleContent = document.createElement("div");
		const articleImage = result.avatar
			? result.avatar
			: "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2";
		articleContent.innerHTML = `
		<div id="article-container" class="article-container" onclick="location.href='${FRONT_BASE_URL}/articles/article_detail.html?article_id=${
			result.id
		}'" style="cursor:pointer">
					<img id="article-image" class="article-image" src=${articleImage}/>
                    <div id="article-content" class="article-content">
                        <div id="article-content__title" class="article-content__title">${result.title.slice(
													0,
													15
												)}...</div>
                        <div id="article-content__user" class="article-content__user">${
													result.user
												}</div>
                        <div id="article-content-count" class="article-content-count">
                            <div id="article-content__likes_count" class="article-content__likes_count"><i class="bi bi-heart-fill"></i> ${
															result.likes_count
														}</div>
                            <div id="article-content__comments_count" class="article-content__comments_count">댓글 수: ${
															result.comments_count
														}</div>
                            <div id="article-content__edit" class="article-content__edit" style="visibility:hidden;"></div>
                        </div>
                    </div>
					</div>
		`;
		articleContainer.appendChild(articleContent);
	});
	const pagination = document.createElement("div");
	pagination.setAttribute("class", "pagination");
	pagination.innerHTML = "";

	const pageCount = likeArticleResponse.count / 4 + 1;
	for (i = 1; i < pageCount; i++) {
		const newPageLink = document.createElement("div");
		newPageLink.setAttribute("class", "page-link");
		newPageLink.setAttribute("onclick", `loadUserArticle(${i})`);
		newPageLink.innerText = i;
		pagination.append(newPageLink);
		articleContainer.appendChild(pagination);
	}
}
async function loadUserLikeComment(currentCommentPage) {
	const userResponse = await getUserDetail();
	const response = await getUserComment(currentCommentPage, 1);
	const commentContainer = document.getElementById("comment");
	commentContainer.innerHTML = "";
	commentContainer.innerText = `${userResponse.username}이 좋아하는 댓글`;
	console.log("comment", response);
	const totalComments = document.createElement("div");
	totalComments.innerText = `댓글 : ${response.count}`;
	totalComments.setAttribute("class", "user-detail-child");
	totalComments.setAttribute("id", "total_comments");
	commentContainer.appendChild(totalComments);
	response.results.forEach((result) => {
		const commentContent = document.createElement("div");
		commentContent.innerHTML = `
				<div class="comment-container" id="comment-container">
                    <div class="comment-text" id="comment-text">내용 : ${result.comment.slice(
											0,
											25
										)}...
					</div>
                    <div class="comment-detail" id="comment-detail">
                        <div class="comment-article" id="comment-article" onclick="location.href='${FRONT_BASE_URL}/articles/article_detail.html?article_id=${
			result.article
		}'" style="cursor:pointer">게시글 보러 가기</div>
                        <div class="comment-updated" id="comment-updated">
						${result.updated_at.slice(0, 10)}
                        </div>
                        <div class="comment-like" id="comment-like">
                            <i class="bi bi-hand-thumbs-up"></i> ${
															result.likes_count
														}
                        </div>
                    </div>
                </div>
	`;
		commentContainer.appendChild(commentContent);
	});
	const commentPagination = document.createElement("div");
	commentPagination.setAttribute("class", "pagination");
	commentPagination.innerHTML = "";

	const pageCount = response.count / 4 + 1;
	for (i = 1; i < pageCount; i++) {
		const newPageLink = document.createElement("div");
		newPageLink.setAttribute("class", "page-link");
		newPageLink.setAttribute("onclick", `loadUserComment(${i})`);
		newPageLink.innerText = i;
		commentPagination.append(newPageLink);
		commentContainer.appendChild(commentPagination);
	}
}
async function loadUserDetail() {
	const userResponse = await getUserDetail();
	const followingList = await getUserFollowing();
	const followingIdList = followingList.map((item) => item.id);
	console.log(userResponse);
	const avatar = document.getElementById("mypage-avatar");
	const username = document.getElementById("username");
	username.innerText = `${userResponse.username}`;
	avatar.setAttribute(
		"src",
		userResponse.avatar ? userResponse.avatar : "/static/img/no_avatar.png"
	);
	const followBtn = document.getElementById("following-btn");
	if (userResponse.id in followingIdList) {
		followBtn.innerText = "Unfollow";
	} else {
		followBtn.innerText = "Follow";
	}
	const following = document.getElementById("following");
	following.innerText = `팔로잉 : ${userResponse.total_followings}`;
	following.addEventListener("click", () => {
		loadUserFollowing();
	});
	const follower = document.getElementById("follower");
	follower.innerText = `팔로워 : ${userResponse.total_followers}`;
	follower.addEventListener("click", () => {
		loadUserFollower();
	});
	const bookmark = document.getElementById("bookmark-article");
	bookmark.innerText = `북마크한 게시글 : ${userResponse.total_bookmark_articles}`;
	bookmark.addEventListener("click", () => {
		loadUserBookmarkArticle();
	});
	const likeArticle = document.getElementById("like-article");
	likeArticle.innerText = `좋아요 누른 게시글 : ${userResponse.total_like_articles}`;
	likeArticle.addEventListener("click", () => {
		loadUserLikeArticle();
	});
	const likeComment = document.getElementById("like-comment");
	likeComment.innerText = `좋아요 누른 댓글 : ${userResponse.total_like_comments}`;
	likeComment.addEventListener("click", () => {
		loadUserLikeComment();
	});
}
async function loadUserArticle(currentPage) {
	const userResponse = await getUserDetail();
	const response = await getUserArticle(currentPage);
	const articleContainer = document.getElementById("article");
	console.log("article", response);
	articleContainer.innerHTML = "";
	articleContainer.innerText = `${userResponse.username}의 글`;
	const totalArticles = document.createElement("div");
	totalArticles.setAttribute("class", "user-detail-child");
	totalArticles.setAttribute("id", "total_articles");
	totalArticles.innerText = `게시글 : ${response.count}`;
	articleContainer.appendChild(totalArticles);
	response.results.forEach((result) => {
		const articleContent = document.createElement("div");
		const articleImage = result.avatar
			? result.avatar
			: "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2";
		articleContent.innerHTML = `
		<div id="article-container" class="article-container" onclick="location.href='${FRONT_BASE_URL}/articles/article_detail.html?article_id=${
			result.id
		}'" style="cursor:pointer">
					<img id="article-image" class="article-image" src=${articleImage}/>
                    <div id="article-content" class="article-content">
                        <div id="article-content__title" class="article-content__title">${result.title.slice(
													0,
													15
												)}...</div>
                        <div id="article-content__user" class="article-content__user">${
													result.user
												}</div>
                        <div id="article-content-count" class="article-content-count">
                            <div id="article-content__likes_count" class="article-content__likes_count"><i class="bi bi-heart-fill"></i> ${
															result.likes_count
														}</div>
                            <div id="article-content__comments_count" class="article-content__comments_count">댓글 수: ${
															result.comments_count
														}</div>
                            <div id="article-content__edit" class="article-content__edit" style="visibility:hidden;"></div>
                        </div>
                    </div>
					</div>
		`;
		articleContainer.appendChild(articleContent);
	});
	const pagination = document.createElement("div");
	pagination.setAttribute("class", "pagination");
	pagination.innerHTML = "";

	const pageCount = response.count / 4 + 1;
	for (i = 1; i < pageCount; i++) {
		const newPageLink = document.createElement("div");
		newPageLink.setAttribute("class", "page-link");
		newPageLink.setAttribute("onclick", `loadUserArticle(${i})`);
		newPageLink.innerText = i;
		pagination.append(newPageLink);
		articleContainer.appendChild(pagination);
	}
}
async function loadUserComment(currentCommentPage) {
	const userResponse = await getUserDetail();
	const response = await getUserComment(currentCommentPage);
	const commentContainer = document.getElementById("comment");
	commentContainer.innerHTML = "";
	commentContainer.innerText = `${userResponse.username}의 댓글`;
	console.log("comment", response);
	const totalComments = document.createElement("div");
	totalComments.innerText = `댓글 : ${response.count}`;
	totalComments.setAttribute("class", "user-detail-child");
	totalComments.setAttribute("id", "total_comments");
	commentContainer.appendChild(totalComments);
	response.results.forEach((result) => {
		const commentContent = document.createElement("div");
		commentContent.innerHTML = `
				<div class="comment-container" id="comment-container">
                    <div class="comment-text" id="comment-text">내용 : ${result.comment.slice(
											0,
											25
										)}...
					</div>
                    <div class="comment-detail" id="comment-detail">
                        <div class="comment-article" id="comment-article" onclick="location.href='${FRONT_BASE_URL}/articles/article_detail.html?article_id=${
			result.article
		}'" style="cursor:pointer">게시글 보러 가기</div>
                        <div class="comment-updated" id="comment-updated">
						${result.updated_at.slice(0, 10)}
                        </div>
                        <div class="comment-like" id="comment-like">
                            <i class="bi bi-hand-thumbs-up"></i> ${
															result.likes_count
														}
                        </div>
                    </div>
                </div>
	`;
		commentContainer.appendChild(commentContent);
	});
	const commentPagination = document.createElement("div");
	commentPagination.setAttribute("class", "pagination");
	commentPagination.innerHTML = "";

	const pageCount = response.count / 4 + 1;
	for (i = 1; i < pageCount; i++) {
		const newPageLink = document.createElement("div");
		newPageLink.setAttribute("class", "page-link");
		newPageLink.setAttribute("onclick", `loadUserComment(${i})`);
		newPageLink.innerText = i;
		commentPagination.append(newPageLink);
		commentContainer.appendChild(commentPagination);
	}
}
async function loaderFunction() {
	await loadUserDetail();
	await loadUserArticle();
	await loadUserComment();
}
