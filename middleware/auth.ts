export default defineNuxtRouteMiddleware((to) => {
  const { logged } = useUserStore();

  const inPage = to.path.includes("/in");
  const loginPage = to.path.includes("/login");

  if (inPage && !logged) return navigateTo("/login");
  if (loginPage && logged) return navigateTo("/in/collaborator");
});
