<template>
	<header>
		<Container>
			<p class="logo">LOGO</p>
			<p>...</p>
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
}
.container {
	display: flex;
	justify-content: space-between;
}
</style>
