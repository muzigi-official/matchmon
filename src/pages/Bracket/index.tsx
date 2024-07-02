import TournamentLayout from '@/components/tournament/Layout';

export default function Bracket() {
  return (
    <>
      <h1>Bracket</h1>
      <TournamentLayout round={0} nodeInfoList={[]} />
    </>
  );
}
