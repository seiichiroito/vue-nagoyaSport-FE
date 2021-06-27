import { createApp } from "vue";
import App from "./App.vue";

import "./index.css";

const app = createApp(App);

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, fab);
app.component("font-awesome-icon", FontAwesomeIcon);

// Router
import { router } from "./router";

// Components
import Button from "./components/UI/Button.vue";
import Heading from "./components/UI/Heading.vue";
import PageTitle from "./components/UI/PageTitle.vue";
import Input from "./components/UI/Input.vue";

app.component("Button", Button);
app.component("Heading", Heading);
app.component("PageTitle", PageTitle);
app.component("Input", Input);

app.use(router);

app.mount("#app");
