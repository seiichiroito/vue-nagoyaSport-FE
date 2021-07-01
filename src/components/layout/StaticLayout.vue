<template>
  <section class="bg-light">
    <div class="app-container max-w-3xl py-8 px-6 grid justify-center">
      <h1 class="text-center mb-8 font-bold text-2xl">
        <slot name="heading"></slot>
      </h1>
      <article class="article">
        <slot name="content"></slot>
      </article>
    </div>
  </section>
</template>

<style lang="scss">
.article {
  h2 {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--blue);
    font-size: 1.25rem;
    margin-top: 1.5rem;
  }
  p {
    line-height: 1.8;
    font-size: 1rem;
    margin-top: 1.25rem;
    &::before {
      content: "　";
    }
  }
  a {
    color: var(--blue);
    &:hover {
      color: var(--darkBlue);
    }
  }
  div {
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
    span {
      margin-left: 0.5rem;
    }
  }
}
</style>
