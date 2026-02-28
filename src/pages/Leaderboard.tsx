import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { getLeaderboard, PILOTS } from "@/lib/gameStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Leaderboard = () => {
  const navigate = useNavigate();
  const entries = getLeaderboard();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12">
      <StarField />
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-2xl px-6">
        <h1 className="font-orbitron text-3xl font-bold gradient-title tracking-[0.15em]">
          GALACTIC HALL OF FAME
        </h1>
        <p className="font-mono-share text-sm text-muted-foreground tracking-wider">Top commanders across all missions</p>

        {entries.length === 0 ? (
          <div className="border border-border rounded-xl bg-card/60 p-8 text-center w-full">
            <p className="font-mono-share text-muted-foreground">No records yet. Complete a mission to appear here!</p>
          </div>
        ) : (
          <div className="w-full border border-border rounded-xl bg-card/60 backdrop-blur-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-orbitron text-[10px] tracking-wider text-primary">#</TableHead>
                  <TableHead className="font-orbitron text-[10px] tracking-wider text-primary">PILOT</TableHead>
                  <TableHead className="font-orbitron text-[10px] tracking-wider text-primary">MISSION</TableHead>
                  <TableHead className="font-orbitron text-[10px] tracking-wider text-primary text-right">SCORE</TableHead>
                  <TableHead className="font-orbitron text-[10px] tracking-wider text-primary text-right">ACC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.slice(0, 20).map((entry, i) => {
                  const pilot = PILOTS.find((p) => p.id === entry.pilotId);
                  return (
                    <TableRow key={i} className="border-border">
                      <TableCell className="font-mono-share text-neon-yellow">{i + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{pilot?.icon || "🚀"}</span>
                          <span className="font-mono-share text-sm text-foreground">{entry.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono-share text-xs text-muted-foreground">
                        CH{entry.chapter}-LV{entry.level}
                      </TableCell>
                      <TableCell className="font-mono-share text-sm text-foreground text-right">{entry.score}</TableCell>
                      <TableCell className="font-mono-share text-sm text-neon-green text-right">{entry.accuracy}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-4 py-3 px-8 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
        >
          ← MENU
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
