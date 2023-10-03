const routes = [
  {
    path: "/",
    component: () => import("layouts/LayoutLimpo.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PaginaInicial.vue")
      }
    ]
  },
  {
    path: "/produtos",
    component: () => import("layouts/LayoutPadrao.vue"),
    children: [
      {
        path: ":produto",
        name: "produto",
        component: () => import("pages/PaginaProdutos.vue")
      }
    ]
  },
  {
    path: "/categorias",
    component: () => import("layouts/LayoutPadrao.vue"),
    children: [
      {
        path: ":categoria",
        name: "categoria",
        component: () => import("pages/PaginaCategorias.vue")
      }
    ]
  },
  {
    path: "/pesquisa",
    component: () => import("layouts/LayoutPadrao.vue"),
    children: [
      {
        path: ":pesquisa",
        name: "pesquisa",
        component: () => import("pages/PaginaPesquisa.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("layouts/LayoutPadrao.vue"),
    children: [
      {
        path: ":login",
        name: "login",
        component: () => import("pages/PaginaLogin.vue")
      }
    ]
  }
];

export default routes;
