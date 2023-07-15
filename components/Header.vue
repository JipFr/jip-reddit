<script lang="ts" setup>
function tmpThing() {
	location.href = `/r/${prompt("Enter subreddit")}`;
}
</script>

<template>
	<header>
		<Container>
			<nuxt-link to="/" class="logo">LOGO</nuxt-link>
			<p @click="tmpThing">Temporary switcher</p>
		</Container>
	</header>
</template>

<style lang="scss" scoped>
header {
	position: fixed;
	background: var(--body);
	padding-top: env(safe-area-inset-top);
	border-bottom: 1px solid var(--border);
	top: 0;
	left: 0;
	width: 100%;
	height: var(--header-height);

	.logo {
		font-weight: 600;
	}

	p {
		margin: 0;
	}
}
.container {
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	a {
		color: inherit;
		text-decoration: none;
	}
}
</style>
