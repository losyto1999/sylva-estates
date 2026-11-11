// Percorsi del sito, relativi al basename del router (vedi main.tsx). Le rotte sono in App.tsx.
export const paths = {
    home: '/',
    ville: '/ville',
    villa: (slug: string) => `/ville/${slug}`,
    agenzia: '/agenzia',
}
