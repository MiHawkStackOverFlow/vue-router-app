import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./components/Dashboard.vue";
import Tasks from "./components/todos/TodoItems.vue";
import NotesAddEdit from "./views/AddEditNoteView.vue";
import NotesView from "./views/NotesView.vue";
import NotFound from "./components/NotFound.vue";

import { store } from "./store";
import NavbarComponent from "./components/navigation/Navbar.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: (to) => {
        console.log("Redirect from ", to);
        return { path: store.getters.startScreen };
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      alias: "/home",
      components: {
        default: Dashboard,
        Navbar: NavbarComponent,
      },
      meta: {
        transition: 'zoom-down'
      },
    },
    {
      path: "/tasks",
      name: "tasks",
      components: {
        default: Tasks,
        Navbar: NavbarComponent,
      },
    },
    {
      path: "/notes",
      name: "notes",
      components: {
        default: NotesView,
        Navbar: NavbarComponent,
      },
      children: [
        {
          meta: {
            onClose:()=> { router.push({ name: 'notes'}) }
          }, 
          path: "new", 
          name: "newnote", 
          component: NotesAddEdit 
        },
        {
          meta: {
            onClose:()=> { router.push({ name: 'notes'}) }
          },
          name: "editnote",
          path: "edit/:noteId([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})",
          component: NotesAddEdit,
          props: (route) => ({ id: route.params.noteId }),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.afterEach((to, from) => {
  console.log('to',to)
  console.log('from',from)
  to.meta.transition = to.matched.length == 1 ? 'bounce-right' : 'bounce-left'
});

export default router;
