import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pokemon")({
  component: PokemonRouteLayout,
});

function PokemonRouteLayout() {
  return <Outlet />;
}
