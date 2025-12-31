import utc from "dayjs/plugin/utc";
import dayjs, { type Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

// If you're using a non-default locale:
import "dayjs/locale/fr";
import "dayjs/locale/ar";
import "dayjs/locale/en-gb";
import "dayjs/locale/fr";

dayjs.extend(LocalizedFormat);
dayjs.extend(localeData);
dayjs.locale("fr");
dayjs.extend(utc);

export { dayjs, type Dayjs };
