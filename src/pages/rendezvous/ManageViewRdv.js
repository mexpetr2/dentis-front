import Head from "next/head";
import { getWaitingRoomColor } from "@/shared/colors";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { useForm } from "react-hook-form";

const pageMetadata = {
  title: "Prise de rendez vous",
};

export default function ManageView({ waitingRooms }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // e.preventDefault();
    console.log(data);

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/appointments/newrdv",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Données envoyées avec succès !");
      } else {
        console.error("Erreur lors de l'envoi des données.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };
  return (
    <main className={"col-md-6 mb-4"}>
      <Head>
        <title>{pageMetadata.title}</title>
      </Head>
      <section className={"row"}>
        <h2>Prendre rendez-vous</h2>

        <form
          action="http://localhost:8080/"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="firstName">Prénom:</label>
          <input
            {...register("firstName", {
              required: "Prénom requis",
              minLength: 3,
              message: "Prenom trop court",
            })}
            aria-invalid={errors.first ? "true" : "false"}
          />

          {errors.first && (
            <p style={{ color: "red" }} role="alert">
              {errors.first?.message}
            </p>
          )}
          <label htmlFor="last">Nom de famille:</label>
          <input
            {...register("lastName", {
              required: "Nom requis",
              maxLength: 50,
              minLength: 3,
            })}
            aria-invalid={errors.last ? "true" : "false"}
          />
          {errors.last && (
            <p style={{ color: "red" }} role="alert">
              {errors.last?.message}
            </p>
          )}

          <label htmlFor="socialnumber">Numéro sécurité social:</label>
          <input
            {...register("numSecu", {
              required:
                "Votre numéro de sécurité sociale doit contenir 13 chiffres",
              minLength: {
                value: 13, 
                message:
                  "Votre numéro de sécurité sociale doit contenir 13 chiffres",
              },
              maxLength: {
                value: 13,
                message :
                  "Votre numéro de sécurité sociale doit contenir 13 chiffres",
              },
            })}
          />
          {errors.socialnumber && (
            <p style={{ color: "red" }} role="alert">
              {errors.socialnumber.message}
            </p>
          )}

          <label>Type de rdz</label>
          <select {...register("rdv", { required: true, maxLength: 20 })}>
            <option value="1">Detartrage</option>
            <option value="2">Controle</option>
            <option value="3">Couronne</option>
            <option value="4">Pediatrie</option>
          </select>

          <label>email:</label>
          <input
            {...register("email", {
              required: "Veuillez fournir votre adresse e-mail",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Veuillez fournir une adresse e-mail valide",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }} role="alert">
              {errors.email.message}
            </p>
          )}

          {/* <AddToCalendarButton
            name="Test-Event"
            startDate="2023-05-22"
            options={["Apple", "Google", "Yahoo", "iCal"]}
          ></AddToCalendarButton> */}

          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}
