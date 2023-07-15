<script lang="ts" setup>
import { ExpandedChild } from "../../types";

import { decodeHTML } from "~/util/expandPostData";

// Import icons
import ArrowUpIcon from "~/assets/icons/arrow-up.svg";
import CommentIcon from "~/assets/icons/message-square.svg";

const props = defineProps<{
	post: ExpandedChild;
}>();
</script>

<template>
	<div class="post">
		<Container>
			<h3 class="title">
				<div v-if="props.post.data.madeByGender">
					<div class="gender-indicator" :gender="props.post.data.madeByGender">
						{{ props.post.data.madeByGender === "F" ? "💁‍♀️" : "🙋‍♂️" }}
					</div>
				</div>
				{{ props.post.data.cleanedTitle }}
			</h3>
			<p
				v-if="props.post.data.selftext_html"
				class="description"
				v-html="props.post.data.selftext_html"
			/>
			<div
				v-if="(props.post.data.preview?.images || []).length > 0"
				class="imgs"
			>
				<img
					v-for="image of props.post.data.preview?.images || []"
					:key="image.source.url"
					:src="decodeHTML(image.source.url || '')"
					class="image"
				/>
			</div>
			<div class="bottom">
				<p class="author-info">
					By <strong>{{ props.post.data.author }}</strong> in
					<strong>r/{{ props.post.data.subreddit }}</strong>
				</p>
				<div class="info-bits">
					<div class="info-with-icon comments">
						<CommentIcon />
						{{ props.post.data.num_comments }}
					</div>
					<div class="info-with-icon score">
						<ArrowUpIcon />
						{{ props.post.data.score }}
					</div>
				</div>
			</div>
		</Container>
	</div>
</template>

<style lang="scss" scoped>
.post {
	border-bottom: 1px solid var(--border);
	padding: 20px 0;

	::v-deep(a) {
		color: inherit;
		touch-action: none;
		text-decoration: none;
	}

	::v-deep(hr) {
		display: none;
	}

	.title {
		display: flex;
		font-size: 1rem;
		color: var(--text);
		margin: 0;
	}

	.description {
		margin: 0;
		margin-top: 10px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 14px;

		::v-deep(*) {
			font-size: inherit;
			margin: 0;
		}
	}

	.imgs {
		margin: 20px 0;
		width: calc(100% + var(--container-padding) * 2);
		margin-left: calc(var(--container-padding) * -1);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-gap: 10px;

		.image {
			width: 100%;
		}
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		margin-top: 15px;

		.info-bits {
			display: flex;
			align-items: center;
			gap: 10px;

			.info-with-icon {
				display: flex;
				align-items: center;
				gap: 5px;
			}

			svg {
				width: 1rem;
				height: 1rem;
				display: block;
				margin-bottom: 0;
			}
		}
	}

	.author-info {
		margin: 0;
		font-weight: 600;

		strong {
			color: var(--text);
		}
	}

	.gender-indicator {
		display: inline-block;
		margin-right: 10px;
		padding: 0 5px;
		padding-top: 6px;
		border-radius: 3px;
		font-size: 1.3em;
		line-height: 0.9;

		&[gender="F"] {
			background: rgba(252, 97, 255, 0.25);
		}

		&[gender="M"] {
			background: rgba(71, 117, 187, 0.2);
		}
	}
}
</style>
