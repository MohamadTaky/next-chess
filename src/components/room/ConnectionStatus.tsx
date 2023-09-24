import useStore from "@/store/useStore";

export default function ConnectionStatus() {
  const playerConnectionState = useStore((store) => store.playerConnectionState);
  return <p className="text-center text-sm">{playerConnectionState}</p>;
}
