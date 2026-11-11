import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { spellNumber } from '../i18n/locale'
import { FakeButton } from '../components/FakeButton'
import { Photo } from '../components/Photo'
import { AGENCY_HERO_PHOTOS, AGENCY_STEPS_PHOTO } from '../data/agency'
import { resolvePhoto } from '../data/photos'
import { SITE } from '../data/site'
import { paths } from '../routes'

type Step = { title: string; text: string; outcome: string }
type SheetItem = { title: string; text: string }
type Faq = { question: string; answer: string }

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export function SylvaAgency() {
    const { t } = useTranslation()
    const roots = t('agency.roots', { returnObjects: true }) as string[]
    const steps = t('agency.steps', { returnObjects: true }) as Step[]
    const sheet = t('agency.sheet', { returnObjects: true }) as SheetItem[]
    const faqs = t('agency.faq', { returnObjects: true }) as Faq[]
    const stepsPhoto = resolvePhoto(AGENCY_STEPS_PHOTO)

    return (
        <div className="flex flex-col gap-[112px] pt-8 tablet:gap-20">
            {/* Apertura: titolo, presentazione e una foto larga. */}
            <section className="flex flex-col gap-10 px-(--margine)">
                <h1 className="max-w-[1100px] text-[88px] leading-[0.95] font-bold tracking-[-0.02em] tablet:text-[length:clamp(44px,8.594vw,88px)]">
                    {t('agency.title')}<span className="text-verde-bosco">.</span>
                </h1>
                <p className="max-w-[720px] text-[20px] leading-[1.6] text-grafite">{t('agency.intro')}</p>
                <div className="grid grid-cols-3 gap-4 mobile:grid-cols-2">
                    {AGENCY_HERO_PHOTOS.map((ref, i) => {
                        const resolved = resolvePhoto(ref)
                        if (!resolved) return null
                        return (
                            <Photo
                                key={ref.src}
                                name={resolved.property.name}
                                photo={resolved.photo}
                                eager
                                className={`h-[480px] w-full rounded-[32px] tablet:h-[clamp(240px,46.875vw,480px)] mobile:h-[220px] ${
                                    i === 0 ? 'mobile:col-span-2 mobile:h-[240px]' : ''
                                }`}
                            />
                        )
                    })}
                </div>
            </section>

            {/* Perché la natura: perché l'agenzia si occupa di case nella natura. */}
            <section
                aria-labelledby="perche-la-natura"
                className="mx-(--margine) rounded-[32px] bg-verde-bosco p-16 text-pietra-chiara mobile:p-8"
            >
                <h2 id="perche-la-natura" className="text-[40px] leading-none font-semibold">
                    {t('agency.rootsTitle')}
                </h2>
                <div className="mt-6 flex max-w-[760px] flex-col gap-4">
                    {roots.map((paragraph) => (
                        <p key={paragraph} className="text-[17px] leading-[1.7]">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            {/* Come si lavora: cinque passaggi, dal primo contatto a dopo il rogito. */}
            <section aria-labelledby="come-lavoriamo" className="grid grid-cols-5 gap-12 px-(--margine) tablet:grid-cols-1">
                <div className="col-span-2 tablet:col-span-full">
                    <div className="sticky top-40 flex flex-col gap-4">
                        <h2
                            id="come-lavoriamo"
                            className="text-[56px] leading-none font-semibold tablet:text-[length:clamp(36px,5.47vw,56px)]"
                        >
                            {t('agency.howTitle')}
                        </h2>
                        <p className="text-[17px] leading-[1.7] text-grafite">
                            {capitalize(t('agency.howIntro', { number: spellNumber(steps.length) }))}
                        </p>
                        {stepsPhoto && (
                            <Photo
                                name={stepsPhoto.property.name}
                                photo={stepsPhoto.photo}
                                className="mt-4 h-[300px] w-full rounded-[28px] tablet:h-[clamp(220px,40vw,300px)]"
                            />
                        )}
                        <div className="flex flex-col gap-1 rounded-[28px] bg-pietra p-6 text-[15px] leading-[1.6] text-grafite">
                            <p className="text-[17px] font-semibold text-nero-bosco">{t('agency.talkTitle')}</p>
                            <p>{t('agency.talkText')}</p>
                            <p className="mt-2 font-semibold text-nero-bosco">
                                {SITE.phone} · {SITE.email}
                            </p>
                        </div>
                    </div>
                </div>

                <ol className="col-span-3 flex flex-col tablet:col-span-full">
                    {steps.map((step, i) => (
                        <li
                            key={step.title}
                            className="grid grid-cols-[56px_1fr] gap-x-4 border-t border-pietra py-8 first:border-t-0 first:pt-0 mobile:grid-cols-[40px_1fr]"
                        >
                            <span className="font-display text-[24px] font-semibold text-verde-bosco">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[28px] leading-[1.1] font-semibold">{step.title}</h3>
                                <p className="text-[16px] leading-[1.65] text-grafite">{step.text}</p>
                                <p className="text-[14px] font-semibold text-verde-bosco">{step.outcome}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Come leggere una scheda: spiega i dati che si trovano in ogni villa. */}
            <section aria-labelledby="la-scheda" className="flex flex-col gap-10 px-(--margine)">
                <div className="flex max-w-[720px] flex-col gap-4">
                    <h2
                        id="la-scheda"
                        className="text-[56px] leading-none font-semibold tablet:text-[length:clamp(36px,5.47vw,56px)]"
                    >
                        {t('agency.sheetTitle')}
                    </h2>
                    <p className="text-[17px] leading-[1.7] text-grafite">
                        {t('agency.sheetIntro')}
                    </p>
                </div>
                <ul className="grid grid-cols-3 gap-4 tablet:grid-cols-2 mobile:grid-cols-1">
                    {sheet.map((item) => (
                        <li
                            key={item.title}
                            className="group flex flex-col gap-3 rounded-[28px] bg-pietra p-8 motion-safe:transition motion-safe:duration-300 hover:-translate-y-1 hover:bg-verde-bosco hover:shadow-[0_18px_36px_-12px_rgb(17_26_21/0.45)]"
                        >
                            <h3 className="text-[24px] leading-[1.1] font-semibold group-hover:text-bianco">{item.title}</h3>
                            <p className="text-[15px] leading-[1.6] text-grafite group-hover:text-bianco">{item.text}</p>
                        </li>
                    ))}
                </ul>
                <Link
                    to={paths.ville}
                    className="pill h-14 self-center bg-nero-bosco px-9 text-[17px] font-semibold text-pietra-chiara motion-safe:transition-colors hover:bg-verde-bosco"
                >
                    {t('agency.seeVillas')}
                </Link>
            </section>

            {/* Domande frequenti: <details> nativo, niente script. */}
            <section aria-labelledby="domande" className="grid grid-cols-5 gap-12 px-(--margine) tablet:grid-cols-1">
                <h2
                    id="domande"
                    className="col-span-2 text-[56px] leading-none font-semibold tablet:col-span-full tablet:text-[length:clamp(36px,5.47vw,56px)]"
                >
                    {t('agency.faqTitle')}
                </h2>
                <div className="col-span-3 flex flex-col tablet:col-span-full">
                    {faqs.map((faq) => (
                        <details key={faq.question} className="group border-t border-pietra first:border-t-0">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[20px] font-semibold [&::-webkit-details-marker]:hidden">
                                {faq.question}
                                <ChevronDown
                                    aria-hidden="true"
                                    className="size-5 shrink-0 transition-transform group-open:rotate-180"
                                />
                            </summary>
                            <p className="pb-6 text-[16px] leading-[1.65] text-grafite">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Contatti: niente modulo, solo i recapiti e il pulsante finto. */}
            <section
                aria-labelledby="contatti"
                className="mx-(--margine) flex items-center justify-between gap-12 rounded-[32px] bg-nero-bosco p-20 text-pietra-chiara tablet:flex-col tablet:items-start tablet:gap-8 tablet:p-[clamp(32px,7.8125vw,80px)] mobile:p-8"
            >
                <div className="flex flex-col gap-5">
                    <h2 id="contatti" className="max-w-[700px] text-[56px] leading-none font-semibold tablet:text-[length:clamp(36px,5.47vw,56px)]">
                        {t('agency.contactTitle')}
                    </h2>
                    <address className="flex flex-col gap-1 text-[17px] leading-[1.6] not-italic text-salvia-chiara">
                        <span>{SITE.address}</span>
                        <span>{SITE.phone}</span>
                        <span>{SITE.email}</span>
                    </address>
                </div>
                <FakeButton className="h-[60px] shrink-0 bg-ottone px-8 text-[17px] font-bold text-nero-bosco">
                    {t('agency.contactButton')}
                </FakeButton>
            </section>
        </div>
    )
}
