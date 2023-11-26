<template>
  <h1 class="logo">
    <RouterLink class="logo__link" :to="{name: 'index'}">
      <img class="logo__image"
        src="@/assets/logo.svg"
        alt="Meetups"
        width="174"
        height="30"/>
    </RouterLink>
  </h1>
</template>

<script>
export default {
  name: 'MeetupsLogo',
};
</script>

<style scoped>
.logo,
.logo__link {
  display: block;
  font-weight: 900;
  font-size: 34px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 24px;
  text-transform: uppercase;
  color: var(--body-color);
  text-decoration: none;
}
</style>
