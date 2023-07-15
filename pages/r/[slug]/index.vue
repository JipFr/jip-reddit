<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
	<Subreddit :subreddit="`r/${route.params.slug}`" />
</template>
