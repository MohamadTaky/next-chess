export default function toPusherKey(event: string) {
  return event.replace(/:/g, "__");
}
