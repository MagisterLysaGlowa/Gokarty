import { useNavigate, useParams } from "react-router-dom";
import "./RideEdit.css";
import { useMutation, useQuery } from "react-query";
import { get_full_ride, update_ride } from "../../services/ride";
import { useState } from "react";
import { Time } from "../../../types";
import {
  convertTimeFromMilisecondsToObject,
  convertTimeToMs,
} from "../../Utils/TimeUtils";
import { promiseToast, updateRideTexts } from "../../Utils/ToastNotifications";

export const RideEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [time, SetTime] = useState<Time>({ h: 0, m: 0, ms: 0, s: 0 });
  const [isDisqualified, SetIsDisqualified] = useState<boolean>(false);
  const {
    data: rideData,
    isLoading,
    isFetching,
  } = useQuery("getRide", async () => await get_full_ride(Number(id)), {
    onSuccess: (res) => {
      SetTime(convertTimeFromMilisecondsToObject(res.time));
      SetIsDisqualified(res.isDisqualified);
    },
  });

  const { mutateAsync: updateRide } = useMutation(
    async () =>
      await promiseToast(
        update_ride(Number(id), {
          gokartId: Number(rideData?.gokartId),
          playerId: Number(rideData?.playerId),
          time: convertTimeToMs(time),
          tournamentId: Number(rideData?.tournamentId),
          isDisqualified: isDisqualified ? 1 : 0,
        }),
        updateRideTexts
      ),
    {
      onSuccess: () => navigate(-1),
    }
  );

  if (isLoading || isFetching) return <p className="m-3">Loading...</p>;
  return (
    <div
      className="p-3 d-flex flex-column"
      style={{ width: "400px", gap: "10px" }}
    >
      <h3>Edytuj przejazd</h3>
      <label>Imie i Nazwisko</label>
      <input
        type="text"
        disabled
        className="form-control"
        value={rideData?.player.name + " " + rideData?.player.surname}
      />
      <label>Zawody</label>
      <input
        type="text"
        disabled
        className="form-control"
        value={rideData?.tournament.name}
      />
      <label>Czas</label>
      <div className="d-flex align-items-center">
        <input
          type="number"
          className="form-control text-center"
          value={time.m.toString().padStart(2, "0")}
          min={0}
          name="m"
          onChange={(e) => SetTime({ ...time, m: Number(e.target.value) })}
        />
        :
        <input
          type="number"
          className="form-control text-center"
          value={time.s.toString().padStart(2, "0")}
          min={0}
          name="s"
          onChange={(e) => SetTime({ ...time, s: Number(e.target.value) })}
        />
        :
        <input
          type="number"
          className="form-control text-center"
          value={time.ms.toString().padStart(3, "0")}
          min={0}
          name="ms"
          onChange={(e) => SetTime({ ...time, ms: Number(e.target.value) })}
        />
      </div>
      <div className="d-flex gap-1 align-items-center">
        <input
          type="checkbox"
          id="isDsq"
          checked={isDisqualified}
          onChange={(e) => SetIsDisqualified(e.target.checked)}
        />
        <label htmlFor="isDsq">Dyskwalifikacja</label>
      </div>
      <button
        className="btn btn-primary"
        onClick={async () => await updateRide()}
      >
        Zatwierdź
      </button>
    </div>
  );
};
