<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
	<Subreddit full :subreddit="`by_id/${route.params.post}`" />
</template>
