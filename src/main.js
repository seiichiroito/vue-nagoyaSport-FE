import { createApp } from "vue";
import App from "./App.vue";

import "./index.css";

const app = createApp(App);

// Firebase
import "../firebase";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, fab);
app.component("font-awesome-icon", FontAwesomeIcon);

// Element Plus
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "element-plus/packages/theme-chalk/src/base.scss";
import locale from "element-plus/lib/locale/lang/ja";
import "dayjs/locale/ja";

app.use(ElementPlus, { locale });

// Router
import { router } from "./router";
app.use(router);

// Vuex
import store from "./store/index";
app.use(store);

// Components
import Button from "./components/UI/Button.vue";
import BackButton from "./components/UI/BackButton.vue";
import Heading from "./components/UI/Heading.vue";
import PageTitle from "./components/UI/PageTitle.vue";
import Input from "./components/UI/Input.vue";
import BaseLoading from "./components/UI/BaseLoading.vue";
import BaseMoveToTop from "./components/UI/BaseMoveToTop.vue";

app.component("Button", Button);
app.component("BackButton", BackButton);
app.component("Heading", Heading);
app.component("PageTitle", PageTitle);
app.component("Input", Input);
app.component("BaseLoading", BaseLoading);
app.component("BaseMoveToTop", BaseMoveToTop);

app.mount("#app");
