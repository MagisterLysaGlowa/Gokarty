import { TournamentListElement } from "../../../components/componentsExport";
import { TournamentQueries } from "../../../queries/tournamentQuery";
import { Loading } from "../../../components/Loading/Loading";

export const TournamentsListContainer = () => {
  const { data, isLoading } = TournamentQueries.getAllTournaments();

  if (isLoading) return <Loading />;

  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 gap-3 lg:grid-cols-3  md:grid-cols-2 py-4">
      {data?.map((z) => (
        <TournamentListElement data={z} key={z.tournamentId} />
      ))}
    </div>
  );
};
