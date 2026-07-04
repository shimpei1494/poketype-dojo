import { Badge, Card, Group, Image, Skeleton, Stack, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";

import { TypeBadge } from "../components/TypeBadge";
import { getPokemonImageUrl } from "../data/pokemon-image";
import { usePokemonData } from "../hooks/usePokemonData";
import { getPokemonTypes } from "../utils/pokemon-reference";
import { resolvePokemonCandidate } from "./resolve-pokemon-candidate";

type ChatCandidateConfidence = "high" | "low" | "medium";

export type PokemonCandidateCardProps = {
  confidence: ChatCandidateConfidence;
  id: number;
  jaName: string;
  reason: string;
};

const confidenceInfo: Record<ChatCandidateConfidence, { color: string; label: string }> = {
  high: { color: "candyPink", label: "有力候補" },
  low: { color: "gray", label: "もしかして" },
  medium: { color: "crystalBlue", label: "候補" },
};

export function PokemonCandidateCard({
  confidence,
  id,
  jaName,
  reason,
}: PokemonCandidateCardProps) {
  const pokemonRecords = usePokemonData();

  if (pokemonRecords === null) {
    return (
      <Card className="glass-panel" p="md">
        <Group gap="md" wrap="nowrap">
          <Skeleton circle height={56} />
          <Stack flex={1} gap={8}>
            <Skeleton height={14} radius="xl" width={72} />
            <Skeleton height={20} radius="xl" width="50%" />
          </Stack>
        </Group>
      </Card>
    );
  }

  const pokemon = resolvePokemonCandidate(pokemonRecords, { id, jaName });

  if (pokemon === null) {
    return (
      <Card className="glass-panel" p="md">
        <Stack gap={4}>
          <Text fw={700}>{jaName}</Text>
          <Text c="dimmed" size="sm">
            図鑑データに見つかりませんでした。{reason}
          </Text>
        </Stack>
      </Card>
    );
  }

  const badge = confidenceInfo[confidence] ?? confidenceInfo.medium;

  return (
    <Card className="glass-panel" p="md">
      <Stack gap="sm">
        <Group align="flex-start" gap="md" wrap="nowrap">
          <Image
            alt={pokemon.jaName}
            fit="contain"
            h={64}
            src={getPokemonImageUrl(pokemon)}
            w={64}
          />
          <Stack flex={1} gap={4}>
            <Group gap="xs" justify="space-between" wrap="nowrap">
              <Text c="dimmed" fw={800} size="xs">
                No.{pokemon.id.toString().padStart(3, "0")}
              </Text>
              <Badge color={badge.color} variant="light">
                {badge.label}
              </Badge>
            </Group>
            <Text fw={800} size="lg">
              {pokemon.jaName}
            </Text>
            <Group gap="xs">
              {getPokemonTypes(pokemon).map((type) => (
                <TypeBadge key={type} selected size="xs" type={type} />
              ))}
            </Group>
          </Stack>
        </Group>
        <Text c="dimmed" size="sm">
          {reason}
        </Text>
        <Link
          className="pokemon-detail-nav-link"
          params={{ pokemonId: String(pokemon.id) }}
          to="/pokemon/$pokemonId"
        >
          図鑑で詳しく見る
        </Link>
      </Stack>
    </Card>
  );
}
