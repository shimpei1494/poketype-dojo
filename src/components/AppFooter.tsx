import { Anchor, Container, Group, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export function AppFooter() {
  return (
    <footer className="app-footer">
      <Container size="lg">
        <Group gap="xs" justify="center" wrap="wrap">
          <Text c="dimmed" size="xs">
            非公式・非商用の個人制作アプリです
          </Text>
          <Text aria-hidden="true" c="gray.5" size="xs">
            ·
          </Text>
          <Anchor c="dimmed" component={Link} size="xs" to="/about" underline="hover">
            このサイトについて
          </Anchor>
        </Group>
      </Container>
    </footer>
  );
}
