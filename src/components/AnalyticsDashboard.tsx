import { analytics } from "@/utils/analytics";

type Props = {
  avgVisitorsPerDay: string;
  amtVisitorsToday: number;
  timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
};

const Badge = ({ percentage }: { percentage: number }) => {
  if (isNaN(percentage)) return null;

  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  return (
    <span
      className={`${
        isPositive ? "bg-green-100 text-green-800" : ""
      } ${isNeutral ? "bg-gray-100 text-gray-800" : ""} ${
        isNegative ? "bg-red-100 text-red-800" : ""
      } inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize`}
    >
      {percentage.toFixed(0)}%
    </span>
  );
};

export default function AnalyticsDashboard({
  avgVisitorsPerDay,
  amtVisitorsToday,
  timeseriesPageviews,
  topCountries,
}: Props) {
  return (
    <div>
      avgVisitorsPerDay: {avgVisitorsPerDay}
      amtVisitorsToday: {amtVisitorsToday}
      {timeseriesPageviews ? (
        <>
          <h2>Timeseries</h2>
          <ul>
            {timeseriesPageviews.map((day) => (
              <li key={day.date}>
                {day.date}:{" "}
                {day.events.reduce(
                  (acc, curr) => acc + Object.values(curr)[0],
                  0
                )}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {topCountries ? (
        <>
          <h2>Top Countries</h2>
          <ul>
            {topCountries.map(([country, count]) => (
              <li key={country}>
                {country}: {count}
              </li>
            ))}
          </ul>
        </>
      ) : null}

        <Badge percentage={(amtVisitorsToday / Number(avgVisitorsPerDay) - 1) * 100} />
    </div>
  );
}
