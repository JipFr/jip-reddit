<script lang="ts" setup>
import { ExpandedChild } from "~/types";
import { RouterLink } from "vue-router";

// Import icons
import ArrowUpIcon from "~/assets/icons/arrow-up.svg";
import CommentIcon from "~/assets/icons/message-square.svg";
import ZapIcon from "~/assets/icons/zap.svg";

const props = defineProps<{
	post: ExpandedChild;
	full?: boolean;
}>();
</script>

<template>
	<component
		:is="full ? 'div' : RouterLink"
		:to="`/r/${props.post.data.subreddit}/${props.post.data.name}`"
		class="post"
		:class="full && 'full'"
	>
		<Container>
			<MediaViewer no-margin v-if="full" :post="post" />
			<h3 class="title">
				<div v-if="props.post.data.madeByGender">
					<div class="gender-indicator" :gender="props.post.data.madeByGender">
						{{ props.post.data.madeByGender === "F" ? "💁‍♀️" : "🙋‍♂️" }}
					</div>
				</div>
				<span>
					<span class="zap-icon" v-if="props.post.data.stickied">
						<ZapIcon />
					</span>
					{{ props.post.data.cleanedTitle }}
				</span>
			</h3>
			<p
				v-if="props.post.data.selftext_html"
				class="description"
				v-html="props.post.data.selftext_html"
			/>

			<MediaViewer v-if="!full" :post="post" />

			<div class="bottom">
				<p class="author-info">
					By <strong>{{ props.post.data.author }}</strong> in
					<nuxt-link :to="`/r/${props.post.data.subreddit}`">
						<strong>r/{{ props.post.data.subreddit }}</strong>
					</nuxt-link>
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
	</component>
</template>

<style lang="scss" scoped>
.post {
	border-bottom: 1px solid var(--border);
	padding: 20px 0;
	color: inherit;
	text-decoration: none;
	display: block;

	&.full {
		padding-top: 0;

		.title {
			margin-top: 20px;
		}

		::v-deep(a) {
			color: var(--theme);
		}
	}

	&:not(.full) .description {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin: 0;

		::v-deep(*) {
			margin: 0;
		}
	}

	.description {
		margin-top: 10px;
		font-size: 14px;

		::v-deep(*) {
			font-size: inherit;
		}
	}

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

		.zap-icon {
			color: var(--theme);

			svg {
				display: inline-block;
				width: 1.5rem;
				height: 1.5rem;
			}
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
