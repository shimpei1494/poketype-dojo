import { Badge, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export type ModeCardProps = {
  description: string;
  disabled?: boolean;
  label: string;
  onPreload?: () => void;
  title: string;
  to: string;
};

export function ModeCard({ description, disabled, label, onPreload, title, to }: ModeCardProps) {
  const action = disabled ? (
    <Button disabled variant="light">
      {label}
    </Button>
  ) : (
    <Button component={Link} preload="intent" to={to} variant="filled">
      {label}
    </Button>
  );

  return (
    <Card
      className="glass-panel"
      onFocusCapture={disabled ? undefined : onPreload}
      onPointerEnter={disabled ? undefined : onPreload}
      p="lg"
    >
      <Stack gap="md" h="100%" justify="space-between">
        <Stack gap="xs">
          <Group justify="space-between">
            <Title order={3}>{title}</Title>
            {disabled ? (
              <Badge color="crystalBlue" variant="light">
                準備中
              </Badge>
            ) : null}
          </Group>
          <Text c="dimmed" size="sm">
            {description}
          </Text>
        </Stack>
        {action}
      </Stack>
    </Card>
  );
}
