<template>
  <footer class="bg-blue py-4 text-light text-sm grid justify-center">
    <div class="app-container">
      <ul class="grid grid-cols-2 divide-x sm:grid-cols-3 gap-2 text-center">
        <li class="px-2">
          <RouterLink to="/privacy" class="hover:text-darkBlue"
            >個人情報の取り扱い</RouterLink
          >
        </li>
        <li class="px-2">
          <RouterLink to="/about" class="hover:text-darkBlue"
            >このサイトについて</RouterLink
          >
        </li>
        <li class="px-2">
          <RouterLink to="/disclaimer" class="hover:text-darkBlue"
            >免責事項について</RouterLink
          >
        </li>
      </ul>
      <p class="mt-4 text-center">Copyright © Nagoya All rights reserved.</p>
    </div>
  </footer>
</template>
