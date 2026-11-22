import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ERROR_MAP } from "@/lib/error-map";

export async function ErrorMapTable() {
  const locale = await getLocale();
  const isNl = locale === "nl";

  return (
    <div className="table-scroll my-6 overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>{isNl ? "Symptoom" : "Symptom"}</th>
            <th>{isNl ? "Oorzaak" : "Cause"}</th>
            <th>{isNl ? "Fix" : "Fix"}</th>
          </tr>
        </thead>
        <tbody>
          {ERROR_MAP.map((row) => (
            <tr key={row.id} id={`err-${row.id}`}>
              <td>{isNl ? row.symptom.nl : row.symptom.en}</td>
              <td>{isNl ? row.cause.nl : row.cause.en}</td>
              <td>
                <span>{isNl ? row.fix.nl : row.fix.en} </span>
                <Link href={row.href} className="whitespace-nowrap">
                  {isNl ? "Gids →" : "Guide →"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
