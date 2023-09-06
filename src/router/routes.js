const routes = [
  {
    path: "/",
    component: () => import("layouts/LayoutLimpo.vue"),
    children: [
      { path: "", component: () => import("pages/PaginaInicial.vue") }
    ]
  },
  {
    path: "/produtos",
    component: () => import("layouts/LayoutPadrao.vue"),
    children: [
      { path: "", component: () => import("pages/PaginaProdutos.vue") }
    ]
  },
  {
    path: "/categorias",
    component: () => import("layouts/LayoutPadrao.vue"),
    children: [
      { path: "", component: () => import("pages/PaginaCategorias.vue") }
    ]
  }
];

export default routes;
