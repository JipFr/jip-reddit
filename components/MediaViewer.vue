<script lang="ts" setup>
import { ExpandedChild } from "~/types";

const { post } = defineProps<{
	post: ExpandedChild;
	noMargin?: boolean;
}>();
</script>

<template>
	<div
		v-if="(post.data.images || []).length > 0"
		class="imgs"
		:class="noMargin && 'no-margin'"
	>
		<img
			v-for="image of post.data.images || []"
			:key="image.url"
			:src="image.url"
			class="image"
		/>
	</div>
</template>

<style lang="scss" scoped>
.imgs {
	margin: 20px 0;
	width: calc(100% + var(--container-padding) * 2);
	margin-left: calc(var(--container-padding) * -1);
	max-width: calc(100% + var(--container-padding) * 2);
	overflow-x: auto;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	scroll-snap-type: x mandatory;
	max-height: var(--max-height);
	overflow-y: hidden;

	&.no-margin {
		margin-top: 0;
		margin-bottom: 0;
	}

	.image {
		scroll-snap-align: start;
		width: 100%;
		min-width: 100%;
		max-height: var(--image-max-height);
		object-fit: contain;
	}
}
</style>
