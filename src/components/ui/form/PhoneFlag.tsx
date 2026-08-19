import { FaEarthAmericas } from "react-icons/fa6"

type Props = {
    // ISO-код страны (BY, PL, ...) либо null, если страна не определена
    code: string | null
}

const positionClass =
    "pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"

// SVG-флаг вместо emoji: Windows не имеет глифов флагов в Segoe UI Emoji
// и рисует их буквами («BY» вместо флага).
//
// Файлы лежат в public/flags (см. скрипт flags:sync), а не подключаются
// пакетом flag-icons: его CSS инлайнит все 534 флага data-URI и раздувает
// бандл на ~410 КБ. Здесь грузится только показываемый флаг.
const PhoneFlag = ({ code }: Props) => {
    if (!code) {
        return (
            <FaEarthAmericas
                aria-hidden="true"
                className={`${positionClass} h-4 w-4 text-neutral-400`}
            />
        )
    }

    return (
        <img
            src={`/flags/${code.toLowerCase()}.svg`}
            alt=""
            aria-hidden="true"
            className={`${positionClass} h-4 w-6 rounded-[2px] object-cover`}
        />
    )
}

export default PhoneFlag
