import { useInitialLoad } from "./Auth/hooks/useInitialLoad";

export function App(props: React.PropsWithChildren) {
  useInitialLoad();
  return <>{props.children}</>;
}
