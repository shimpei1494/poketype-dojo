import { Card, Divider, Group, Stack, Text, Title } from "@mantine/core";

import { pokemonTypeByName } from "../data/pokemon-types";
import type { FinalEffectiveness } from "../utils/effectiveness";
import { formatMultiplier, getEffectivenessMessage } from "../utils/effectiveness";

export type CompactResultSummaryProps = {
  placeholder: string;
  result: FinalEffectiveness | null;
};

export function CompactResultSummary({ placeholder, result }: CompactResultSummaryProps) {
  if (!result) {
    return (
      <Card className="glass-panel result-summary" p="md">
        <Stack gap="sm">
          <Group align="center" justify="space-between">
            <Stack gap={2}>
              <Text c="dimmed" fw={800}>
                {placeholder}
              </Text>
              <Text c="dimmed" size="sm">
                タイプを選ぶと倍率と内訳が表示されます
              </Text>
            </Stack>
            <Title c="gray.5" order={2}>
              --
            </Title>
          </Group>

          <Divider color="#f0ddea" />

          <Stack gap={4}>
            <Text fw={700} size="sm">
              内訳
            </Text>
            <PlaceholderDetailRow label="技のタイプを選択" />
            <PlaceholderDetailRow label="攻撃されるタイプを選択" />
          </Stack>
        </Stack>
      </Card>
    );
  }

  const firstDetail = result.details[0];
  const attackType = firstDetail ? pokemonTypeByName.get(firstDetail.attackType) : undefined;
  const defenseNames = result.details
    .flatMap((detail) => {
      const defenseType = pokemonTypeByName.get(detail.defenseType);

      return defenseType ? [defenseType.jaName] : [];
    })
    .join(" / ");

  return (
    <Card className="glass-panel result-summary" p="md">
      <Stack gap="sm">
        <Group align="center" justify="space-between">
          <Stack gap={2}>
            <Text c="dimmed" fw={700} size="sm">
              {attackType?.jaName} → {defenseNames}
            </Text>
            <Text fw={800}>{getEffectivenessMessage(result.finalMultiplier)}</Text>
          </Stack>
          <Title c="candyPink.7" order={2}>
            {formatMultiplier(result.finalMultiplier)}
          </Title>
        </Group>

        <Divider color="#f0ddea" />

        <Stack gap={4}>
          <Text fw={700} size="sm">
            内訳
          </Text>
          {result.details.map((detail) => (
            <ResultDetailRow detail={detail} key={`${detail.attackType}-${detail.defenseType}`} />
          ))}
          {result.details.length < 2 ? (
            <PlaceholderDetailRow label="2つ目のタイプは未選択" />
          ) : null}
        </Stack>
      </Stack>
    </Card>
  );
}

function ResultDetailRow({ detail }: { detail: FinalEffectiveness["details"][number] }) {
  const detailAttackType = pokemonTypeByName.get(detail.attackType);
  const detailDefenseType = pokemonTypeByName.get(detail.defenseType);

  return (
    <Group justify="space-between">
      <Text size="sm">
        {detailAttackType?.jaName} → {detailDefenseType?.jaName}
      </Text>
      <Text fw={700} size="sm">
        {formatMultiplier(detail.multiplier)}
      </Text>
    </Group>
  );
}

function PlaceholderDetailRow({ label }: { label: string }) {
  return (
    <Group justify="space-between">
      <Text c="dimmed" size="sm">
        {label}
      </Text>
      <Text c="dimmed" fw={700} size="sm">
        --
      </Text>
    </Group>
  );
}
