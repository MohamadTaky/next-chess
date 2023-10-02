export function toPusherKey(event: string) {
  return event.replace(/:/g, "__");
}

export type Member = {
  id: string;
  info: {
    username: string;
  };
};
