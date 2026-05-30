import { Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export function HomeLink() {
  return (
    <Button
      className="home-link"
      color="candyPink"
      component={Link}
      size="xs"
      to="/"
      variant="subtle"
    >
      ← PokéType Dojo
    </Button>
  );
}
