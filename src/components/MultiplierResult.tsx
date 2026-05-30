import { Card, Divider, Group, Stack, Text, Title } from "@mantine/core";

import { pokemonTypeByName } from "../data/pokemon-types";
import type { FinalEffectiveness } from "../utils/effectiveness";
import { formatMultiplier, getEffectivenessMessage } from "../utils/effectiveness";

export type MultiplierResultProps = {
  result: FinalEffectiveness;
};

export function MultiplierResult({ result }: MultiplierResultProps) {
  return (
    <Card className="glass-panel" p="lg">
      <Stack gap="md">
        <Stack gap={4}>
          <Title c="candyPink.7" order={2}>
            {formatMultiplier(result.finalMultiplier)}
          </Title>
          <Text fw={700} size="lg">
            {getEffectivenessMessage(result.finalMultiplier)}
          </Text>
        </Stack>

        <Divider color="#f0ddea" />

        <Stack gap="xs">
          <Text fw={700} size="sm">
            内訳
          </Text>
          {result.details.map((detail) => {
            const attackType = pokemonTypeByName.get(detail.attackType);
            const defenseType = pokemonTypeByName.get(detail.defenseType);

            return (
              <Group justify="space-between" key={`${detail.attackType}-${detail.defenseType}`}>
                <Text size="sm">
                  {attackType?.jaName} → {defenseType?.jaName}
                </Text>
                <Text fw={700} size="sm">
                  {formatMultiplier(detail.multiplier)}
                </Text>
              </Group>
            );
          })}
        </Stack>
      </Stack>
    </Card>
  );
}
