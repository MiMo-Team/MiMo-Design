<template>
	<section class="app-main">
		<!--changing-over  work bench module-->
		<transition  leave-active-class="" enter-active-class="animated zoomInLeft">
			<router-view :key="key"></router-view>
		</transition>
	</section>
</template>

<script>
	export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>
