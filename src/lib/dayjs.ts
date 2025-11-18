import dayjs, { type Dayjs } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/fr";

dayjs.extend(LocalizedFormat);
dayjs.locale("fr");

export { dayjs, type Dayjs };
