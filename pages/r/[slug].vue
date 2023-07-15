<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
	<Subreddit :subreddit="route.params.slug" />
</template>
