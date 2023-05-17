import useSWR from "swr";
import ManageView from "./ManageView";
import { API_BASE_URL, FETCHER } from "@/shared/api";

export default function Manage() {
  const { data, error } = useSWR(`${API_BASE_URL}/waiting-rooms`, FETCHER);

  if (error) return <div>Erreur lors du chargement des salles d'attente</div>;
  if (!data) return <div>Chargement...</div>;

  const waitingRooms = new Map(Object.entries(data));


  return <ManageView waitingRooms={waitingRooms} />;
}
