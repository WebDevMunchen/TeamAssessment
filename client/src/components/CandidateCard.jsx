import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { useState } from "react";

export default function CandidateCard({ candidate, user }) {
  const [btnHidden, setBtnHidden] = useState(false);
  const [voteBtn, setVoteBtn] = useState("Bewerten");
  const [voteBtnStatus, setVoteBtnStatus] = useState(true);
  const [voteBtnClass, setVoteBtnClass] = useState(
    "bg-gray-400 border-2 border-gray-400 rounded-lg text-gray-600 px-4 pt-2 pb-1 mt-4 text-base cursor-not-allowed transition"
  );
  const [selectedGrade, setSelectedGrade] = useState({
    "--tw-bg-opacity": "0.2",
  });
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axiosClient
      .put(`/candidate/update/${candidate._id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        setBtnHidden(true);
        setVoteBtn("Übermittelt");
        setVoteBtnClass(
          "bg-green-600 border-2 border-green-400 rounded-lg text-slate-50 px-4 pt-2 pb-1 mt-4 text-base cursor-not-allowed transition"
        );
        setShowModal(false);
      })
      .catch((error) => {
      });
  };

  const checkIfVoted = candidate?.evaluator?.includes(user._id);

  const handleVote = () => {
    setVoteBtn("Bestätigen");
    setVoteBtnStatus(false);
    setVoteBtnClass(
      "bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-4 pt-2 pb-1 mt-4 text-base hover:border-[#fff] cursor-pointer transition"
    );
    setSelectedGrade();
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 ml-auto mr-auto mt-12 mb-2 p-8 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold text-center md:text-left">
              {candidate.firstName + " " + candidate.lastName + ":"}
            </h4>
            <p className="text-md text-gray-400 text-center md:text-left">
              {candidate.department}
            </p>
            <div className="rating mt-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <input
                  key={value}
                  onClick={handleVote}
                  type="radio"
                  id={`assessmentGrade-${value}`}
                  {...register("assessmentGrade")}
                  value={value}
                  className="mask mask-star-2 bg-orange-400 mr-1"
                  name="assessmentGrade"
                  style={selectedGrade}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start">
          {!checkIfVoted && (
            <input
              type="submit"
              value={voteBtn}
              className={voteBtnClass}
              disabled={voteBtnStatus}
            />
          )}
          {!checkIfVoted && (
            <>
              <button
                className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-4 pt-2 pb-1 mt-4 text-base hover:border-[#fff] cursor-pointer transition ml-3"
                type="button"
                onClick={() => setShowModal(true)}
                hidden={btnHidden}
              >
                Keine Meinung
              </button>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ml-3 mr-3">
                    <div className="relative my-6 mx-auto max-w-xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <div role="alert" className="alert alert-warning ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="stroke-current shrink-0 h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            <span>Achtung: Bewertung ohne Meinung!</span>
                          </div>
                        </div>
                        <div className="relative p-4 flex-auto">
                          <p className="lg:my-2 text-blueGray-500 text-lg leading-relaxed">
                            Willst du {" "}
                            <span className="font-bold">
                              {candidate.firstName + " " + candidate.lastName}{" "}
                            </span>
                            wirklich ohne Meinung bewerten?
                          </p>
                        </div>
                        <div className="flex items-center justify-end pr-4 pb-4 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="bg-[#FF2222] border-2 border-[#FB5252] rounded-lg text-white px-4 pt-2 pb-1 mt-4 text-base hover:border-[#fff] cursor-pointer transition ml-3"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Abbrechen
                          </button>
                          <input
                            type="submit"
                            value={"Bestätigen"}
                            className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-4 pt-2 pb-1 mt-4 text-base hover:border-[#fff] cursor-pointer transition ml-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </>
          )}
          {checkIfVoted && (
            <input
              type="submit"
              value={"Schon bewertet"}
              className="bg-gray-400 border-2 border-gray-400 rounded-lg text-gray-600 px-4 pt-2 pb-1 mt-4 text-base cursor-not-allowed transition"
              disabled={true}
            />
          )}
        </div>
      </form>
    </div>
  );
}
