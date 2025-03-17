import { TournamentListElement } from "../../../components/componentsExport";
import { TournamentQueries } from "../../../queries/tournamentQuery";
import { Loading } from "../../../components/Loading/Loading";

export const TournamentsListContainer = () => {
  const { data, isLoading } = TournamentQueries.getAllTournaments();

  if (isLoading) return <Loading isLoading />;

  return (
    <div className="grid 2xl:grid-cols-3 gap-3 xl:grid-cols-2 py-4">
      {data?.map((z) => (
        <TournamentListElement data={z} key={z.tournamentId} />
      ))}
    </div>
  );
};
