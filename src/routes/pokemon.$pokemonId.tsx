import { Button, Card, Container, Group, Image, Stack, Text, Title } from "@mantine/core";
import { Link, createFileRoute } from "@tanstack/react-router";

import { HomeLink } from "../components/HomeLink";
import { TypeBadge } from "../components/TypeBadge";
import { getPokemonImageUrl, pokemonQuizRecords } from "../data/pokemon";
import {
  getFirstPokemonId,
  getLastPokemonId,
  getPokemonDefensiveEffectivenessGroups,
  getPokemonTypes,
  pokemonReferenceEffectivenessLabels,
} from "../utils/pokemon-reference";

export const Route = createFileRoute("/pokemon/$pokemonId")({
  component: PokemonDetailPage,
});

const firstPokemonId = getFirstPokemonId(pokemonQuizRecords);
const lastPokemonId = getLastPokemonId(pokemonQuizRecords);
const emptyPokemonListSearch = {};

function PokemonDetailPage() {
  const params = Route.useParams();
  const pokemonId = Number(params.pokemonId);
  const pokemon = pokemonQuizRecords.find((record) => record.id === pokemonId);

  if (!pokemon) {
    return (
      <Container className="page-shell" size="lg">
        <Stack gap="lg">
          <HomeLink />
          <Card className="glass-panel" p="lg">
            <Stack gap="md">
              <Title order={1}>ポケモンが見つかりませんでした</Title>
              <Text c="dimmed">指定されたポケモンが見つかりませんでした。</Text>
              <Button component={Link} to="/pokemon">
                一覧に戻る
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>
    );
  }

  const types = getPokemonTypes(pokemon);
  const effectivenessGroups = getPokemonDefensiveEffectivenessGroups(pokemon);
  const previousPokemonId = pokemon.id - 1;
  const nextPokemonId = pokemon.id + 1;
  const hasPreviousPokemon = firstPokemonId !== undefined && pokemon.id > firstPokemonId;
  const hasNextPokemon = lastPokemonId !== undefined && pokemon.id < lastPokemonId;

  return (
    <Container className="page-shell" size="lg">
      <Stack gap="lg">
        <Stack gap={4}>
          <HomeLink />
          <Text c="candyPink.7" fw={700} size="sm">
            Pokemon Reference
          </Text>
          <Title order={1}>ポケモン図鑑</Title>
          <Button color="crystalBlue" component={Link} size="xs" to="/pokemon" variant="light">
            一覧に戻る
          </Button>
        </Stack>

        <Card className="glass-panel pokemon-question-card" p="lg">
          <Stack align="center" gap="md">
            <Text c="dimmed" fw={700} size="sm">
              No.{pokemon.id.toString().padStart(3, "0")}
            </Text>
            <Image
              alt={pokemon.jaName}
              className="pokemon-quiz-image"
              fit="contain"
              src={getPokemonImageUrl(pokemon)}
            />
            <Stack align="center" gap="xs">
              <Title order={2}>{pokemon.jaName}</Title>
              <Group gap="xs" justify="center">
                {types.map((type) => (
                  <TypeBadge key={type} selected type={type} />
                ))}
              </Group>
            </Stack>
          </Stack>
        </Card>

        <Group grow>
          {hasPreviousPokemon ? (
            <Link
              className="pokemon-detail-nav-link"
              params={{ pokemonId: String(previousPokemonId) }}
              search={emptyPokemonListSearch}
              to="/pokemon/$pokemonId"
            >
              前へ
            </Link>
          ) : (
            <Button disabled variant="light">
              前へ
            </Button>
          )}
          {hasNextPokemon ? (
            <Link
              className="pokemon-detail-nav-link"
              params={{ pokemonId: String(nextPokemonId) }}
              search={emptyPokemonListSearch}
              to="/pokemon/$pokemonId"
            >
              次へ
            </Link>
          ) : (
            <Button disabled variant="light">
              次へ
            </Button>
          )}
        </Group>

        <Card className="glass-panel" p="lg">
          <Stack gap="md">
            <Title order={2} size="h3">
              防御側の相性
            </Title>
            {effectivenessGroups.map((group) => (
              <Stack gap="xs" key={group.multiplier}>
                <Text fw={800}>{pokemonReferenceEffectivenessLabels.get(group.multiplier)}</Text>
                <Group gap="xs">
                  {group.attackTypes.map((type) => (
                    <TypeBadge key={type} selected type={type} />
                  ))}
                </Group>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
