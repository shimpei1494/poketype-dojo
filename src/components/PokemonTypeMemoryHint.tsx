import { ActionIcon, Paper, Stack, Text, Tooltip } from "@mantine/core";

type PokemonTypeMemoryHintProps =
  | {
      hint: string;
      isOpen: boolean;
      mode: "interactive";
      onToggle: () => void;
    }
  | {
      hint: string;
      mode: "static";
    };

export function PokemonTypeMemoryHint(props: PokemonTypeMemoryHintProps) {
  const hint = props.hint.trim();

  if (hint.length === 0) {
    return null;
  }

  if (props.mode === "static") {
    return (
      <div className="pokemon-type-memory-hint pokemon-type-memory-hint--static" data-open="true">
        <HintPanel hint={hint} title="タイプの覚え方" />
      </div>
    );
  }

  const panelId = "pokemon-type-memory-hint-panel";

  return (
    <div
      className="pokemon-type-memory-hint pokemon-type-memory-hint--interactive"
      data-open={props.isOpen}
    >
      <Tooltip label="ヒントを表示" openDelay={240} withArrow>
        <ActionIcon
          aria-controls={panelId}
          aria-expanded={props.isOpen}
          aria-label={props.isOpen ? "ヒントを閉じる" : "ヒントを表示"}
          className="pokemon-type-memory-hint-toggle"
          color="candyPink"
          onClick={props.onToggle}
          radius="xl"
          size="lg"
          variant="filled"
        >
          ?
        </ActionIcon>
      </Tooltip>
      {props.isOpen ? <HintPanel hint={hint} id={panelId} title="ヒント" /> : null}
    </div>
  );
}

function HintPanel({ hint, id, title }: { hint: string; id?: string; title: string }) {
  return (
    <Paper className="pokemon-type-memory-hint-panel" id={id} p="sm" radius="md" shadow="sm">
      <Stack gap={4}>
        <Text fw={800} size="xs">
          {title}
        </Text>
        <Text size="sm">{hint}</Text>
      </Stack>
    </Paper>
  );
}
