<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
	<div class="post-page">
		<Subreddit full :subreddit="`by_id/${route.params.post}`" />
		<RedditComments :post-id="route.params.post" />
	</div>
</template>

<style lang="scss">
.post-page {
	--image-max-height: 40vh;
}
</style>
