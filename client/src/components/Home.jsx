import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import CandidateCard from "./CandidateCard";
import CandidateCardAdmin from "./CandidateCardAdmin";

export default function Home() {
  const { user, logout, login, candidates } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <>
      {!user ? (
        <>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  Error
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>Ungültiger ID und/oder Kennwort!</p>
                  <p>Bitte versuch es erneut!</p>
                </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Schließen</button>
                </form>
              </div>{" "}
            </div>{" "}
          </dialog>{" "}
          <div className="navbar bg-black text-white flex justify-center items-center h-full">
            <a className="btn btn-ghost text-md lg:text-xl">
              Team Assessment | RG München Q-1
            </a>
          </div>
          <div className="mt-6 hero flex justify-center items-center h-2/6 w-4/6 bg-cover bg-center ml-auto mr-auto lg:w-3/12 mt-0">
            <img
              src="https://d2nk66epwbpimf.cloudfront.net/images/345249fd-0959-4762-bfbc-80ca4247abbb/54ad38e7-f4b4-4dc6-9e80-21e06958a192.png"
              alt="logo"
            />
          </div>
          <div className="hero flex justify-center items-center h-2/6 w-5/6 bg-cover bg-center ml-auto mr-auto text-center lg:w-3/12">
            <div>
              <p className="font-anek text-gray-600 font-medium mt-4">
                Nimm dir einen Moment Zeit, um deine Kollegen zu bewerten. Melde
                dich mit den Zugangsdaten an, die du von deiner IT-Abteilung
                erhalten hast!
              </p>
            </div>
          </div>
          <div className="bg-white lg:w-3/12 md:7/12 w-8/12 shadow-3xl rounded-xl ml-auto mr-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
              <div className="flex items-center text-lg mb-6 md:mb-8 ">
                <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                  <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                </svg>
                <input
                  {...register("logInID", { required: true })}
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Anmelde-ID"
                />
                {errors.exampleRequired && <span>This field is required</span>}
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Kennwort"
                />
                {errors.exampleRequired && <span>This field is required</span>}
              </div>
              <input
                type="submit"
                value={"Anmelden"}
                className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded cursor-pointer"
              />
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="navbar bg-black text-white flex justify-between items-center h-full px-4">
            <div></div>
            <div className="flex items-center">
              <a className="ml-8 btn btn-ghost text-sm lg:text-lg lg:ml-32">
                Team Assessment | RG München Q-1
              </a>
            </div>
            <div>
              <NavLink
                onClick={logout}
                className="hidden lg:inline bg-[#ffffff] border-2 border-[#3e3e3e] rounded-lg text-black font-bold px-4 py-1.5 text-base hover:border-[#fff] cursor-pointer transition ml-3"
              >
                Abmelden
              </NavLink>
            </div>
            <div className="lg:hidden flex justify-end drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label htmlFor="my-drawer-4">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                    />
                  </svg>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-3.5 w-32 bg-base-200 text-base-content">
                  <li>
                    <a onClick={logout}>Abmelden</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {!candidates ? (
            <div className="flex justify-center mt-8">
              <div className=" border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />

            </div>
          ) : (
            <>
              {user.role === "user" ? (
                <>
                  <p className="hidden lg:flex justify-end  mr-5 mt-3 font-semibold">
                    Anmelde ID:{" "}
                    <span className="font-bold ml-1">{" " + user.logInID}</span>
                  </p>

                  <div className="font-anek text-md flex justify-end lg:text-lg">
                    <div></div>
                    <div className="hero flex justify-center items-center h-2/6 w-6/6 mt-6 bg-cover bg-center ml-auto mr-auto text-center lg:w-4/12">
                      <div className="max-w-xxl">
                        <div className="hero flex justify-center items-center h-2/6 w-2/6 bg-cover bg-center ml-auto mr-auto lg:w-3/6">
                          <img
                            className="inline"
                            src="https://d2nk66epwbpimf.cloudfront.net/images/345249fd-0959-4762-bfbc-80ca4247abbb/54ad38e7-f4b4-4dc6-9e80-21e06958a192.png"
                            alt="logo"
                          />
                        </div>
                        <p className="text-gray-600 font-medium mt-6 ml-4 mr-4 lg:mt-0">
                          Liebes Team, unser großes Ziel ist es, nur die besten
                          Mitarbeiter zu beschäftigen. Bei dem Team Assessment
                          geht es darum, das persönliche Engagement aller
                          Mitarbeiter zu bewerten.
                        </p>
                        <p className="text-gray-500 font-medium mt-6 ml-4 mr-4">
                          Du bewertest Einsatzbereitschaft, Engagement, den
                          persönlichen Beitrag zu Gruppenzielen, die
                          Bereitschaft anderen zu helfen, die Teamfähigkeit, die
                          ehrliche Bemühung, dem Kunden zu helfen,
                          Qualitätsbewusstsein, das Leben unserer Werte. Also
                          grundsätzlich die Dinge, die wir als Unternehmen
                          anstreben.
                        </p>{" "}
                        <p className="text-gray-500 font-medium mt-6 ml-4 mr-4">
                          Bitte mach dir bewusst, dass es nicht darum geht, ob
                          du den Lebensstil oder den Charakter des Kollegen
                          magst oder nicht.
                        </p>
                        <p className="text-gray-500 font-medium mt-6 ml-4 mr-4">
                          Diese Anfrage ist{" "} 
                          <span className="font-extrabold text-black">
                             anonym
                          </span>
                          . Das bedeutet, dass niemand,
                          auch nicht die Geschäftsführung, erfährt, wie du deine
                          Kollegen bewertet hast.
                        </p>
                        <p className="text-gray-500 font-medium mt-6 ml-4 mr-4">
                          Du brauchst für die Bewertung aller Kollegen ca. 10
                          Minuten. Falls du zu einigen Kollegen nicht direkt
                          eine Meinung hast, kannst du dich auch zu einem
                          späteren Zeitpunkt wieder einloggen und deine Meinung
                          zu diesen abgeben.
                        </p>
                        {/* <p className="text-gray-500 font-medium mt-6 ml-4 mr-4">
                          Diese Umfrage ist vom{" "}
                          <span className="font-extrabold text-black">
                            22.04.
                          </span>{" "}
                          bis{" "}
                          <span className="font-extrabold text-black">
                            06.05.2024
                          </span>{" "}
                          geöffnet.
                        </p> */}
                        <p className="mt-10 ml-4 mr-4 mb-6 font-bold">
                          Skala der Bewertung
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="font-anek mr-6 ml-6 lg:ml-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <p>
                      <span className="font-bold">10 Sterne:</span>{" "}
                      Herrvorrangender Wert, weit mehr als gefordert. Perfekt!
                    </p>
                    <p>
                      <span className="font-bold">8 bis 9 Sterne:</span> sehr
                      gut, überdurchschnittlich, mit etwas Luft nach oben
                    </p>
                    <p>
                      <span className="font-bold">6 bis 7 Sterne:</span>{" "}
                      Durchschnittlich, anderswo normal, mit Raum, sich zu
                      steigern
                    </p>
                    <p>
                      <span className="font-bold">4 bis 5 Sterne:</span> Im
                      Moment nicht sehr gut, sollte sich verbessern
                    </p>
                    <p>
                      <span className="font-bold">2 bis 3 Sterne:</span>{" "}
                      Schlecht, etwas sollte sich rasch verbessern
                    </p>
                    <p>
                      <span className="font-bold">1 Stern:</span> Sehr Schlecht,
                      wird sich nicht verbessern / verändern
                    </p>
                  </div>

                  <div className="font-anek mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {candidates.map((candidate) => (
                      <CandidateCard
                        key={candidate._id}
                        candidate={candidate}
                        user={user}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="hidden lg:flex justify-end mr-5 mt-3 font-semibold">
                    Anmelde ID:
                    <span className="font-bold ml-1">{" " + user.logInID}</span>
                  </p>

                  <p className="hidden lg:flex justify-end text-md mr-5 text-gray-400 text-center">
                    Administrator
                  </p>

                  <div className="mt-6 hero flex justify-center items-center h-2/6 w-5/6 bg-cover bg-center ml-auto mr-auto lg:w-2/12 mt-0">
                    <img
                      src="https://d2nk66epwbpimf.cloudfront.net/images/345249fd-0959-4762-bfbc-80ca4247abbb/54ad38e7-f4b4-4dc6-9e80-21e06958a192.png"
                      alt="logo"
                    />
                  </div>

                  <div className="font-anek flex justify-end">
                    <div className="hero flex justify-center items-center h-2/6 w-3/6 bg-cover bg-center ml-auto mr-auto text-center">
                      <p className="text-lg mt-2 mb-10 font-bold lg:text-xl">
                        Übersicht | Rating der Mitarbeiter
                      </p>
                    </div>
                  </div>

                  <div className="font-anek mr-4 ml-4 lg:ml-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <p>
                      <span className="font-bold  text-green-600">
                        Ab 9 bis 10:
                      </span>{" "}
                      Herrvorrangender Wert, weit mehr als gefordert. Perfekt!
                    </p>
                    <p>
                      <span className="font-bold  text-lime-400">
                        Ab 8 bis 9:
                      </span>{" "}
                      sehr gut, überdurchschnittlich, mit etwas Luft nach oben
                    </p>

                    <p>
                      <span className="font-bold  text-yellow-400">
                        Ab 6 bis 8:
                      </span>{" "}
                      Durchschnittlich, anderswo normal, mit Raum, sich zu
                      steigern
                    </p>
                    <p>
                      <span className="font-bold  text-yellow-400">
                        Ab 4 bis 6:
                      </span>{" "}
                      Im Moment nicht sehr gut, sollte sich verbessern
                    </p>
                    <p>
                      <span className="font-bold  text-orange-500">
                        Ab 2 bis 4:
                      </span>{" "}
                      Schlecht, etwas sollte sich rasch verbessern
                    </p>
                    <p>
                      <span className="font-bold text-red-600">Bis 2:</span>{" "}
                      Sehr Schlecht, wird sich nicht verbessern / verändern
                    </p>
                  </div>

                  <div className="font-anek mb-6 grid center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:ml-8">
                    {candidates.map((candidate) => (
                      <CandidateCardAdmin
                        key={candidate._id}
                        candidate={candidate}
                        user={user}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
