<script setup>
import { expandPostData } from "../util/expandPostData";

const subreddit = ref("dune");
const posts = ref([]);
const after = ref(null);
const loading = ref(false);

async function loadMore() {
	if (loading.value) return;

	loading.value = true;

	const { data } = await fetch(
		`https://www.reddit.com/r/${subreddit.value}.json${
			after.value ? `?after=${after.value}` : ""
		}`
	).then((d) => d.json());

	after.value = data.after;

	const newPosts = await Promise.all(
		data.children.map(async (post) => {
			const expanded = await expandPostData(post);
			return expanded;
		})
	);

	posts.value = [...posts.value, ...newPosts];
	loading.value = false;
}

loadMore();

onMounted(() => {
	window.addEventListener("scroll", () => {
		if (
			window.innerHeight + window.scrollY >=
			document.body.offsetHeight - 500
		) {
			loadMore();
		}
	});
});
</script>

<template>
	<div class="posts">
		<RedditPost v-for="post of posts" :key="post.data.id" :post="post" />
	</div>
</template>
