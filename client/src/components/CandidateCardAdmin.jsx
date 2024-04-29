export default function CandidateCardAdmin({ candidate }) {
  const numericGrades = candidate.assessmentGrade
    .map((grade) => parseFloat(grade))
    .filter((grade) => !isNaN(grade));

  const sumOfGrades = numericGrades.reduce((acc, curr) => acc + curr, 0);
  const averageRating = sumOfGrades / numericGrades.length;

  let color = "";
  if (isNaN(averageRating)) {
    color = "bg-gray-300";
  } else if (averageRating <= 2) {
    color = "bg-red-600";
  } else if (averageRating > 2 && averageRating < 4) {
    color = "bg-orange-500";
  } else if (averageRating >= 4 && averageRating < 8) {
    color = "bg-yellow-400";
  } else if (averageRating >= 8 && averageRating < 9) {
    color = "bg-lime-400";
  } else {
    color = "bg-green-600";
  }

  return (
    <div className="w-86 lg:w-10/12 dark:bg-gray-900 dark:text-gray-100 mr-4 ml-4 mt-12 mb-2 p-6 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold text-center md:text-left">
            {candidate.firstName + " " + candidate.lastName + ":"}
          </h4>
          <p className="text-md text-gray-400 text-center md:text-left">
            {candidate.department}
          </p>
          <div className="rating mt-3">
            <div className="w-80 lg:w-60 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className={`h-4 ${color}`}
                style={{ width: `${averageRating * 10}%` }}
              ></div>
            </div>
          </div>
          <p className="mt-3.5">
            Rating:{" "}
            {isNaN(averageRating) ? (
              <span className="font-bold">Noch keine Bewertung</span>
            ) : (
              <span className="font-bold">{averageRating.toFixed(2)}</span>
            )}
          </p>
          <p className="mt-3.5">
            Anzahl der Bewertungen:{" "}
            <span className="font-bold">{numericGrades.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
