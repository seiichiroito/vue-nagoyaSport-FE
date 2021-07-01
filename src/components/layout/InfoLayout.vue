<template>
  <section class="bg-light info">
    <div class="app-container max-w-3xl py-8 px-6">
      <BackButton />
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss">
.info {
  h1 {
    font-size: 1.5rem;
    line-height: 2.25rem;
    text-align: center;
  }
  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-top: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--blue);
  }

  p {
    margin-top: 1rem;
    font-size: 1rem;
    line-height: 1.8rem;
  }
}
</style>
