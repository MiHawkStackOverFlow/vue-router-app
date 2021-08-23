import { createRouter, createWebHistory } from "vue-router";
import { store } from "./store";

const Dashboard = () => import( './components/Dashboard.vue')
const Tasks = () => import( './components/todos/TodoItems.vue')
const NotesView = () => import( './views/NotesView.vue')
const NotFound = () => import( './components/NotFound.vue')
const NotesAddEdit = () => import( './views/AddEditNoteView.vue')
const NavbarComponent = () => import('./components/navigation/Navbar.vue')
const Login = () => import('./components/auth/Login.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: (to) => {
        console.log("Redirect from ", to);
        return { path: store.getters.startScreen || 'dashboard' };
      },
    },
    { path: '/login', name: 'login', component: Login },
    {
      path: "/dashboard",
      name: "dashboard",
      alias: "/home",
      components: {
        default: Dashboard,
        Navbar: NavbarComponent,
      },
      meta: {
        transition: "zoom-down",
        title: "Dashboard"
      },
    },
    {
      meta: {
        transition: 'bounce-right',
        title: 'Tasks'
      },
      path: "/tasks",
      name: "tasks",
      components: {
        default: Tasks,
        Navbar: NavbarComponent,
      },
    },
    {
      path: "/notes",
      meta: {
        title: 'Note',
        requiresMic: true,
        requiresAuth: true,
        transition: 'bounce-right'
      },
      name: "notes",
      components: {
        default: NotesView,
        Navbar: NavbarComponent,
      },
      children: [
        {
          meta: {
            onClose: () => {
              router.push({ name: "notes" });
            },
          },
          path: "new",
          name: "newnote",
          component: NotesAddEdit,
        },
        {
          beforeEnter: () => {
            console.log('Before Note Edit Enter(Per-Route) ')
          },
          meta: {
            onClose: () => {
              router.push({ name: "notes" });
            },
          },
          name: "editnote",
          path:
            "edit/:noteId([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})",
          component: NotesAddEdit,
          props: (route) => ({ id: route.params.noteId }),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    console.log("to", to);
    console.log("from", from);
    console.log("savedPosition", savedPosition);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedPosition || { left: 0, top: 0 });
      }, 1000);
    });
  },
});

router.beforeEach((to) => {
  console.log('Before Each(Global)')
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    return { name: 'login' }
  }
});

router.beforeResolve(async () => {
  console.log('Before Resolve (Global)') 
  // if (to.meta.requiresMic) {
  //   try {
  //     await navigator.mediaDevices.getUserMedia({ audio: true })
  //   }
  //   catch (err) {
  //     alert('Cannot proceed without allowing access to mic. Enable access and reload the page')
  //     return false;
  //   }
  // }
});

router.afterEach((to) => {
  console.log('After Each (Global)')
  document.title= "Globomantics: " + to.meta.title;
  to.meta.transition = to.matched.length == 1 ? 'bounce-right' : 'bounce-left'
});

export default router;
